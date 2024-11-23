import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
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
  return (
    <Card>
      <CardContent className="flex flex-col">
        {articleHtml && !loading && !error && (
          <ScrollArea>
            <div
              className="h-96 pr-4"
              dangerouslySetInnerHTML={{ __html: articleHtml }}
            />
          </ScrollArea>
        )}
        {loading && (
          <div className="flex h-96 w-full flex-col justify-center gap-4">
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
