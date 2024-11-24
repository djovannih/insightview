import { useActionState, useCallback, useTransition } from "react";

import { ActionResult } from "@/hooks/types";
import { generateArticleAction } from "@/app/actions/generate-article-action";

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
