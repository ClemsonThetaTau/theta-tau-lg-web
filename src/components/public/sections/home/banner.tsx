import Image from 'next/image'
import { getPayloadClient } from '@/payload/payload'

// This is a server component that fetches data from Payload CMS
export default async function Banner() {
  // Default values in case CMS data is not available yet
  let bannerData = {
    image: {
      url: '/images/banners/home-page.jpg',
      alt: 'Banner Image',
    },
    title: 'THETA TAU',
    subtitle: 'LAMBDA GAMMA CHAPTER',
    location: 'CLEMSON, SC',
  }

  try {
    // Fetch the home page content from Payload CMS
    const client = await getPayloadClient()
    const response = await client.find({
      collection: 'home-page-content',
      limit: 1,
    })

    // If there's data, use it
    if (response.docs.length > 0 && response.docs[0].banner) {
      const homePageContent = response.docs[0]
      bannerData = {
        image: {
          url: homePageContent.banner.image?.url || bannerData.image.url,
          alt: homePageContent.banner.image?.alt || bannerData.image.alt,
        },
        title: homePageContent.banner.title || bannerData.title,
        subtitle: homePageContent.banner.subtitle || bannerData.subtitle,
        location: homePageContent.banner.location || bannerData.location,
      }
    }
  } catch (error) {
    // If there's an error, use the default values
    console.error('Error fetching banner data:', error)
  }

  return (
    <div className="relative w-full h-128">
      <Image
        src={bannerData.image.url}
        fill={true}
        alt={bannerData.image.alt}
        className="object-cover bg-gray-900"
      />
      <div className="absolute font-medium inset-0 flex flex-col items-center justify-center text-white text-center">
        <h1 className="text-8xl font-reydex drop-shadow-2xl-dark tracking-wider">{bannerData.title}</h1>
        <h2 className="text-3xl drop-shadow-2xl-dark tracking-widest">
          {bannerData.subtitle}
        </h2>
        <h3 className="text-3xl drop-shadow-2xl-dark tracking-widest">
          {bannerData.location}
        </h3>
      </div>
    </div>
  )
}
