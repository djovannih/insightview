"use client";

import { useState } from "react";
import useSWRMutation from "swr/mutation";

import assemblyAI from "@/lib/assemblyai";
import { extractAudioFromVideo } from "@/lib/audio-extractor";
import { Card, CardContent } from "@/components/ui/card";
import Insights from "@/components/features/insights/insights";
import FilePreview from "@/components/features/preview/file-preview";
import UploadArea from "@/components/features/upload/upload-area";
import TranscriptActions from "@/components/features/wizard/transcript-actions";

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

  return (
    <Card>
      <CardContent>
        {!file ? (
          <UploadArea uploadFile={(file) => setFile(file)} />
        ) : (
          <div className="flex flex-col gap-4">
            <FilePreview file={file} subtitlesSrc={subtitlesBlobUrl} />
            <TranscriptActions
              file={file!}
              discardFile={() => setFile(null)}
              generateTranscript={generateTranscript}
              transcript={transcript}
              transcriptLoading={transcriptLoading}
              transcriptError={!!transcriptError}
              generateSubtitles={generateSubtitles}
              subtitlesBlobUrl={subtitlesBlobUrl}
              subtitlesLoading={subtitlesLoading}
            />
            {transcript && (
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
