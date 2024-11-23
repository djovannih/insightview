"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorMessage from "@/components/features/insights/error-message";
import { Highlight } from "@/components/features/insights/highlights/types";

interface HighlightsCardProps {
  highlights: Highlight[] | undefined;
  loading: boolean;
  error: boolean;
  retry: () => void;
}

export default function HighlightsCard({
  highlights,
  loading,
  error,
  retry,
}: HighlightsCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-col">
        {highlights && highlights.length > 0 && !loading && !error && (
          <ScrollArea>
            <ul className="flex h-96 flex-col gap-4 pr-4">
              {highlights.map((highlight) => (
                <li key={highlight.quote}>
                  <blockquote>{highlight.quote}</blockquote>
                </li>
              ))}
            </ul>
          </ScrollArea>
        )}
        {loading && (
          <div className="flex h-96 w-full flex-col justify-center gap-4">
            <div className="flex w-full flex-col justify-center gap-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/5" />
            </div>
            <div className="flex w-full flex-col justify-center gap-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/5" />
            </div>
            <div className="flex w-full flex-col justify-center gap-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
            <div className="flex w-full flex-col justify-center gap-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
            <div className="flex w-full flex-col justify-center gap-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        )}
        {error && <ErrorMessage retry={retry} />}
      </CardContent>
    </Card>
  );
}
