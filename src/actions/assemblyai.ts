import { AssemblyAI } from "assemblyai";

export const assemblyAI = new AssemblyAI({
  apiKey: process.env.NEXT_PUBLIC_ASSEMBLYAI_API_KEY!,
});
