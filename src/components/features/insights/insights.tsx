import { Transcript } from "assemblyai";
import { useTranslations } from "next-intl";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InsightsCard from "@/components/features/insights/insights-card";
import SummaryCard from "@/components/features/insights/summary-card";
import TranscriptCard from "@/components/features/insights/transcript-card";

interface InsightsProps {
  transcript: Transcript | undefined;
  loading: boolean;
  error: boolean;
  retry: () => void;
}

export default function Insights({
  transcript,
  loading,
  error,
  retry,
}: InsightsProps) {
  const t = useTranslations("Insights");

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <Tabs defaultValue="transcription" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="transcription">{t("transcription")}</TabsTrigger>
          <TabsTrigger value="summary">{t("keyPoints")}</TabsTrigger>
          <TabsTrigger value="insights">{t("insights")}</TabsTrigger>
        </TabsList>
        <TabsContent value="transcription">
          <TranscriptCard
            transcript={transcript}
            transcriptLoading={loading}
            transcriptError={error}
            retry={retry}
          />
        </TabsContent>
        <TabsContent value="summary">
          <SummaryCard
            transcript={transcript}
            loading={loading}
            error={error}
            retry={retry}
          />
        </TabsContent>
        <TabsContent value="insights">
          <InsightsCard
            transcript={transcript}
            loading={loading}
            error={error}
            retry={retry}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
