import { LemurQuestion, Transcript, TranscriptUtterance } from "assemblyai";
import { PassThrough, Readable } from "stream";
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

async function extractAudioFromVideo(buffer: Buffer): Promise<Buffer> {
  const ffmpeg = (await import("fluent-ffmpeg")).default;

  return new Promise((resolve, reject) => {
    const inputStream = Readable.from(buffer);
    const outputStream = new PassThrough();
    const chunks: Buffer[] = [];

    outputStream.on("data", (chunk) => chunks.push(chunk));
    outputStream.on("end", () => resolve(Buffer.concat(chunks)));

    ffmpeg()
      .input(inputStream)
      .toFormat("mp3")
      .on("error", reject)
      .writeToStream(outputStream);
  });
}
