import { LemurQuestion, Transcript, TranscriptUtterance } from "assemblyai";
import { assemblyAI } from "@/actions/assemblyai";

export const generateTranscriptAction = async (file: File) => {
  const buffer = Buffer.from(
    file.type.startsWith("video/")
      ? await extractAudioFromVideo(Buffer.from(await file.arrayBuffer()))
      : new Uint8Array(await file.arrayBuffer()),
  );

  const transcript = await assemblyAI.transcripts.transcribe({
    audio: buffer,
    speech_model: "nano",
    language_detection: true,
    speaker_labels: true,
    format_text: true,
  });

  if (transcript.utterances && transcript.utterances.length > 0) {
    const speakerMapping = await getSpeakerMapping(transcript.utterances);
    return {
      ...transcript,
      utterances: transcript.utterances.map((utterance) => ({
        ...utterance,
        speaker: speakerMapping.get(utterance.speaker) ?? utterance.speaker,
      })),
    } as Transcript;
  } else return transcript;
};

async function getSpeakerMapping(utterances: TranscriptUtterance[]) {
  const uniqueSpeakers = [
    ...new Set(utterances.map((utterance) => utterance.speaker)),
  ];
  const questions = uniqueSpeakers.map(
    (speaker) =>
      ({
        question: `Who is speaker ${speaker}?`,
        answer_format: " ",
      }) as LemurQuestion,
  );
  const textWithSpeakerLabels = utterances
    .map((utterance) => `${utterance.speaker}:\n${utterance.text}`)
    .join("\n");
  const result = await assemblyAI.lemur.questionAnswer({
    questions: [...questions],
    input_text: textWithSpeakerLabels,
    final_model: "anthropic/claude-3-5-sonnet",
    context:
      "Your task is to infer the speaker's name from the speaker-labelled transcript. Reply with the name of the speaker and nothing else. If you cannot infer the speaker's name, reply with 'Unknown'",
  });

  return result.response.reduce((map, { question, answer }) => {
    const pattern = /Who is speaker (\w)\?/;
    const match = pattern.exec(question);
    return match && !map.has(match[1]) && answer !== "Unknown"
      ? map.set(match[1], answer)
      : map;
  }, new Map<string, string>());
}
async function extractAudioFromVideo(videoFile: File) {
  try {
    const fileArrayBuffer = await videoFile.arrayBuffer();

    const audioContext = new AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(fileArrayBuffer);

    const offlineContext = new OfflineAudioContext(
      audioBuffer.numberOfChannels,
      audioBuffer.length,
      audioBuffer.sampleRate,
    );

    const source = offlineContext.createBufferSource();
    source.buffer = audioBuffer;

    source.connect(offlineContext.destination);
    source.start();

    const renderedBuffer = await offlineContext.startRendering();
    const wavBuffer = bufferToWav(renderedBuffer);
    return wavBuffer;
  } catch (error) {
    throw new Error("Failed to extract audio from video", { cause: error });
  }
}

function bufferToWav(audioBuffer: AudioBuffer): ArrayBuffer {
  const numOfChan = audioBuffer.numberOfChannels;
  const length = audioBuffer.length * numOfChan * 2 + 44;
  const buffer = new ArrayBuffer(length);
  const view = new DataView(buffer);
  const channels = [];
  let sample;
  let offset = 0;
  let pos = 0;

  // Write WAV header
  setUint32(0x46464952); // "RIFF"
  setUint32(length - 8); // file length - 8
  setUint32(0x45564157); // "WAVE"

  setUint32(0x20746d66); // "fmt " chunk
  setUint32(16); // length = 16
  setUint16(1); // PCM (uncompressed)
  setUint16(numOfChan);
  setUint32(audioBuffer.sampleRate);
  setUint32(audioBuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
  setUint16(numOfChan * 2); // block-align
  setUint16(16); // 16-bit (hardcoded)

  setUint32(0x61746164); // "data" - chunk
  setUint32(length - pos - 4); // chunk length

  // Write interleaved data
  for (let i = 0; i < audioBuffer.numberOfChannels; i++)
    channels.push(audioBuffer.getChannelData(i));

  while (pos < length) {
    for (let i = 0; i < numOfChan; i++) {
      sample = Math.max(-1, Math.min(1, channels[i][offset]));
      sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0;
      view.setInt16(pos, sample, true);
      pos += 2;
    }
    offset++;
  }

  // Helper function to write uint32
  function setUint32(data: number) {
    view.setUint32(pos, data, true);
    pos += 4;
  }

  // Helper function to write uint16
  function setUint16(data: number) {
    view.setUint16(pos, data, true);
    pos += 2;
  }

  return buffer;
}
