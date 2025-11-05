'use client'

import { useState, useEffect } from 'react'
import { PublicBrother } from '@/components/types/brother'
import { Headshot, SkeletonHeadshot } from '@/components/ui/data-display/headshot'

export default function BrotherGrid() {
  const [brothers, setBrothers] = useState<PublicBrother[]>()

  useEffect(() => {
    // Fetch users who should be displayed on the website
    const fetchData = async () => {
      try {
        const response = await fetch('/api/users?where[displayOnWebsite][equals]=true&where[status][in][0]=active&where[status][in][1]=alumni&sort=badgeNumber')
        const data = await response.json()
        
        // Transform Payload data to match PublicBrother format
        const brothersList = data.docs.map((user: any) => ({
          firstName: user.firstName,
          lastName: user.lastName,
          displayName: `${user.firstName} ${user.lastName}`,
          email: user.displayEmail,
          major: user.major,
          profilePicture: typeof user.profilePicture === 'object' 
            ? user.profilePicture.url 
            : user.profilePicture,
          status: user.status,
        }))
        
        setBrothers(brothersList)
      } catch (error) {
        console.error('Error fetching brothers:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <section className="p-16">
      <h1 className="text-4xl font-bold text-center my-8">
        Meet the Brothers of the Lambda Gamma Chapter!
      </h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-5 justify-items-center items-center">
        {(brothers && brothers.map((brother, idx) => (
          <Headshot key={idx} brother={brother} />
        ))) || (
          <>
            <SkeletonHeadshot />
            <SkeletonHeadshot />
            <SkeletonHeadshot />
            <SkeletonHeadshot />
            <SkeletonHeadshot />
            <SkeletonHeadshot />
            <SkeletonHeadshot />
            <SkeletonHeadshot />
            <SkeletonHeadshot />
            <SkeletonHeadshot />
            <SkeletonHeadshot />
            <SkeletonHeadshot />
            <SkeletonHeadshot />
          </>
        )}
      </div>
    </section>
  )
}
