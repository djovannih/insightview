"use client";

import { useEffect } from "react";
import { Transcript } from "assemblyai";
import { useTranslations } from "next-intl";

import { useArticleGeneration } from "@/hooks/use-article-generation";
import { useHighlightsGeneration } from "@/hooks/use-highlights-generation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArticleCard from "@/components/features/insights/draft-article/article-card";
import HighlightsCard from "@/components/features/insights/highlights/highlights-card";
import TranscriptCard from "@/components/features/insights/transcript/transcript-card";

interface InsightsProps {
  transcript: Transcript | undefined;
  transcriptLoading: boolean;
  transcriptError: boolean;
  retry: () => void;
  playMediaSegment: (start: number, end: number) => void;
}

export default function Insights({
  transcript,
  transcriptLoading,
  transcriptError,
  retry,
  playMediaSegment,
}: InsightsProps) {
  const {
    data: article,
    loading: articleLoading,
    error: articleError,
    trigger: generateArticle,
  } = useArticleGeneration(transcript?.id);
  const {
    data: highlights,
    loading: highlightsLoading,
    error: highlightsError,
    trigger: generateHighlights,
  } = useHighlightsGeneration(transcript);

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
            playMediaSegment={playMediaSegment}
          />
        </TabsContent>
        <TabsContent value="article">
          <ArticleCard
            articleHtml={article}
            loading={transcriptLoading || articleLoading}
            error={transcriptError || articleError}
            retry={transcriptError ? retry : generateArticle}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
