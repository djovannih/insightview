import { useActionState, useCallback, useTransition } from "react";
import { Transcript } from "assemblyai";

import { Highlight } from "@/types/highlight";
import { ActionResult } from "@/hooks/types";
import { generateHighlightsAction } from "@/app/actions/generate-highlights-action";

export function useHighlightsGeneration(
  transcript: Transcript | undefined,
): ActionResult<Highlight[]> {
  let error = false;
  const [isPending, startTransition] = useTransition();
  const [highlights, highlightsAction] = useActionState(async () => {
    if (transcript?.status === "completed")
      return await generateHighlightsAction(transcript);
    error = true;
  }, undefined);

  const generateHighlights = useCallback(() => {
    startTransition(() => {
      highlightsAction();
    });
  }, [startTransition, highlightsAction]);

  return {
    data: highlights,
    loading: isPending,
    error: error,
    trigger: generateHighlights,
  };
}
