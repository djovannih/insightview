"use client";

import { Entity, EntityType } from "assemblyai";
import { useTranslations } from "next-intl";
import useSWRMutation from "swr/mutation";

import assemblyAI from "@/lib/assemblyai";
import { extractAudioFromVideo } from "@/lib/audio-extractor";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ErrorMessage from "@/components/features/insights/error-message";
import TranscriptCard from "@/components/features/insights/transcript-card";

const fetchTranscript = async (file: File) => {
  const buffer = Buffer.from(
    file.type.startsWith("video/")
      ? await extractAudioFromVideo(file)
      : await file.arrayBuffer(),
  );

  return await assemblyAI.transcripts.transcribe({
    audio: buffer,
    speech_model: "nano",
    language_detection: true,
    speaker_labels: true,
    format_text: true,
    summarization: true,
    summary_model: "conversational",
    summary_type: "bullets",
    entity_detection: true,
  });
};

interface InsightsProps {
  file: File;
}

export default function Insights({ file }: InsightsProps) {
  const {
    data: transcript,
    isMutating,
    error,
    trigger,
    reset,
  } = useSWRMutation(file, fetchTranscript);

  if (trigger && !isMutating && !error && !transcript) trigger();

  const t = useTranslations("Insights");

  return (
    <div className="flex flex-col items-center gap-2">
      <Tabs defaultValue="transcription" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="transcription">{t("transcription")}</TabsTrigger>
          <TabsTrigger value="summary">{t("keyPoints")}</TabsTrigger>
          <TabsTrigger value="insights">{t("insights")}</TabsTrigger>
        </TabsList>
        <TabsContent value="transcription">
          <TranscriptCard
            transcript={transcript}
            loading={isMutating}
            error={error}
            retry={reset}
          />
        </TabsContent>
        <TabsContent value="summary">
          <Card>
            <CardContent className="flex flex-col">
              {transcript && !isMutating && !error && (
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
              {isMutating && (
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
              {error && <ErrorMessage retry={reset} />}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="insights">
          <Card>
            <CardContent className="flex flex-col">
              {transcript && !isMutating && !error && (
                <>
                  {transcript.entities && transcript.entities.length > 0 ? (
                    <ScrollArea>
                      <div className="flex flex-col gap-2">
                        <span className="font-bold">{t("entities")}</span>
                        <ul className="flex max-h-96 list-disc flex-col gap-1 pl-5 pr-4">
                          {[
                            ...transcript.entities
                              .reduce((entityGroups, entity) => {
                                const currentEntities =
                                  entityGroups.get(entity.entity_type) ?? [];
                                return currentEntities.some(
                                  (e) => e.text === entity.text,
                                )
                                  ? entityGroups
                                  : new Map(entityGroups).set(
                                      entity.entity_type,
                                      [...currentEntities, entity],
                                    );
                              }, new Map<EntityType, Entity[]>())
                              .entries(),
                          ].map(([entityType, entities]) => (
                            <li key={entityType}>
                              <span className="font-semibold">
                                {`${t(entityType, { count: entities.length })}: `}
                              </span>
                              {entities.map((entity) => entity.text).join(", ")}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </ScrollArea>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-4">
                      <p>{t("noEntities")}</p>
                    </div>
                  )}
                </>
              )}
              {isMutating && (
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
              {error && <ErrorMessage retry={reset} />}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
