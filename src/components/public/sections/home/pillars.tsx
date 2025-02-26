import Image from 'next/image'
import { Separator } from '@/components/ui/data-display/separator'
import { getPayloadClient } from '@/payload/payload'

// This is a server component that fetches data from Payload CMS
export default async function Pillars() {
  // Default values in case CMS data is not available yet
  let pillarsData = {
    title: 'THE THREE PILLARS',
    brotherhood: {
      title: 'Brotherhood',
      description: 'We forge lifelong bonds of fraternal friendship, a journey that develops and delivers a network of lasting personal and professional relationships. We foster an inviting, safe, and social environment in which our members become friends for life. We work hard to create a tight knit group of friends we can rely on during each brother\'s college years.',
      events: [
        { name: 'Tailgating' },
        { name: 'Brothers-Only Retreat Weekend' },
        { name: 'Semi/Formal' },
        { name: 'Intramural Sports' },
        { name: 'Big/Little Reveal' },
      ],
    },
    professionalism: {
      title: 'Professionalism',
      description: 'We develop and nurture engineers with strong communication, problem-solving, collaboration, and leadership skills that we demonstrate in our profession, our community, and in our lives. Our professional development events prepare brothers for life after college by giving members the opportunity to network with professionals, improve their resume, and plan for the future.',
      events: [
        { name: 'Resume Workshop' },
        { name: 'Co-Op Panel' },
        { name: 'Building Tours' },
        { name: 'Finals Week Library Camp Out' },
      ],
    },
    service: {
      title: 'Service',
      description: 'We are known for our service to our university and the greater community. Our service projects create an environment for learning and personal growth for our members. We value the community benefits of service, as well as the strong bonds forged by service alongside our brothers.',
      events: [
        { name: 'Habitat for Humanity' },
        { name: 'Adopt-A-Highway' },
        { name: 'Operation Christmas Child' },
      ],
    },
  }

  try {
    // Fetch the home page content from Payload CMS
    const client = await getPayloadClient()
    const response = await client.find({
      collection: 'home-page-content',
      limit: 1,
    })

    // If there's data, use it
    if (response.docs.length > 0 && response.docs[0].pillars) {
      const homePageContent = response.docs[0]
      
      // Update the title if available
      if (homePageContent.pillars.title) {
        pillarsData.title = homePageContent.pillars.title
      }

      // Update brotherhood data if available
      if (homePageContent.pillars.brotherhood) {
        const brotherhood = homePageContent.pillars.brotherhood
        pillarsData.brotherhood = {
          title: brotherhood.title || pillarsData.brotherhood.title,
          description: brotherhood.description || pillarsData.brotherhood.description,
          events: brotherhood.events?.length ? brotherhood.events : pillarsData.brotherhood.events,
        }
      }

      // Update professionalism data if available
      if (homePageContent.pillars.professionalism) {
        const professionalism = homePageContent.pillars.professionalism
        pillarsData.professionalism = {
          title: professionalism.title || pillarsData.professionalism.title,
          description: professionalism.description || pillarsData.professionalism.description,
          events: professionalism.events?.length ? professionalism.events : pillarsData.professionalism.events,
        }
      }

      // Update service data if available
      if (homePageContent.pillars.service) {
        const service = homePageContent.pillars.service
        pillarsData.service = {
          title: service.title || pillarsData.service.title,
          description: service.description || pillarsData.service.description,
          events: service.events?.length ? service.events : pillarsData.service.events,
        }
      }
    }
  } catch (error) {
    // If there's an error, use the default values
    console.error('Error fetching pillars data:', error)
  }

  return (
    <section className="my-8 mx-4 md:mx-8 py-8 px-4 md:px-24">
      <div className="space-y-1">
        <h3 className="text-3xl md:text-7xl font-bold leading-none text-center">
          {pillarsData.title}
        </h3>
      </div>
      <Separator className="m-4" />
      <div className="flex items-start space-x-0 md:space-x-4 space-y-8 md:space-y-0 text-base flex-col md:flex-row">
        <div>
          <div className="text-center">
            <div className="flex justify-center">
              <Image
                src="/images/icons/brotherhood.png"
                alt="Brotherhood"
                width={100}
                height={100}
              />
            </div>
            <h4 className="text-3xl font-medium font-reydex my-2">{pillarsData.brotherhood.title}</h4>
          </div>
          <p className="text-base leading-normal">
            {pillarsData.brotherhood.description}
          </p>
          <br />
          <p className="text-base">Semester Events Include:</p>
          <ul className="list-disc list-inside pl-4">
            {pillarsData.brotherhood.events.map((event, index) => (
              <li key={index}>{event.name}</li>
            ))}
          </ul>
        </div>
        <Separator className="self-stretch h-auto" orientation="vertical" />
        <div>
          <div className="text-center">
            <div className="flex justify-center">
              <Image
                src="/images/icons/professionalism.png"
                alt="Professionalism"
                width={100}
                height={100}
              />
            </div>
            <h4 className="text-3xl font-medium font-reydex my-2">
              {pillarsData.professionalism.title}
            </h4>
          </div>
          <p className="text-base leading-normal">
            {pillarsData.professionalism.description}
          </p>
          <br />
          <p className="text-base">Semester Events Include:</p>
          <ul className="list-disc list-inside pl-4">
            {pillarsData.professionalism.events.map((event, index) => (
              <li key={index}>{event.name}</li>
            ))}
          </ul>
        </div>
        <Separator className="self-stretch h-auto" orientation="vertical" />
        <div>
          <div className="text-center">
            <div className="flex justify-center">
              <Image
                src="/images/icons/service.png"
                alt="Service"
                width={100}
                height={100}
              />
            </div>
            <h4 className="text-3xl font-medium font-reydex my-2">{pillarsData.service.title}</h4>
          </div>
          <p className="text-base leading-normal">
            {pillarsData.service.description}
          </p>
          <br />
          <p className="text-base">Semester Events Include:</p>
          <ul className="list-disc list-inside pl-4">
            {pillarsData.service.events.map((event, index) => (
              <li key={index}>{event.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
