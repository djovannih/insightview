"use client";

import { useTranslations } from "next-intl";
import useSWRMutation from "swr/mutation";

import assemblyAI from "@/lib/assemblyai";
import { extractAudioFromVideo } from "@/lib/audio-extractor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InsightsCard from "@/components/features/insights/insights-card";
import SummaryCard from "@/components/features/insights/summary-card";
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
    auto_highlights: true,
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
          <SummaryCard
            transcript={transcript}
            loading={isMutating}
            error={error}
            retry={reset}
          />
        </TabsContent>
        <TabsContent value="insights">
          <InsightsCard
            transcript={transcript}
            loading={isMutating}
            error={error}
            retry={reset}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
