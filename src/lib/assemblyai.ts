import { AssemblyAI } from "assemblyai";

const client = new AssemblyAI({
  apiKey: process.env.NEXT_PUBLIC_ASSEMBLYAI_API_KEY!,
});

export default client;
