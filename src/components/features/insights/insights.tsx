"use client";

import { useEffect } from "react";
import { Transcript } from "assemblyai";
import { useTranslations } from "next-intl";
import useSWRMutation from "swr/mutation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArticleCard from "@/components/features/insights/article-card";
import { fetchArticle } from "@/components/features/insights/fetchers";
import InsightsCard from "@/components/features/insights/insights-card";
import TranscriptCard from "@/components/features/insights/transcript-card";

interface InsightsProps {
  transcript: Transcript | undefined;
  transcriptLoading: boolean;
  transcriptError: boolean;
  retry: () => void;
}

export default function Insights({
  transcript,
  transcriptLoading,
  transcriptError,
  retry,
}: InsightsProps) {
  const {
    data: articleHtml,
    isMutating: articleLoading,
    error: articleError,
    trigger: generateArticle,
  } = useSWRMutation(transcript?.id ?? null, fetchArticle);

  useEffect(() => {
    if (transcript?.status === "completed") generateArticle();
  }, [transcript?.status, generateArticle]);

  const t = useTranslations("Insights");

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <Tabs defaultValue="transcription" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="transcription">{t("transcription")}</TabsTrigger>
          <TabsTrigger value="article">{t("draftArticle")}</TabsTrigger>
          <TabsTrigger value="insights">{t("insights")}</TabsTrigger>
        </TabsList>
        <TabsContent value="transcription">
          <TranscriptCard
            transcript={transcript}
            transcriptLoading={transcriptLoading}
            transcriptError={transcriptError}
            retry={retry}
          />
        </TabsContent>
        <TabsContent value="article">
          <ArticleCard
            articleHtml={articleHtml}
            loading={transcriptLoading || articleLoading}
            error={transcriptError || articleError}
            retry={transcriptError ? retry : generateArticle}
          />
        </TabsContent>
        <TabsContent value="insights">
          <InsightsCard
            transcript={transcript}
            loading={transcriptLoading}
            error={transcriptError}
            retry={retry}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
