import React from 'react'
import { Skeleton } from '../ui/skeleton'

const SkeltonWorker = () => {
  return (
    <div>
      <div className="flex items-center justify-center flex-col border-2 space-y-4">
      
        <Skeleton className="h-[60px] w-[60px]   rounded-full" />
      <div className="flex justify-between  gap-3">
        <Skeleton className="h-6  w-[50px] rounded-sm" />
        <Skeleton className="h-6  w-[50px]  rounded-sm" />
        <Skeleton className="h-6 w-[50px]  rounded-sm" />
        <Skeleton className="h-6 w-[50px] rounded-sm" />
        <Skeleton className="h-6 flex-2 rounded-sm" />
      </div>
    </div>
    </div>
  )
}

export default SkeltonWorker
