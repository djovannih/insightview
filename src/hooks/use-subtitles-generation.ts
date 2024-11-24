import { useActionState, useCallback, useTransition } from "react";

import { ActionResult } from "@/hooks/types";
import { generateSubtitlesAction } from "@/app/actions/generate-subtitles-action";

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
