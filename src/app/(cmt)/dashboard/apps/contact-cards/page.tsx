// It's wild how incredibly useful chat gpt has become, this woudl've taken forever
// before but now its just a couple minutes of prompt engineering, kinda speeding thru
// deving this website rn. I'm curious to see what ppl think of it.

// I'm also curious who's gonna read this, the next web chair perhaps? or somebody
// even later down the line. If you are one of those ppl and don't know me. Hello!
// I'm gonna be a Junior next year and I'm a CS Major, names AP, sorry for the ratshit
// code, I'm just speeding thru. Finished the serious part of the backend and coded this
// app in like 5 hours over the past day or two. Just kinda working on this whenever my
// AI research lightens up enough for me to squeeze in some extra time.

'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { auth } from '@/firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { db } from '@/firebase/firebase'
import { doc, getDocs, setDoc, collection } from 'firebase/firestore'

import { SkeletonForm } from '@/components/ui/skeleton-form'
import { BrotherInfo, columns } from './columns'
import { DataTable } from './data-table'

export default function DemoPage() {
  const { push } = useRouter()

  const [data, setData] = useState<BrotherInfo[]>()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'))
        const usersArray = querySnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as BrotherInfo)
        )

        setData(usersArray)
      } catch (error) {
        console.error('Error fetching users: ', error)
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchUsers()
      } else {
        push('/login')
      }
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [push])

  return (
    <div className="container mx-auto py-10">
      {data && <DataTable columns={columns} data={data} /> || <SkeletonForm />}
    </div>
  )
}
