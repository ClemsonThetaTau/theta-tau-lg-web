'use client'

import { useState, useEffect } from 'react'
import { Brother, PublicBrother, PublicData } from '@/components/types/brother'
import { PositionHeadshot } from '@/components/ui/headshot'

import { db } from '@/firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'

export default function OfficerGrid() {
  const [brothers, setBrothers] = useState<Brother[]>([])

  useEffect(() => {
    // Fetch brothers data from database
    const fetchData = async () => {
      const officersDoc = doc(db, 'public', 'officers')
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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 justify-items-center items-center">
        {/* <PositionHeadshot key={} brother={brother} position='Regent' /> */}
    </div>
  )
}
