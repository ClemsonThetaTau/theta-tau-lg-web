'use client'

import dynamic from 'next/dynamic'

const DynamicCarousel = dynamic(() => import('./carousel'), {
  ssr: false
})

export default DynamicCarousel;