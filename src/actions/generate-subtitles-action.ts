"use server";

import { assemblyAI } from "@/actions/assemblyai";

export const generateSubtitlesAction = async (transcriptId: string) =>
  await assemblyAI.transcripts.subtitles(transcriptId, "vtt");
