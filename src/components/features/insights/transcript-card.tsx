"use client";

import { Transcript } from "assemblyai";
import { useTranslations } from "next-intl";

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorMessage from "@/components/features/insights/error-message";

interface TranscriptCardProps {
  transcript: Transcript | undefined;
  loading: boolean;
  error: boolean;
  retry: () => void;
}

export default function TranscriptCard({
  transcript,
  loading,
  error,
  retry,
}: TranscriptCardProps) {
  const t = useTranslations("TranscriptCard");

  return (
    <Card>
      <CardContent className="flex flex-col">
        {transcript && !loading && !error && (
          <>
            {transcript.utterances && transcript.utterances.length > 0 ? (
              <ScrollArea>
                <div className="flex h-96 flex-col gap-4 pr-4">
                  {transcript.utterances.map((utterance) => (
                    <div key={utterance.start} className="flex flex-col gap-1">
                      <p className="font-semibold">
                        {t("speaker", { name: utterance.speaker })}
                      </p>
                      <p key={utterance.start}>{utterance.text}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4">
                <p>{t("noTranscript")}</p>
              </div>
            )}
          </>
        )}
        {loading && (
          <div className="flex h-96 w-full flex-col justify-center gap-4">
            <div className="flex w-full flex-col justify-center gap-1">
              <Skeleton className="mb-1 h-4 w-20" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/5" />
              <Skeleton className="h-4 w-4/5" />
            </div>
            <div className="flex w-full flex-col justify-center gap-1">
              <Skeleton className="mb-1 h-4 w-20" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/5" />
              <Skeleton className="h-4 w-4/5" />
            </div>
            <div className="flex w-full flex-col justify-center gap-1">
              <Skeleton className="mb-1 h-4 w-20" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/5" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        )}
        {error && <ErrorMessage retry={retry} />}
      </CardContent>
    </Card>
  );
}
