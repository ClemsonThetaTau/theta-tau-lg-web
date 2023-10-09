'use client'

import { useState, useEffect } from 'react'
import { Brother } from '@/components/sections/brothers/brother'
import { Headshot } from '@/components/sections/brothers/headshot'

import { db } from '@/firebase/config'
import { collection, getDocs } from 'firebase/firestore'

export default function Brothers() {
  const [brothers, setBrothers] = useState<Brother[]>([])

  useEffect(() => {
    // Fetch brothers data from database
    const fetchData = async () => {
      const brothersCollection = collection(db, 'users')
      const brothersSnapshot = await getDocs(brothersCollection)
      const brothersData = brothersSnapshot.docs.map((doc) => {
        const data = doc.data()
        const brother: Brother = {
          name: `${data.firstName} ${data.lastName}`,
          email: data.displayEmail,
          image: data.profilePicture,
          major: data.major,
        }
        return brother
      })
      setBrothers(brothersData)
      console.log(brothersData)
    }
    fetchData()
  }, [])

  return (
    <section className="p-16 mt-8">
      <h1 className="text-4xl font-bold text-center my-8">
        Meet the Brothers of the Lambda Gamma Chapter!
      </h1>
      <div className="grid grid-cols-3 gap-4">
        {brothers.map((brother) => (
          <Headshot brother={brother} />
        ))}
      </div>
    </section>
  )
}
