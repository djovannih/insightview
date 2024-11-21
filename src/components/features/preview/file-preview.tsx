import { useTranslations } from "next-intl";

interface FilePreviewProps {
  file: File;
}

export default function FilePreview({ file }: FilePreviewProps) {
  const t = useTranslations("FilePreview");

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2">
      {file.type.startsWith("audio/") ? (
        <audio className="w-full" controls>
          <source src={URL.createObjectURL(file)} type={file.type} />
          {t("audioNotSupported")}
        </audio>
      ) : (
        <video className="h-full w-full rounded-md" controls>
          <source src={URL.createObjectURL(file)} type={file.type} />
          {t("videoNotSupported")}
        </video>
      )}
    </div>
  );
}
