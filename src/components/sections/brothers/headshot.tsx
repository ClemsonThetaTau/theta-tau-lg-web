import React from 'react'
import { Brother } from '@/components/sections/brothers/brother'

interface HeadshotProps {
    brother: Brother
}

const Headshot: React.FC<HeadshotProps> = ({ brother }) => {
  return (
    <div className="w-48" key={brother.email}>
      <img src={brother.image} alt={brother.name} className="w-full h-auto object-cover aspect-square" />
      <div>
        <h2 className="text-lg">{brother.name}</h2>
        <p className="text-sm">{brother.email}</p>
        <p className="text-sm">{brother.major}</p>
      </div>
    </div>
  )
}

export { Headshot }
