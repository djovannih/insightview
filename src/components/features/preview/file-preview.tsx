import { RefObject } from "react";
import { useTranslations } from "next-intl";

interface FilePreviewProps {
  file: File;
  subtitlesSrc: string | undefined;
  mediaRef: RefObject<HTMLVideoElement>;
}

export default function FilePreview({
  file,
  subtitlesSrc,
  mediaRef,
}: FilePreviewProps) {
  const t = useTranslations("FilePreview");

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2">
      <>
        {file.type.startsWith("audio/") && (
          <audio ref={mediaRef} className="w-full" controls>
            <source src={URL.createObjectURL(file)} type={file.type} />
            {t("audioNotSupported")}
          </audio>
        )}
        {file.type.startsWith("video/") && (
          <video ref={mediaRef} className="h-full w-full rounded-md" controls>
            <source src={URL.createObjectURL(file)} type={file.type} />
            {subtitlesSrc && (
              <track kind="subtitles" src={subtitlesSrc} default />
            )}
            {t("videoNotSupported")}
          </video>
        )}
      </>
    </div>
  );
}
