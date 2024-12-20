import { useActionState, useCallback, useTransition } from "react";
import { Transcript } from "assemblyai";

import { generateTranscriptAction } from "@/actions/generate-transcript-action";
import { ActionResult } from "@/hooks/types";

export function useTranscriptGeneration(
  file: File | null,
): ActionResult<Transcript> {
  let error = false;
  const [isPending, startTransition] = useTransition();
  const [transcript, transcriptAction] = useActionState(async () => {
    if (file) return await generateTranscriptAction(file);
    error = true;
  }, undefined);

  const generateTranscript = useCallback(() => {
    startTransition(() => {
      transcriptAction();
    });
  }, [startTransition, transcriptAction]);

  return {
    data: transcript,
    loading: isPending,
    error: error,
    trigger: generateTranscript,
  };
}
