import { Transcript, TranscriptWord } from "assemblyai";

import assemblyAI from "@/lib/assemblyai";
import { Highlight } from "@/components/features/insights/highlights/types";
import {
  extractHighlightsPrompt,
  generateArticlePrompt,
} from "@/components/features/insights/prompts";

export const fetchArticle = async (transcriptId: string) => {
  const response = await assemblyAI.lemur.task({
    prompt: generateArticlePrompt,
    final_model: "anthropic/claude-3-5-sonnet",
    temperature: 0.5,
    transcript_ids: [transcriptId],
  });
  return response.response;
};

export const fetchHighlights = async (transcript: Transcript) => {
  const quotesResponse = await assemblyAI.lemur.task({
    prompt: extractHighlightsPrompt,
    final_model: "anthropic/claude-3-5-sonnet",
    temperature: 0.5,
    transcript_ids: [transcript.id],
  });
  const quotes = JSON.parse(quotesResponse.response) as string[];

  return quotes
    .map((quote) => findQuote(transcript.words ?? [], quote))
    .filter((quoteWords) => quoteWords.length > 0)
    .map(
      (quoteWords) =>
        ({
          quote: quoteWords.map((quoteWord) => quoteWord.text).join(" "),
          start: quoteWords[0].start,
          end: quoteWords.at(-1)!.end,
        }) as Highlight,
    );
};

function findQuote(transcriptWords: TranscriptWord[], quote: string) {
  const quoteWords = quote.split(" ");
  for (let i = 0; i <= transcriptWords.length - quoteWords.length; i++) {
    let match = true;
    for (let j = 0; j < quoteWords.length; j++) {
      if (
        transcriptWords[i + j].text.toLowerCase() !==
        quoteWords[j].toLowerCase()
      ) {
        match = false;
        break;
      }
    }
    if (match) return transcriptWords.slice(i, i + quoteWords.length);
  }
  return [];
}
