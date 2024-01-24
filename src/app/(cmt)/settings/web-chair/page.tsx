"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { Separator } from '@/components/ui/separator'
import { PositionsForm } from './positions-form'

import { auth } from '@/firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { db, storage } from '@/firebase/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

import { BrotherCommandItem } from './brother-combobox'
import { Brother, PublicBrother, PublicData } from '@/components/types/brother'

export default function SettingsProfilePage() {
  const { push } = useRouter()

  const [brothers, setBrothers] = useState<BrotherCommandItem[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const officersDoc = doc(db, 'public', 'officers')
      const brothersDoc = doc(db, 'public', 'brothers')
      const brothersSnapshot = await getDoc(brothersDoc)
      const brothersData: PublicData = brothersSnapshot.data() as PublicData
      const brothersList = brothersData.displayOrder.map((userId: any) => {
        const data = brothersData.brotherList[userId]
        const brother: BrotherCommandItem = {
          value: userId,
          label: `${data.firstName} ${data.lastName}`,
        }

        return brother
      })

      const sortedBrothers = brothersList.slice().sort((a, b) => a.label.localeCompare(b.label));

      setBrothers(sortedBrothers)
    }

    fetchData()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Web-Chair Settings</h3>
        <p className="text-sm text-muted-foreground">
          Update Chapter Changes on the Site
        </p>
      </div>
      <Separator />
      <PositionsForm brothers={brothers}/>
    </div>
  )
}
