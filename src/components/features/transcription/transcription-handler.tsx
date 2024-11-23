"use client";

import { useRef, useState } from "react";
import useSWRMutation from "swr/mutation";

import { Card, CardContent } from "@/components/ui/card";
import Insights from "@/components/features/insights/insights";
import FilePreview from "@/components/features/preview/file-preview";
import {
  fetchSubtitles,
  fetchTranscript,
} from "@/components/features/transcription/fetchers";
import TranscriptActions from "@/components/features/transcription/transcript-actions";
import UploadArea from "@/components/features/upload/upload-area";

export default function TranscriptionHandler() {
  const [file, setFile] = useState<File | null>(null);

  const mediaRef = useRef<HTMLVideoElement>(null);

  const {
    data: transcript,
    isMutating: transcriptLoading,
    error: transcriptError,
    trigger: generateTranscript,
    reset: resetTranscript,
  } = useSWRMutation(file, fetchTranscript);

  const {
    data: subtitles,
    isMutating: subtitlesLoading,
    error: subtitlesError,
    trigger: generateSubtitles,
    reset: resetSubtitles,
  } = useSWRMutation(transcript?.id ?? null, fetchSubtitles);

  const resetAll = () => {
    setFile(null);
    resetTranscript();
    resetSubtitles();
  };

  const playMediaSegment = (start: number, end: number) => {
    if (mediaRef.current && start && end) {
      mediaRef.current.currentTime = start / 1000;
      mediaRef.current.play();
      setTimeout(() => mediaRef.current?.pause(), end - start);
    }
  };

  const subtitlesBlobUrl =
    subtitles &&
    URL.createObjectURL(new Blob([subtitles], { type: "text/vtt" }));

  return (
    <Card>
      <CardContent>
        {!file ? (
          <UploadArea uploadFile={(file) => setFile(file)} />
        ) : (
          <div className="flex flex-col gap-4">
            <FilePreview
              file={file}
              subtitlesSrc={subtitlesBlobUrl}
              mediaRef={mediaRef}
            />
            <TranscriptActions
              file={file!}
              discardFile={resetAll}
              generateTranscript={generateTranscript}
              transcript={transcript}
              transcriptLoading={transcriptLoading}
              transcriptError={!!transcriptError}
              generateSubtitles={generateSubtitles}
              subtitlesBlobUrl={subtitlesBlobUrl}
              subtitlesLoading={subtitlesLoading}
              subtitlesError={!!subtitlesError}
            />
            {(transcript?.status === "completed" ||
              transcriptLoading ||
              !!transcriptError) && (
              <Insights
                transcript={transcript}
                transcriptLoading={transcriptLoading}
                transcriptError={!!transcriptError}
                retry={generateTranscript}
                playMediaSegment={playMediaSegment}
              />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
