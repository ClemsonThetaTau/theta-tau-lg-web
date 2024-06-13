"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { Separator } from '@/components/ui/separator'
import { PositionsForm, PositionsFormValues } from './positions-form'

import { auth } from '@/firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { db, storage } from '@/firebase/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

import { BrotherCommandItem } from './brother-combobox'
import { PublicBrother, PublicBrotherData, PublicOfficerData } from '@/components/types/brother'
import { SkeletonForm } from '@/components/ui/skeleton-form'

export default function SettingsWebChairPage() {
  const { push } = useRouter()

  const [brothers, setBrothers] = useState<BrotherCommandItem[]>([])
  const [defaultValues, setDefaultValues] = useState<PositionsFormValues>()

  useEffect(() => {
    const fetchData = async () => {
      const brothersDoc = doc(db, 'public', 'brothers')
      const brothersSnapshot = await getDoc(brothersDoc)
      const brothersData: PublicBrotherData = brothersSnapshot.data() as PublicBrotherData
      const brothersList = brothersData.displayOrder.map((userId: any) => {
        const data = brothersData.brotherList[userId]
        const brother: BrotherCommandItem = {
          value: userId,
          label: `${data.firstName} ${data.lastName}`,
        }

        return brother
      })

      const sortedBrothers = brothersList.slice().sort((a, b) => a.label.localeCompare(b.label));

      const officersDoc = doc(db, 'public', 'officers')
      const officersSnapshot = await getDoc(officersDoc)
      const officersData = officersSnapshot.data() as PublicOfficerData
      const defaultValues: PositionsFormValues = {
        regent: officersData.ec.regent,
        viceRegent: officersData.ec.viceRegent,
        scribe: officersData.ec.scribe,
        treasurer: officersData.ec.treasurer,
        correspondingSecretary: officersData.ec.correspondingSecretary,
        delegateAtLarge: officersData.ec.delegateAtLarge,
        newMemberEducator: officersData.ec.newMemberEducator,
        chairs: officersData.chairs.map((chair) => {
          return {value: chair.userId}
        }),
        chairTitles: officersData.chairs.map((chair) => {
          return {value: chair.posName}
        })
      }


      setBrothers(sortedBrothers)
      setDefaultValues(defaultValues)
      console.log(defaultValues)
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
      {(defaultValues && <PositionsForm defaultValues={defaultValues} brothers={brothers}/>) || <SkeletonForm />}
    </div>
  )
}
