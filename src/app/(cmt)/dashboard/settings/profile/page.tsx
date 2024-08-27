'use client'

import { useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { auth } from '@/firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { db, storage } from '@/firebase/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

import { Separator } from "@/components/ui/separator"
import { ProfilePicture } from "./profile-picture"
import { ProfileForm, ProfileFormValues } from "./profile-form"
import { SkeletonForm } from '@/components/ui/skeleton-form'

export default function SettingsProfilePage() {
  const { push } = useRouter()

  const [profilePicture, setProfilePicture] = useState<string>()
  const [defaultValues, setDefaultValues] = useState<Partial<ProfileFormValues>>()

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid
        const userData = await getDoc(doc(db, 'users', uid))

        if (userData.exists()) {
          console.log('Document data:', userData.data())
          const data = userData.data()

          setProfilePicture(data.profilePicture)
          const defaultValues: Partial<ProfileFormValues> = {
            firstName: data.firstName,
            lastName: data.lastName,
            displayEmail: data.displayEmail,
          }

          setDefaultValues(defaultValues)
        }
      } else {
        push('/login')
      }
    })
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      {profilePicture && defaultValues && <ProfileForm defaultValues={defaultValues} profilePicture={profilePicture} /> || <SkeletonForm />}
    </div>
  )
}