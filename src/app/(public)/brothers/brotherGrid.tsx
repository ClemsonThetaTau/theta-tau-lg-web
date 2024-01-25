'use client'

import { useState, useEffect } from 'react'
import { PublicBrother, PublicBrotherData } from '@/components/types/brother'
import { Headshot, SkeletonHeadshot } from '@/components/ui/headshot'

import { db } from '@/firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'

export default function BrotherGrid() {
  const [brothers, setBrothers] = useState<PublicBrother[]>()

  useEffect(() => {
    // Fetch brothers data from database
    const fetchData = async () => {
      const brothersDoc = doc(db, 'public', 'brothers')
      const brothersSnapshot = await getDoc(brothersDoc)
      const brothersData: PublicBrotherData = brothersSnapshot.data() as PublicBrotherData
      const brothersList = brothersData.displayOrder.map((userId: any) => {
        const brother = brothersData.brotherList[userId] as PublicBrother

        return brother
      })
      setBrothers(brothersList)
      console.log(brothersData)
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
