import Image from 'next/image'
import { Separator } from '@/components/ui/separator'

export default function Pillars() {
  return (
    <section className="my-8 mx-4 md:mx-8 py-8 px-4 md:px-24">
      <div className="space-y-1">
        <h3 className="text-3xl md:text-5xl font-light leading-none text-center">
          The Three Pillars of Theta Tau
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
            <h4 className="text-xl font-medium my-2">Brotherhood</h4>
          </div>
          <p className="text-base leading-normal">
            We forge lifelong bonds of fraternal friendship, a journey that
            develops and delivers a network of lasting personal and professional
            relationships. We foster an inviting, safe, and social environment
            in which our members become friends for life. We work hard to create
            a tight knit group of friends we can rely on during each brother’s
            college years.
          </p>
          <br />
          <p className="text-base">Semester Events Include:</p>
          <ul className="list-disc list-inside pl-4">
            <li>Tailgating</li>
            <li>Brothers-Only Retreat Weekend</li>
            <li>Semi/Formal</li>
            <li>Intramural Sports</li>
            <li>Big/Little Reveal</li>
          </ul>
        </div>
        <Separator className="self-stretch h-auto" orientation="vertical" />
        <div>
          <div className="text-center">
            <div className="flex justify-center">
              <Image
                src="/images/icons/professionalism.png"
                alt="Brotherhood"
                width={100}
                height={100}
              />
            </div>
            <h4 className="text-xl font-medium my-2">
              Professional Development
            </h4>
          </div>
          <p className="text-base leading-normal">
            We develop and nurture engineers with strong communication,
            problem-solving, collaboration, and leadership skills that we
            demonstrate in our profession, our community, and in our lives. Our
            professional development events prepare brothers for life after
            college by giving members the opportunity to network with
            professionals, improve their resume, and plan for the future.
          </p>
          <br />
          <p className="text-base">Semester Events Include:</p>
          <ul className="list-disc list-inside pl-4">
            <li>Resume Workshop</li>
            <li>Co-Op Panel</li>
            <li>Building Tours</li>
            <li>Finals Week Library Camp Out</li>
          </ul>
        </div>
        <Separator className="self-stretch h-auto" orientation="vertical" />
        <div>
          <div className="text-center">
            <div className="flex justify-center">
              <Image
                src="/images/icons/service.png"
                alt="Brotherhood"
                width={100}
                height={100}
              />
            </div>
            <h4 className="text-xl font-medium my-2">Service</h4>
          </div>
          <p className="text-base leading-normal">
            We are known for our service to our university and the greater
            community. Our service projects create an environment for learning
            and personal growth for our members. We value the community benefits
            of service, as well as the strong bonds forged by service alongside
            our brothers.
          </p>
          <br />
          <p className="text-base">Semester Events Include:</p>
          <ul className="list-disc list-inside pl-4">
            <li>Habitat for Humanity</li>
            <li>Adopt-A-Highway</li>
            <li>Operation Christmas Child</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
