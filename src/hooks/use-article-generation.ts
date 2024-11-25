import { useActionState, useTransition } from "react";

import { generateArticleAction } from "@/actions/generate-article-action";
import { ActionResult } from "@/hooks/types";

export function useArticleGeneration(
  transcriptId: string | undefined,
): ActionResult<string> {
  let error = false;
  const [isPending, startTransition] = useTransition();
  const [article, articleAction] = useActionState(() => {
    if (transcriptId) return generateArticleAction(transcriptId);
    error = true;
  }, undefined);

  const generateArticle = () => startTransition(() => articleAction());

  return {
    data: article,
    loading: isPending,
    error: error,
    trigger: generateArticle,
  };
}
