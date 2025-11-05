'use client'

import { useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useAuth } from '@/lib/auth-context'

import { Separator } from "@/components/ui/separator"
import { ProfilePicture } from "./profile-picture"
import { ProfileForm, ProfileFormValues } from "./profile-form"
import { SkeletonForm } from '@/components/ui/skeleton-form'

export default function SettingsProfilePage() {
  const { push } = useRouter()
  const { user, loading } = useAuth()

  const [profilePicture, setProfilePicture] = useState<string>()
  const [defaultValues, setDefaultValues] = useState<Partial<ProfileFormValues>>()

  useEffect(() => {
    if (!loading && !user) {
      push('/login')
      return
    }

    if (user) {
      // Fetch full user data from Payload
      const fetchUserData = async () => {
        try {
          const response = await fetch(`/api/users/${user.id}`)
          const data = await response.json()

          const profilePictureUrl = typeof data.profilePicture === 'object' 
            ? data.profilePicture.url 
            : data.profilePicture

          setProfilePicture(profilePictureUrl)
          const defaultValues: Partial<ProfileFormValues> = {
            firstName: data.firstName,
            lastName: data.lastName,
            displayEmail: data.displayEmail,
          }

          setDefaultValues(defaultValues)
        } catch (error) {
          console.error('Error fetching user data:', error)
        }
      }

      fetchUserData()
    }
  }, [user, loading, push])

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