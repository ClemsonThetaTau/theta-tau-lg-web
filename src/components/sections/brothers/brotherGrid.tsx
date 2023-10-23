'use client'

import { useState, useEffect } from 'react'
import { Brother } from '@/components/sections/brothers/brother'
import { Headshot } from '@/components/sections/brothers/headshot'

import { db } from '@/firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'

interface PublicBrother {
  firstName: string
  lastName: string
  displayEmail: string
  major: string
  profilePicture: string
}

interface PublicData {
  brotherList: { [key: string]: PublicBrother }
  displayOrder: string[]
}

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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 justify-items-center items-center">
        {brothers.map((brother, idx) => (
          <Headshot key={idx} brother={brother} />
        ))}
      </div>
    </section>
  )
}
