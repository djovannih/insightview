import { useActionState, useTransition } from "react";

import { generateSubtitlesAction } from "@/actions/generate-subtitles-action";
import { ActionResult } from "@/hooks/types";

export function useSubtitlesGeneration(
  transcriptId: string | undefined,
): ActionResult<string> {
  let error = false;
  const [isPending, startTransition] = useTransition();
  const [subtitles, subtitlesAction] = useActionState(() => {
    if (transcriptId) return generateSubtitlesAction(transcriptId);
    error = true;
  }, undefined);

  const generateSubtitles = () => startTransition(() => subtitlesAction());

  return {
    data: subtitles,
    loading: isPending,
    error: error,
    trigger: generateSubtitles,
  };
}
