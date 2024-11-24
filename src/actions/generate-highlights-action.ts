"use server";

import { Transcript, TranscriptWord } from "assemblyai";

import { Highlight } from "@/types/highlight";
import { assemblyAI } from "@/app/actions/assemblyai";

export const generateHighlightsAction = async (transcript: Transcript) => {
  const quotesResponse = await assemblyAI.lemur.task({
    prompt: prompt,
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

const prompt = `Extract catchy highlights from the provided interview transcript as quotes.

# Steps

1. **Read the Transcript**: Review the entire interview transcript to understand the content, context, and flow.
2. **Identify Key Highlights**: Identify the most engaging or impactful phrases that can be quoted. Focus on segments that clearly communicate valuable insights, strong emotional moments, or unique thoughts.

# Output Format

The output should be in a JSON format containing an array of quote strings.
Do not provide a preamble. Only include the JSON content and nothing else.

Example:
[
  "Innovation is nothing more than thinking of a new way to solve a problem.",
  "Collaboration is the key to turning good ideas into great successes."
]   

# Notes

- Aim to capture quotes that are powerful, insightful, or memorable.
- Ensure the quotes are concise yet complete enough to provide meaningful insight.
- Quotes should range from 5 to 15 seconds in length to capture focused highlights.`;
