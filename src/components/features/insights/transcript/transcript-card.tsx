"use client";

import { Transcript } from "assemblyai";
import { useTranslations } from "next-intl";

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import ErrorMessage from "@/components/features/insights/error-message";
import TranscriptSkeleton from "@/components/features/insights/transcript/transcript-skeleton";

interface TranscriptCardProps {
  transcript: Transcript | undefined;
  transcriptLoading: boolean;
  transcriptError: boolean;
  retry: () => void;
}

export default function TranscriptCard({
  transcript,
  transcriptLoading,
  transcriptError,
  retry,
}: TranscriptCardProps) {
  const t = useTranslations("TranscriptCard");

  return (
    <Card>
      <CardContent className="flex flex-col">
        {transcript?.status === "completed" && (
          <>
            {transcript.utterances && transcript.utterances.length > 0 ? (
              <ScrollArea>
                <div className="flex h-96 flex-col gap-4 pr-4">
                  {transcript.utterances.map((utterance) => (
                    <div key={utterance.start} className="flex flex-col gap-1">
                      <p className="font-semibold">
                        {utterance.speaker.length === 1 // This is a hacky way to check if the speaker name was not detected by the AI
                          ? t("speaker", { name: utterance.speaker })
                          : utterance.speaker}
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
        {transcriptLoading && <TranscriptSkeleton />}
        {transcriptError && <ErrorMessage retry={retry} />}
      </CardContent>
    </Card>
  );
}
