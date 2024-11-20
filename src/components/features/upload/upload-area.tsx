"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import { Upload } from "lucide-react";
import { useTranslations } from "next-intl";

const inputId = "dropzone-file";

interface UploadFormProps {
  uploadFile: (file: File) => void;
}

export default function UploadForm({ uploadFile }: UploadFormProps) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations("UploadForm");

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files.item(0);
    if (file) uploadFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.item(0);
    if (file) uploadFile(file);
  };

  return (
    <label
      htmlFor={inputId}
      className={clsx(
        "mx-auto flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed",
        dragActive
          ? "border-border bg-muted/50"
          : "border-muted hover:border-accent hover:bg-muted/20",
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center gap-2 py-6">
        <Upload className="mb-2 size-12 text-muted-foreground sm:size-16" />
        <p className="text-lg text-foreground/50 sm:text-3xl">
          {t("uploadOrDragAndDrop")}
        </p>
        <p className="text-sm text-foreground/50 sm:text-lg">
          {t("uploadFile")}
        </p>
      </div>
      <input
        id={inputId}
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleChange}
        accept="audio/*,video/*"
      />
    </label>
  );
}
