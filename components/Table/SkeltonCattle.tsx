import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCattle() {
  return (
    <div className="flex items-center space-x-4">
      
      <div className="flex justify-between w-full gap-3">
        <Skeleton className="h-6 w-[60px]   rounded-sm" />
        <Skeleton className="h-6  w-[120px] rounded-sm" />
        <Skeleton className="h-6  w-[120px]  rounded-sm" />
        <Skeleton className="h-6 w-[120px]  rounded-sm" />
        <Skeleton className="h-6 w-[120px] rounded-sm" />
        <Skeleton className="h-6 flex-2 rounded-sm" />
      </div>
    </div>
  )
}
