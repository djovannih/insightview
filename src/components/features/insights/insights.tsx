"use client";

import { RefreshCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import useSWRImmutable from "swr";

import assemblyAI from "@/lib/assemblyai";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const fetchTranscript = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return await assemblyAI.transcripts.transcribe({
    audio: buffer,
    speech_model: "nano",
    language_detection: true,
    speaker_labels: true,
    format_text: true,
    summarization: true,
    summary_model: "conversational",
    summary_type: "bullets",
  });
};

interface InsightsProps {
  file: File;
}

export default function Insights({ file }: InsightsProps) {
  const {
    data: transcript,
    error,
    isLoading,
    mutate,
  } = useSWRImmutable(file, fetchTranscript, {
    shouldRetryOnError: false,
    revalidateIfStale: false,
  });

  const t = useTranslations("Insights");

  return (
    <div className="flex flex-col items-center gap-2">
      <Tabs defaultValue="transcription" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="transcription">{t("transcription")}</TabsTrigger>
        </TabsList>
        <TabsContent value="transcription">
          <Card>
            <CardContent className="flex flex-col items-center">
              {transcript && !isLoading && !error && (
                <>
                  {transcript.utterances && transcript.utterances.length > 0 ? (
                    <ScrollArea>
                      <div className="flex max-h-96 flex-col gap-4 pr-4">
                        {transcript.utterances.map((utterance) => (
                          <div
                            key={utterance.start}
                            className="flex flex-col gap-1"
                          >
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
              {isLoading && (
                <div className="flex w-full flex-col justify-center gap-4">
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
              {error && (
                <div className="flex flex-col items-center justify-center gap-4">
                  <p>{t("error")}</p>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => mutate()}
                  >
                    <RefreshCcw />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
