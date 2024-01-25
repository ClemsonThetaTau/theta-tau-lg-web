import { PublicBrother, PublicOfficerData } from '@/components/types/brother'

import { PositionHeadshot, SkeletonHeadshot } from '@/components/ui/headshot'

interface ChairGridProps {
  officers: PublicOfficerData | undefined
  brothers: { [key: string]: PublicBrother } | undefined
}

export default function ChairGrid({ officers, brothers }: ChairGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 justify-items-center items-center">
      {(brothers &&
        officers &&
        officers.chairs.map(
          ({ posName, userId }: { posName: string; userId: string }) => (
            <PositionHeadshot
              key={userId}
              brother={brothers[userId]}
              position={posName}
            />
          )
        )) || (
        <>
          <SkeletonHeadshot />
          <SkeletonHeadshot />
          <SkeletonHeadshot />
          <SkeletonHeadshot />
          <SkeletonHeadshot />
          <SkeletonHeadshot />
        </>
      )}
    </div>
  )
}
