"use client";

import { Transcript } from "assemblyai";
import { useTranslations } from "next-intl";

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorMessage from "@/components/features/insights/error-message";

interface SummaryCardProps {
  transcript: Transcript | undefined;
  loading: boolean;
  error: boolean;
  retry: () => void;
}

export default function SummaryCard({
  transcript,
  loading,
  error,
  retry,
}: SummaryCardProps) {
  const t = useTranslations("SummaryCard");

  return (
    <Card>
      <CardContent className="flex flex-col">
        {transcript && !loading && !error && (
          <>
            {transcript.summary ? (
              <ScrollArea>
                <ul className="flex max-h-96 list-disc flex-col gap-2 pl-5 pr-4">
                  {transcript.summary
                    .split("- ")
                    .slice(1)
                    .map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                </ul>
              </ScrollArea>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4">
                <p>{t("noTranscript")}</p>
              </div>
            )}
          </>
        )}
        {loading && (
          <div className="flex w-full flex-col justify-center gap-4">
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
