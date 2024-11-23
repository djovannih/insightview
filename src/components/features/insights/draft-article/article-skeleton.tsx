import { Skeleton } from "@/components/ui/skeleton";

export default function ArticleSkeleton() {
  return (
    <div className="flex h-96 w-full flex-col gap-4">
      <div className="flex w-full flex-col justify-center gap-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/5" />
      </div>
      <div className="flex w-full flex-col justify-center gap-2">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-2/5" />
      </div>
      <div className="flex w-full flex-col justify-center gap-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5" />
      </div>
    </div>
  );
}
