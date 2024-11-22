import { RefreshCcw } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

interface ErrorMessageProps {
  retry: () => void;
}

export default function ErrorMessage({ retry }: ErrorMessageProps) {
  const t = useTranslations("ErrorMessage");

  return (
    <div className="flex h-96 flex-col items-center justify-center gap-4">
      <p>{t("error")}</p>
      <Button variant="outline" size="icon" onClick={() => retry()}>
        <RefreshCcw />
      </Button>
    </div>
  );
}
