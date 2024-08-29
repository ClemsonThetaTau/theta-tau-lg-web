import { EventSection } from './event-section'

export default function Rush() {
  var offset = -300; //Timezone offset for EST in minutes.
  const targetDate = new Date('2024-08-29T23:00:00Z')

  return (
    <div className="container mx-auto p-4">
        <EventSection title={"Info Session"} description='Join us for an informative session about rush week!' date={targetDate} image='/images/rush/info-session.png' location={{name: "Brackett 100", latitude: 34.67888266242274, longitude: -82.83690615210095}} backgroundColor={"#FFEAC5"} />
    </div>
  )
}