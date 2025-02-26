import React from 'react'
import { SocialButton } from '@/components/ui/data-display/socials'
import { AiFillFacebook, AiFillInstagram, AiFillMail } from 'react-icons/ai'
import { getPayloadClient } from '@/payload/payload'

// This is a server component that fetches data from Payload CMS
export default async function SocialsFooter() {
  // Default values in case CMS data is not available yet
  let socialsData = {
    backgroundImage: '/images/photos/death-valley-balloons.jpg',
    title: 'Check out our Social Media!',
    socialLinks: [
      { platform: 'facebook', url: 'https://www.facebook.com/ClemsonThetaTau/' },
      { platform: 'instagram', url: 'https://www.instagram.com/clemsonthetatau' },
      { platform: 'email', url: 'mailto:lambda.gamma@thetatau.org' },
    ],
  }

  try {
    // Fetch the home page content from Payload CMS
    const client = await getPayloadClient()
    const response = await client.find({
      collection: 'home-page-content',
      limit: 1,
    })

    // If there's data, use it
    if (response.docs.length > 0 && response.docs[0].socialsFooter) {
      const homePageContent = response.docs[0]
      
      // Update the background image if available
      if (homePageContent.socialsFooter.backgroundImage?.url) {
        socialsData.backgroundImage = homePageContent.socialsFooter.backgroundImage.url
      }

      // Update the title if available
      if (homePageContent.socialsFooter.title) {
        socialsData.title = homePageContent.socialsFooter.title
      }

      // Update the social links if available
      if (homePageContent.socialsFooter.socialLinks?.length) {
        socialsData.socialLinks = homePageContent.socialsFooter.socialLinks
      }
    }
  } catch (error) {
    // If there's an error, use the default values
    console.error('Error fetching socials footer data:', error)
  }

  // Helper function to get the appropriate icon based on the platform
  const getIconForPlatform = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return <AiFillFacebook size={40} />
      case 'instagram':
        return <AiFillInstagram size={40} />
      case 'email':
        return <AiFillMail size={40} />
      default:
        return <AiFillFacebook size={40} />
    }
  }

  return (
    <div 
      className="relative w-full h-96 bg-bottom bg-cover bg-fixed"
      style={{ backgroundImage: `url(${socialsData.backgroundImage})` }}
    >
      <div className="w-full h-full backdrop-filter backdrop-blur-md" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
        <h3 className="text-primary-foreground text-xl md:text-4xl font-bold mb-8">
          {socialsData.title}
        </h3>
        <div className="flex flex-row items-center justify-center space-x-4">
          {socialsData.socialLinks.map((social, index) => (
            <SocialButton 
              key={index} 
              icon={getIconForPlatform(social.platform)} 
              link={social.url} 
            />
          ))}
        </div>
      </div>
    </div>
  )
}
