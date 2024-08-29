import Image from 'next/image'
import dynamic from 'next/dynamic'

// const DynamicCountdownTimer = dynamic(() =>
//   import('@/components/ui/countdown-timer').then((mod) => mod.CountdownTimer), {ssr: false}
// )
const DynamicCountdownTimer = dynamic(
  () => import('@/components/ui/countdown-timer'),
  { ssr: false }
)

interface Location {
  name: string
  latitude: number
  longitude: number
}

interface Event {
  title: string
  description: string
  image: string
  date: Date
  location: Location
  backgroundColor: string
}

export const EventSection = ({
  title,
  description,
  image,
  date,
  location,
  backgroundColor,
}: Event) => {
  return (
    <div
      className="grid grid-cols-1 gap-4 items-center justify-center absolute top-0 right-0 bottom-0 left-0 md:grid-cols-2 pt-16 md:pt-0"
      style={{ backgroundColor: backgroundColor }}
    >
      <div className="order-2 md:order-1 row-span-2 md:row-span-1 self-start md:self-auto">
        <DynamicCountdownTimer targetDate={date} />
        <h2 className="text-primary m-4 mt-8 text-xl md:text-5xl font-bold w-auto text-center">
          {title}
        </h2>
        <p className="text-foreground md:text-lg p-2 md:px-8 text-center">
          {description}
        </p>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline text-center block mt-4"
        >
          {location.name}
        </a>
      </div>
      <div className="order-1 md:order-2 flex justify-center">
        <Image
          src={image}
          alt={title}
          width={0}
          height={0}
          sizes="
          (max-width: 600px) 480px,
          (max-width: 1200px) 800px,
          1200px"
          className="h-[50dvh] w-auto md:h-[75dvh]"
        />
      </div>
    </div>
  )
}
