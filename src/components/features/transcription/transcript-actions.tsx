import React, { useEffect } from "react";
import { Transcript } from "assemblyai";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

interface TranscriptActionsProps {
  file: File;
  discardFile: () => void;
  generateTranscript: () => void;
  transcript: Transcript | undefined;
  transcriptLoading: boolean;
  transcriptError: boolean;
  generateSubtitles: () => void;
  subtitlesBlobUrl: string | undefined;
  subtitlesLoading: boolean;
  subtitlesError: boolean;
}

export default function TranscriptActions({
  file,
  discardFile,
  generateTranscript,
  transcript,
  transcriptLoading,
  transcriptError,
  generateSubtitles,
  subtitlesBlobUrl,
  subtitlesLoading,
  subtitlesError,
}: TranscriptActionsProps) {
  const t = useTranslations("TranscriptActions");

  useEffect(() => {
    const loadingToastId = "loading";
    if (subtitlesLoading)
      toast.loading(t("loadingSubtitlesTitle"), {
        description: file.type.startsWith("video/")
          ? t("loadingSubtitlesDescriptionVideo")
          : t("loadingSubtitlesDescriptionAudio"),
        id: loadingToastId,
      });
    else toast.dismiss(loadingToastId);

    if (subtitlesError)
      toast.error(t("errorSubtitlesTitle"), {
        description: t("errorSubtitlesDescription"),
      });

    if (subtitlesBlobUrl && !subtitlesLoading && !subtitlesError)
      toast.success(t("successSubtitlesTitle"), {
        description: t("successSubtitlesDescription"),
        duration: 8000,
      });
  }, [subtitlesBlobUrl, subtitlesLoading, subtitlesError, file.type, t]);

  return (
    <div className="flex w-full justify-between gap-2">
      <Button variant="outline" onClick={discardFile}>
        {t("restart")}
      </Button>
      {!transcript && (
        <Button
          onClick={generateTranscript}
          disabled={!file || transcriptLoading || transcriptError}
        >
          {t("transcribe")}
        </Button>
      )}
      {transcript?.status === "completed" && !subtitlesBlobUrl && (
        <Button
          onClick={generateSubtitles}
          disabled={!transcript || subtitlesLoading}
        >
          {t("generateSubtitles")}
        </Button>
      )}
      {transcript?.status === "completed" && subtitlesBlobUrl && (
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
  );
}
