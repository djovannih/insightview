"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Stepper from "@/components/ui/stepper";
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
      </CardContent>
    </Card>
  );
}
