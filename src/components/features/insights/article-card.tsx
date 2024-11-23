import { Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
            <style jsx>{`
              div :global(p) {
                margin-bottom: 1.2rem;
                font-size: 1rem;
              }
              div :global(h1) {
                margin-bottom: 1.5rem;
                line-height: 2;
                font-size: 2rem;
                font-weight: bold;
              }
              div :global(h2) {
                margin-bottom: 1.4rem;
                line-height: 1.9;
                font-size: 1.75rem;
                font-weight: bold;
              }
              div :global(h3) {
                margin-bottom: 1.3rem;
                line-height: 1.85;
                font-size: 1.5rem;
                font-weight: bold;
              }
              div :global(h4) {
                margin-bottom: 1.2rem;
                line-height: 1.8;
                font-size: 1.25rem;
                font-weight: bold;
              }
              div :global(h5) {
                margin-bottom: 1.1rem;
                line-height: 1.75;
                font-size: 1rem;
                font-weight: bold;
              }
              div :global(b),
              div :global(strong) {
                font-weight: bold;
              }
              div :global(blockquote) {
                border-left: 0.25rem solid #ddd;
                padding-left: 1.5rem;
                font-style: italic;
                margin: 1.5rem 0;
              }
              div :global(ul),
              div :global(ol) {
                margin-left: 2rem;
                margin-bottom: 1.5rem;
                list-style: disc;
              }
              div :global(li) {
                margin-bottom: 0.75rem;
              }
              div :global(i),
              div :global(em) {
                font-style: italic;
              }
              div :global(u) {
                text-decoration: underline;
              }
            `}</style>
          </ScrollArea>
        )}
        {loading && (
          <div className="flex h-96 w-full flex-col gap-4">
            <div className="flex w-full flex-col justify-center gap-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/5" />
            </div>
            <div className="flex w-full flex-col justify-center gap-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/5" />
            </div>
            <div className="flex w-full flex-col justify-center gap-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        )}
        {error && <ErrorMessage retry={retry} />}
      </CardContent>
    </Card>
  );
}
