"use server";

import { assemblyAI } from "@/app/actions/assemblyai";

export const generateSubtitlesAction = async (transcriptId: string) =>
  await assemblyAI.transcripts.subtitles(transcriptId, "vtt");
