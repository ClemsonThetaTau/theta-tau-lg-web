import { Carousel } from '@/components/ui/carousel'

export default function CarouselPage() {
  return (
    <Carousel images={[{title: 'testing', url: '/images/bowman.jpg'}, {title: 'gavin electric', url: '/images/gavin-electric.jpg'}, {title: 'testing', url: '/images/bowman.jpg'}]}/>
  )
}