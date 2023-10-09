'use client'
import React from 'react'

import { SocialButton } from '@/components/ui/socials'
import { AiFillFacebook, AiFillInstagram, AiFillMail } from 'react-icons/ai'

const SocialsFooter: React.FC = () => {
  return (
    <div className="relative w-full h-96 bg-bottom bg-cover bg-fixed bg-[url('/images/photos/death-valley-balloons.jpg')]">
      <div  className="w-full h-full backdrop-filter backdrop-blur-md" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
        <h3 className="text-primary-foreground text-xl md:text-4xl font-bold mb-8">
          Follow us on social media for the latest and greatest from our
          brothers!
        </h3>
        <div className="flex flex-row items-center justify-center space-x-4">
            <SocialButton icon={<AiFillFacebook />} link='https://www.facebook.com/ClemsonThetaTau/'/>
            <SocialButton icon={<AiFillInstagram />} link='https://www.instagram.com/clemsonthetatau'/>
            <SocialButton icon={<AiFillMail />} link='mailto:lambda.gamma@thetatau.org'/>
        </div>
      </div>
    </div>
  )
}

export default SocialsFooter
