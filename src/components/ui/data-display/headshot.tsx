import React from 'react'
import { PublicBrother } from '@/components/types/brother'
import { Skeleton } from '@/components/ui/skeleton'

interface HeadshotProps {
  brother: PublicBrother
}

const Headshot: React.FC<HeadshotProps> = ({ brother }) => {
  return (
    <div className="w-48" key={brother.displayEmail}>
      <img
        src={brother.profilePicture}
        alt={`${brother.firstName} ${brother.lastName}`}
        className="w-full h-auto object-cover aspect-square"
      />
      <div>
        <h2 className="text-lg">{`${brother.firstName} ${brother.lastName}`}</h2>
        <p className="text-sm">{brother.displayEmail}</p>
        <p className="text-sm">{brother.major}</p>
      </div>
    </div>
  )
}

interface PositionHeadshotProps extends HeadshotProps {
  position: string
}

const PositionHeadshot: React.FC<PositionHeadshotProps> = ({
  brother,
  position,
}) => {
  return (
    <div className="w-48" key={brother.displayEmail}>
      <img
        src={brother.profilePicture}
        alt={`${brother.firstName} ${brother.lastName}`}
        className="w-full h-auto object-cover aspect-square"
      />
      <div>
        <h2 className="text-lg">{position}</h2>
        <p className="text-sm">{`${brother.firstName} ${brother.lastName}`}</p>
        <p className="text-sm">{brother.displayEmail}</p>
      </div>
    </div>
  )
}

const SkeletonHeadshot: React.FC = () => {
  return (
    <div className="w-48">
      <Skeleton className="aspect-square" />
      <div className="space-y-2 mt-4">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  )
}

export { Headshot, PositionHeadshot, SkeletonHeadshot }
