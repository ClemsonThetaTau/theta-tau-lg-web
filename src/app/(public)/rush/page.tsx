import { EventSection } from './event-section'

export default function Rush() {
  var offset = -300; //Timezone offset for EST in minutes.
  const targetDate = new Date('2024-08-31T18:00:00Z')

  return (
    <div className="container mx-auto p-4">
        <EventSection title={"Ice Cream Social"} description='Join us for a fun Ice Cream Social on bowman!' date={targetDate} image='/images/rush/speed-dating.png' location={{name: "Bowman Field", latitude: 34.6806959, longitude: -82.8364759}} backgroundColor={"#FFEAC5"} />
    </div>
  )
}