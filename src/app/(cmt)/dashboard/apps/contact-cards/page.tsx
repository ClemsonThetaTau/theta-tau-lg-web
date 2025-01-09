'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { db } from '@/firebase/firebase'
import { doc, getDocs, setDoc, collection } from 'firebase/firestore'
import { Button } from '@/components/ui/data-entry/button'
import { SkeletonForm } from '@/components/ui/feedback/skeleton-form'
import { BrotherInfo, columns } from './columns'
import { DataTable } from '@/components/ui/data-table/data-table'

export default function ContactCardsPage() {
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

    return () => unsubscribe()
  }, [push])

  const exportContactCards = () => {
    if (!data) return

    const vCardData = data
      .map((contact) => {
        return `BEGIN:VCARD
VERSION:3.0
N:${contact.lastName};${contact.firstName};;;
FN:${contact.firstName} ${contact.lastName}
ORG:Theta Tau ΛΓ - ${contact.pledgeClass}
EMAIL;TYPE=PERSONAL:${contact.email}
TEL;TYPE=MOBILE,VOICE:${contact.phone}
END:VCARD`
      })
      .join('\n')

    const vCardBlob = new Blob([vCardData], { type: 'text/vcard' })
    const url = URL.createObjectURL(vCardBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'contacts.vcf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const renderTopToolbar = () => (
    <Button
      variant="outline"
      className="ml-auto"
      onClick={exportContactCards}
    >
      Export Contacts
    </Button>
  )

  return (
    <div className="container mx-auto py-10">
      {data ? (
        <DataTable
          columns={columns}
          data={data}
          defaultSorting={[{ id: 'name', desc: true }]}
          renderTopToolbar={renderTopToolbar}
        />
      ) : (
        <SkeletonForm />
      )}
    </div>
  )
}
