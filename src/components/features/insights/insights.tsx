"use client";

import { useEffect } from "react";
import { Transcript } from "assemblyai";
import { useTranslations } from "next-intl";
import useSWRMutation from "swr/mutation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArticleCard from "@/components/features/insights/article-card";
import { fetchArticle } from "@/components/features/insights/fetchers";
import { fetchHighlights } from "@/components/features/insights/highlights/fetchers";
import HighlightsCard from "@/components/features/insights/highlights/highlights-card";
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

  const {
    data: highlights,
    isMutating: highlightsLoading,
    error: highlightsError,
    trigger: generateHighlights,
  } = useSWRMutation(transcript ?? null, fetchHighlights);

  useEffect(() => {
    if (transcript?.status === "completed") {
      generateArticle();
      generateHighlights();
    }
  }, [transcript?.status, generateArticle, generateHighlights]);

  const t = useTranslations("Insights");

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <Tabs defaultValue="transcription" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="transcription">{t("transcription")}</TabsTrigger>
          <TabsTrigger value="highlights">{t("highlights")}</TabsTrigger>
          <TabsTrigger value="article">{t("draftArticle")}</TabsTrigger>
        </TabsList>
        <TabsContent value="transcription">
          <TranscriptCard
            transcript={transcript}
            transcriptLoading={transcriptLoading}
            transcriptError={transcriptError}
            retry={retry}
          />
        </TabsContent>
        <TabsContent value="highlights">
          <HighlightsCard
            highlights={highlights}
            loading={transcriptLoading || highlightsLoading}
            error={transcriptError || highlightsError}
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
      </Tabs>
    </div>
  );
}
