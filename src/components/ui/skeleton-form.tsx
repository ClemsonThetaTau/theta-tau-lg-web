import { Skeleton } from '@/components/ui/skeleton'

const SkeletonForm: React.FC = () => {
  return (
    <div className="w-full max-w-3xl p-4">
      {/* Form Title */}
      <Skeleton className="h-6 w-3/4" />

      {/* Multiple input fields */}
      <div className="space-y-4 mt-6">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Textarea or large input field */}
      <div className="mt-6">
        <Skeleton className="h-32 w-full" />
      </div>

      {/* Buttons or smaller components */}
      <div className="flex space-x-4 mt-6">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  )
}

export { SkeletonForm }
