"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Stepper from "@/components/ui/stepper";
import FilePreview from "@/components/features/preview/file-preview";
import UploadArea from "@/components/features/upload/upload-area";

export default function Wizard() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [file, setFile] = useState<File | null>(null);

  const t = useTranslations("Wizard");

  const steps = [t("upload"), t("transcribe"), t("results")];

  const uploadFile = (file: File): void => {
    setFile(file);
    setCurrentStepIndex(1);
  };

  return (
    <Card>
      <CardHeader>
        <Stepper steps={steps} currentStepIndex={currentStepIndex} />
      </CardHeader>
      <CardContent>
        {currentStepIndex === 0 && <UploadArea uploadFile={uploadFile} />}
        {currentStepIndex === 1 && <FilePreview file={file!} />}
      </CardContent>
      {currentStepIndex > 0 && (
        <CardFooter className="flex justify-end gap-4">
          <Button
            variant="secondary"
            onClick={() => setCurrentStepIndex(currentStepIndex - 1)}
          >
            {t("back")}
          </Button>
          <Button
            variant="default"
            onClick={() => setCurrentStepIndex(currentStepIndex + 1)}
            disabled={currentStepIndex === steps.length - 1}
          >
            {t("next")}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
