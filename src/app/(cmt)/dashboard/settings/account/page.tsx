'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { auth } from '@/firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { db } from '@/firebase/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

import { SkeletonForm } from '@/components/ui/skeleton-form'
import { Separator } from "@/components/ui/separator"
import { AccountForm, ProfileFormValues } from "./account-form"

export default function SettingsAccountPage() {
  const { push } = useRouter()
  const [badgeNumber, setBadgeNumber] = useState<string>('')
  const [profileFormDefaultValues, setProfileFormDefaultValues] = useState<ProfileFormValues>();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid
        const userData = await getDoc(doc(db, 'users', uid))

        if (userData.exists()) {
          const data = userData.data()

          setBadgeNumber(data.badgeNumber)

          setProfileFormDefaultValues({
            gradYear: data.gradYear,
            major: data.major,
            status: data.status,
          })
        }
      } else {
        push('/login')
      }
    })
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings.
        </p>
      </div>
      <Separator />
      {badgeNumber && profileFormDefaultValues && <AccountForm badgeNumber={badgeNumber} profileFormDefaultValues={profileFormDefaultValues} /> || <SkeletonForm />}
    </div>
  )
}