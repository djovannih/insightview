import { LemurQuestion, Transcript, TranscriptUtterance } from "assemblyai";

import assemblyAI from "@/lib/assemblyai";
import { extractAudioFromVideo } from "@/lib/audio-extractor";

export const fetchTranscript = async (file: File) => {
  const buffer = Buffer.from(
    file.type.startsWith("video/")
      ? await extractAudioFromVideo(file)
      : await file.arrayBuffer(),
  );

  const transcript = await assemblyAI.transcripts.transcribe({
    audio: buffer,
    speech_model: "nano",
    language_detection: true,
    speaker_labels: true,
    format_text: true,
    summarization: true,
    summary_model: "conversational",
    summary_type: "bullets",
    iab_categories: true,
    entity_detection: true,
    auto_highlights: true,
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

export const fetchSubtitles = async (transcriptId: string) =>
  await assemblyAI.transcripts.subtitles(transcriptId, "vtt");

async function getSpeakerMapping(utterances: TranscriptUtterance[]) {
  const uniqueSpeakers = new Set(
    utterances.map((utterance) => utterance.speaker),
  );
  const questions = uniqueSpeakers.values().map(
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
