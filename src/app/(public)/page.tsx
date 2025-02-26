import Banner from '@/components/public/sections/home/banner'
import Pillars from '@/components/public/sections/home/pillars'
import SocialsFooter from '@/components/public/sections/home/socials-footer'
import CountdownSection from '@/components/public/sections/home/countdown-section'

import { Button } from '@/components/ui/data-entry/button'

// Note: Carousel will be connected to the CMS later
// import { ImageData } from '@/components/ui/data-display/carousel'
// import DynamicCarousel from '@/components/ui/data-display/dynamic-carousel'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Banner />
      <CountdownSection />
      {/* Carousel section commented out until CMS integration is complete
      <div className="my-8 h-96 w-full flex items-center justify-center">
        <DynamicCarousel images={[
          {
            title: 'Bowman!',
            url: '/images/photos/carousel/bowman-fun.jpg',
          },
          {
            title: 'STEM Night',
            url: '/images/photos/carousel/gavin-electric.jpg',
          },
          {
            title: 'Big Little!',
            url: '/images/photos/carousel/big-little.jpg',
          },
        ]} />
      </div>
      */}
      <div className="w-full bg-primary mt-8 py-8 md:py-16 px-4 flex flex-col items-center justify-center">
        <h3 className="text-white text-2xl md:text-5xl font-bold tracking-wider mb-4 text-center">
        JOIN THE BROTHERHOOD!
        </h3>
        <p className="text-white text-lg md:text-2xl font-light tracking-wide mb-4 text-center">
          Check out our Rush section for more information
        </p>
        <Button variant={'outline'}>Rush Information</Button>
      </div>
      <Pillars />
      <SocialsFooter />
    </div>
  )
}
