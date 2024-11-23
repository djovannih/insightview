"use client";

import { Play } from "lucide-react";

import { Button } from "@/components/ui/button";
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
  playMediaSegment: (start: number, end: number) => void;
}

export default function HighlightsCard({
  highlights,
  loading,
  error,
  retry,
  playMediaSegment,
}: HighlightsCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-col">
        {highlights && highlights.length > 0 && !loading && !error && (
          <ScrollArea>
            <ul className="flex h-96 flex-col gap-4 pr-4">
              {highlights.map((highlight) => (
                <li key={highlight.quote} className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      playMediaSegment(highlight.start, highlight.end)
                    }
                    className="aspect-square"
                  >
                    <Play className="size-4" />
                  </Button>
                  <blockquote>
                    {highlight.quote.replace(/^./, (str) => str.toUpperCase())}
                  </blockquote>
                </li>
              ))}
            </ul>
          </ScrollArea>
        )}
        {loading && (
          <div className="flex h-96 w-full flex-col gap-4">
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
