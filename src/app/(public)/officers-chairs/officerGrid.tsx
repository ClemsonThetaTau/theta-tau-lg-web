import { PublicBrother, PublicOfficerData } from '@/components/types/brother'
import { PositionHeadshot, SkeletonHeadshot } from '@/components/ui/headshot'

interface OfficerGridProps {
  officers: PublicOfficerData | undefined
  brothers: { [key: string]: PublicBrother } | undefined
}

export default function OfficerGrid({ officers, brothers }: OfficerGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 justify-items-center items-center">
      {(brothers && officers && (
        <>
          <PositionHeadshot
            brother={brothers[officers.ec.regent]}
            position="Regent"
          />
          <PositionHeadshot
            brother={brothers[officers.ec.viceRegent]}
            position="Vice Regent"
          />
          <PositionHeadshot
            brother={brothers[officers.ec.scribe]}
            position="Scribe"
          />
          <PositionHeadshot
            brother={brothers[officers.ec.treasurer]}
            position="Treasurer"
          />
          <PositionHeadshot
            brother={brothers[officers.ec.correspondingSecretary]}
            position="Corresponding Secretary"
          />
          <PositionHeadshot
            brother={brothers[officers.ec.delegateAtLarge]}
            position="Delegate At Large"
          />
          <div className="col-start-1 md:col-start-2">
            <PositionHeadshot
              brother={brothers[officers.ec.newMemberEducator]}
              position="New Member Educator"
            />
          </div>
        </>
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
