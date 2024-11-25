import { useActionState, useTransition } from "react";
import { Transcript } from "assemblyai";

import { generateHighlightsAction } from "@/actions/generate-highlights-action";
import { Highlight } from "@/types/highlight";
import { ActionResult } from "@/hooks/types";

export function useHighlightsGeneration(
  transcript: Transcript | undefined,
): ActionResult<Highlight[]> {
  let error = false;
  const [isPending, startTransition] = useTransition();
  const [highlights, highlightsAction] = useActionState(() => {
    if (transcript?.status === "completed")
      return generateHighlightsAction(transcript);
    error = true;
  }, undefined);

  const generateHighlights = () => startTransition(() => highlightsAction());

  return {
    data: highlights,
    loading: isPending,
    error: error,
    trigger: generateHighlights,
  };
}
