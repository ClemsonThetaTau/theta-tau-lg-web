import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Carousel } from '@/components/ui/carousel'

const images = [
  {
    title: 'Bowman Feild',
    url: '/images/bowman.jpg',
  },
  {
    title: 'Gavin Electric',
    url: '/images/gavin-electric.jpg',
  },
  {
    title: 'Bowman Feild2',
    url: '/images/bowman.jpg',
  },
  {
    title: 'Gavin Electric2',
    url: '/images/gavin-electric.jpg',
  },
  {
    title: 'Bowman Feild3',
    url: '/images/bowman.jpg',
  },
]

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-full h-128">
        <Image
          src="/images/bowman.jpg"
          fill={true}
          alt="Banner Image"
          className="object-cover bg-gray-900"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
          <h1 className="text-5xl font-bold tracking-wider">Theta Tau</h1>
          <h2 className="text-3xl font-medium tracking-widest">
            Lambda Gamma Chapter
          </h2>
        </div>
      </div>
      <div className="my-8 h-96 w-full flex items-center justify-center">
        <Carousel
          images={images}
        />
      </div>
      <div className="w-full bg-red-600 mt-8 py-8 px-4 flex flex-col items-center justify-center">
        <h3 className="text-white text-2xl font-medium tracking-wider mb-4 text-center">
          Want to Join the Brotherhood?
        </h3>
        <p className="text-white text-lg font-light tracking-wide mb-4 text-center">
          Check out our Rush section for more information
        </p>
        <Button>Rush Information</Button>
      </div>
    </div>
  )
}
