'use client'

import { useState, useEffect } from 'react'
import { Brother, PublicBrother, PublicData } from '@/components/types/brother'
import { Headshot } from '@/components/ui/headshot'

import { db } from '@/firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'

export default function BrotherGrid() {
  const [brothers, setBrothers] = useState<Brother[]>([])

  useEffect(() => {
    // Fetch brothers data from database
    const fetchData = async () => {
      const brothersDoc = doc(db, 'public', 'brothers')
      const brothersSnapshot = await getDoc(brothersDoc)
      const brothersData: PublicData = brothersSnapshot.data() as PublicData
      const brothersList = brothersData.displayOrder.map((userId: any) => {
        const data = brothersData.brotherList[userId]
        const brother: Brother = {
          name: `${data.firstName} ${data.lastName}`,
          email: data.displayEmail,
          image: data.profilePicture,
          major: data.major,
        }
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
        {brothers.map((brother, idx) => (
          <Headshot key={idx} brother={brother} />
        ))}
      </div>
    </section>
  )
}
