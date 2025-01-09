import dynamic from 'next/dynamic'

const DynamicCarousel = dynamic(() => import('@/components/ui/carousel'), {
  ssr: false
})

export default DynamicCarousel;