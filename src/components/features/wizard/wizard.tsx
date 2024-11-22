"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import useSWRMutation from "swr/mutation";

import assemblyAI from "@/lib/assemblyai";
import { extractAudioFromVideo } from "@/lib/audio-extractor";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Insights from "@/components/features/insights/insights";
import FilePreview from "@/components/features/preview/file-preview";
import UploadArea from "@/components/features/upload/upload-area";

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
    iab_categories: true,
    entity_detection: true,
    auto_highlights: true,
  });
};

const fetchSubtitles = async (transcriptId: string) =>
  await assemblyAI.transcripts.subtitles(transcriptId, "vtt");

export default function Wizard() {
  const [file, setFile] = useState<File | null>(null);
  const [showInsights, setShowInsights] = useState(false);

  const {
    data: transcript,
    isMutating: transcriptLoading,
    error: transcriptError,
    trigger: generateTranscript,
  } = useSWRMutation(file, fetchTranscript);

  const {
    data: subtitles,
    isMutating: subtitlesLoading,
    trigger: generateSubtitles,
  } = useSWRMutation(transcript?.id ?? null, fetchSubtitles);

  const subtitlesBlobUrl =
    subtitles &&
    URL.createObjectURL(new Blob([subtitles], { type: "text/vtt" }));

  const t = useTranslations("Wizard");

  return (
    <Card>
      <CardContent>
        {!file ? (
          <UploadArea uploadFile={(file) => setFile(file)} />
        ) : (
          <div className="flex flex-col gap-4">
            <FilePreview file={file} subtitlesSrc={subtitlesBlobUrl} />
            <div className="flex w-full justify-between gap-2">
              <Button variant="outline" onClick={() => setFile(null)}>
                {t("restart")}
              </Button>
              {!showInsights || transcriptLoading || transcriptError ? (
                <Button
                  onClick={() => {
                    setShowInsights(true);
                    generateTranscript();
                  }}
                  disabled={!file || transcriptError}
                >
                  {t("transcribe")}
                </Button>
              ) : !subtitlesBlobUrl ? (
                <Button
                  onClick={() => {
                    generateSubtitles();
                  }}
                  disabled={!transcript || subtitlesLoading}
                >
                  {t("generateSubtitles")}
                </Button>
              ) : (
                <Button asChild>
                  <a
                    href={subtitlesBlobUrl}
                    download={`${file.name.split(".").slice(0, -1).join(".")}.vtt`}
                  >
                    {t("downloadSubtitles")}
                  </a>
                </Button>
              )}
            </div>
            {showInsights && (
              <Insights
                transcript={transcript}
                loading={transcriptLoading}
                error={!!transcriptError}
                retry={generateTranscript}
              />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
