import { useActionState, useCallback, useTransition } from "react";

import { generateArticleAction } from "@/actions/generate-article-action";
import { ActionResult } from "@/hooks/types";

export function useArticleGeneration(
  transcriptId: string | undefined,
): ActionResult<string> {
  let error = false;
  const [isPending, startTransition] = useTransition();
  const [article, articleAction] = useActionState(async () => {
    if (transcriptId) return await generateArticleAction(transcriptId);
    error = true;
  }, undefined);

  const generateArticle = useCallback(() => {
    startTransition(() => {
      articleAction();
    });
  }, [startTransition, articleAction]);

  return {
    data: article,
    loading: isPending,
    error: error,
    trigger: generateArticle,
  };
}
