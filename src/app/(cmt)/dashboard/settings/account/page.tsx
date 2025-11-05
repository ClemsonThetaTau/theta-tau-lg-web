'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { useAuth } from '@/lib/auth-context'

import { SkeletonForm } from '@/components/ui/skeleton-form'
import { Separator } from "@/components/ui/separator"
import { AccountForm, ProfileFormValues } from "./account-form"

export default function SettingsAccountPage() {
  const { push } = useRouter()
  const { user, loading } = useAuth()
  const [badgeNumber, setBadgeNumber] = useState<string>('')
  const [profileFormDefaultValues, setProfileFormDefaultValues] = useState<ProfileFormValues>();

  useEffect(() => {
    if (!loading && !user) {
      push('/login')
      return
    }

    if (user) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`/api/users/${user.id}`)
          const data = await response.json()

          setBadgeNumber(data.badgeNumber)

          setProfileFormDefaultValues({
            gradYear: data.graduationYear,
            major: data.major,
            status: data.status,
          })
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