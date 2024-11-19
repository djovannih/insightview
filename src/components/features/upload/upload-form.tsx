"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import { Upload } from "lucide-react";
import { useTranslations } from "next-intl";

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
      htmlFor="dropzone-file"
      className={clsx(
        "mx-auto flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-gray-50 hover:bg-gray-100",
        dragActive
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 hover:border-gray-400",
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center gap-2 py-6">
        <Upload className="mb-2 h-10 w-10 text-gray-400" />
        <p className="text-sm text-gray-400">
          {t.rich("uploadOrDragAndDrop", {
            semibold: (chunks) => (
              <span className="font-semibold">{chunks}</span>
            ),
          })}
        </p>
        <p className="text-xs text-gray-400">{t("uploadFile")}</p>
      </div>
      <input
        id="dropzone-file"
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleChange}
        accept="audio/*,video/*"
      />
    </label>
  );
}
