import React from 'react'
import { Brother } from '@/components/types/brother'

interface HeadshotProps {
  brother: Brother
}

const Headshot: React.FC<HeadshotProps> = ({ brother }) => {
  return (
    <div className="w-48" key={brother.email}>
      <img
        src={brother.image}
        alt={brother.name}
        className="w-full h-auto object-cover aspect-square"
      />
      <div>
        <h2 className="text-lg">{brother.name}</h2>
        <p className="text-sm">{brother.email}</p>
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
    <div className="w-48" key={brother.email}>
      <img
        src={brother.image}
        alt={brother.name}
        className="w-full h-auto object-cover aspect-square"
      />
      <div>
        <h2 className="text-lg">{position}</h2>
        <p className="text-sm">{brother.name}</p>
        <p className="text-sm">{brother.email}</p>
      </div>
    </div>
  )
}

export { Headshot, PositionHeadshot }
