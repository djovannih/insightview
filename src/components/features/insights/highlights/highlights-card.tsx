"use client";

import { Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import ErrorMessage from "@/components/features/insights/error-message";
import HighlightsSkeleton from "@/components/features/insights/highlights/highlights-skeleton";
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
        {loading && <HighlightsSkeleton />}
        {error && <ErrorMessage retry={retry} />}
      </CardContent>
    </Card>
  );
}
