import { AssemblyAI } from "assemblyai";

export const assemblyAI = new AssemblyAI({
  apiKey: process.env.ASSEMBLYAI_API_KEY!,
});
