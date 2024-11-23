import { Skeleton } from "@/components/ui/skeleton";

export default function TranscriptSkeleton() {
  return (
    <div className="flex h-96 w-full flex-col gap-4">
      <div className="flex w-full items-center gap-2">
        <Skeleton className="size-9" />
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/5" />
        </div>
      </div>
      <div className="flex w-full items-center gap-2">
        <Skeleton className="size-9" />
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-2/5" />
        </div>
      </div>
      <div className="flex w-full items-center gap-2">
        <Skeleton className="size-9" />
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
        </div>
      </div>
      <div className="flex w-full items-center gap-2">
        <Skeleton className="size-9" />
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
        </div>
      </div>
      <div className="flex w-full items-center gap-2">
        <Skeleton className="size-9" />
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-2/3" />
        </div>
      </div>
      <div className="flex w-full items-center gap-2">
        <Skeleton className="size-9" />
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-1/2" />
        </div>
      </div>
    </div>
  );
}
