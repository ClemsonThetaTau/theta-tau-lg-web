import { EventSection } from './event-section'

export default function Rush() {
  var offset = -300; //Timezone offset for EST in minutes.
  const targetDate = new Date('2024-09-03T23:00:00Z')

  return (
    <div className="container mx-auto p-4">
        {/* <EventSection title={"Info Session"} description='Join us for an informative session about rush week!' date={targetDate} image='/images/rush/info-session.png' location={{name: "Brackett 100", latitude: 34.67888266242274, longitude: -82.83690615210095}} backgroundColor={"#FFEAC5"} /> */}
        {/* <EventSection title={"Labor Day Cookout"} description='Meet us at Y-Beach for some hamburgers and games!' date={targetDate} image='/images/rush/cookout.png' location={{name: "Y-Beach", latitude: 34.682091461464395, longitude: -82.86103865227058}} backgroundColor={"#FFEAC5"} /> */}
        <EventSection title={"Community Service"} description='Join us for a day of community service!' date={targetDate} image='/images/rush/community-service.png' location={{name: "Hendrix Meeting Rooms", latitude: 34.67608092642256, longitude: -82.83185037456722}} backgroundColor={"#FFEAC5"} />
    </div>
  )
}