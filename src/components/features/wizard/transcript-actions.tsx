import React from "react";
import { Transcript } from "assemblyai";
import { useTranslations } from "next-intl";

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
}: TranscriptActionsProps) {
  const t = useTranslations("TranscriptActions");

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
      {transcript && !subtitlesBlobUrl && (
        <Button
          onClick={generateSubtitles}
          disabled={!transcript || subtitlesLoading}
        >
          {t("generateSubtitles")}
        </Button>
      )}
      {transcript && subtitlesBlobUrl && (
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
