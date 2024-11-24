import { Card, CardContent } from "@/components/ui/card";
import TranscriptionHandler from "@/components/features/transcription/transcription-handler";

export default function Home() {
  return (
    <Card>
      <CardContent>
        <TranscriptionHandler />
      </CardContent>
    </Card>
  );
}
