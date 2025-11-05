'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/data-entry/button'
import { SkeletonForm } from '@/components/ui/feedback/skeleton-form'
import { BrotherInfo, columns } from './columns'
import { DataTable } from '@/components/ui/data-table/data-table'

export default function ContactCardsPage() {
  const { push } = useRouter()
  const { user, loading } = useAuth()
  const [data, setData] = useState<BrotherInfo[]>()

  useEffect(() => {
    if (!loading && !user) {
      push('/login')
      return
    }

    if (user) {
      const fetchUsers = async () => {
        try {
          const response = await fetch('/api/users')
          const result = await response.json()
          const usersArray = result.docs.map((doc: any) => ({
            id: doc.id,
            firstName: doc.firstName,
            lastName: doc.lastName,
            email: doc.email,
            displayEmail: doc.displayEmail,
            phone: doc.phone,
            major: doc.major,
            badgeNumber: doc.badgeNumber,
            pledgeClass: doc.pledgeClass,
            status: doc.status,
            graduationYear: doc.graduationYear,
          } as BrotherInfo))
          setData(usersArray)
        } catch (error) {
          console.error('Error fetching users: ', error)
        }
      }

      fetchUsers()
    }
  }, [user, loading, push])

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
