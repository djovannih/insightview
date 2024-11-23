import { Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import styles from "@/components/features/insights/draft-article/article-card.styles";
import ArticleSkeleton from "@/components/features/insights/draft-article/article-skeleton";
import ErrorMessage from "@/components/features/insights/error-message";

interface ArticleCardProps {
  articleHtml: string | undefined;
  loading: boolean;
  error: boolean;
  retry: () => void;
}

export default function ArticleCard({
  articleHtml,
  loading,
  error,
  retry,
}: ArticleCardProps) {
  const t = useTranslations("ArticleCard");

  const copyToClipboard = async () => {
    if (articleHtml) {
      const promise = navigator.clipboard.writeText(articleHtml);
      toast.promise(promise, {
        success: t("articleCopied"),
        error: t("failedToCopyArticle"),
      });
      await promise;
    }
  };

  return (
    <Card>
      <CardContent className="flex flex-col">
        {articleHtml && !loading && !error && (
          <ScrollArea className="group">
            <div
              className="h-96 pr-4"
              dangerouslySetInnerHTML={{ __html: articleHtml }}
              style={{}}
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyToClipboard}
                    className="absolute bottom-0 right-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  >
                    <Copy />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t("copyToClipboard")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <style jsx>{styles}</style>
          </ScrollArea>
        )}
        {loading && <ArticleSkeleton />}
        {error && <ErrorMessage retry={retry} />}
      </CardContent>
    </Card>
  );
}
