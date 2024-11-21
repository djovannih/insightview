"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import useSWRMutation from "swr/mutation";

import assemblyAI from "@/lib/assemblyai";
import { extractAudioFromVideo } from "@/lib/audio-extractor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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

export default function Wizard() {
  const [file, setFile] = useState<File | null>(null);
  const [showInsights, setShowInsights] = useState(false);

  const {
    data: transcript,
    isMutating,
    error,
    trigger,
    reset,
  } = useSWRMutation(file, fetchTranscript);

  const t = useTranslations("Wizard");

  return (
    <Card>
      <CardContent>
        {!file ? (
          <UploadArea uploadFile={(file) => setFile(file)} />
        ) : (
          <div className="flex flex-col gap-4">
            <FilePreview file={file} />
            {showInsights && (
              <Insights
                transcript={transcript}
                loading={isMutating}
                error={!!error}
                retry={reset}
              />
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-between gap-2">
          <Button variant="outline" onClick={() => setFile(null)}>
            {t("restart")}
          </Button>
          <Button
            onClick={() => {
              setShowInsights(true);
              trigger();
            }}
            disabled={!file || showInsights}
          >
            {t("transcribe")}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
