import { Skeleton } from "@/components/ui/skeleton";

export default function TranscriptSkeleton() {
  return (
    <div className="flex h-96 w-full flex-col gap-6">
      <div className="flex w-full flex-col justify-center gap-2">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-5/6" />
      </div>
      <div className="flex w-full flex-col justify-center gap-2">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/5" />
      </div>
      <div className="flex w-full flex-col justify-center gap-2">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-1/3" />
      </div>
    </div>
  );
}
