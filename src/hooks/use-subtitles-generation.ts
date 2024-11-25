import { useActionState, useCallback, useTransition } from "react";

import { generateSubtitlesAction } from "@/actions/generate-subtitles-action";
import { ActionResult } from "@/hooks/types";

export function useSubtitlesGeneration(
  transcriptId: string | undefined,
): ActionResult<string> {
  let error = false;
  const [isPending, startTransition] = useTransition();
  const [subtitles, subtitlesAction] = useActionState(async () => {
    if (transcriptId) return await generateSubtitlesAction(transcriptId);
    error = true;
  }, undefined);

  const generateSubtitles = useCallback(() => {
    startTransition(() => {
      subtitlesAction();
    });
  }, [startTransition, subtitlesAction]);

  return {
    data: subtitles,
    loading: isPending,
    error: error,
    trigger: generateSubtitles,
  };
}
