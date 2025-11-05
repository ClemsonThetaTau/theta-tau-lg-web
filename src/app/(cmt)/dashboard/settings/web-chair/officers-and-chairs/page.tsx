"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { Separator } from '@/components/ui/separator'
import { PositionsForm, PositionsFormValues } from './positions-form'

import { useAuth } from '@/lib/auth-context'

import { BrotherCommandItem } from './brother-combobox'
import { SkeletonForm } from '@/components/ui/skeleton-form'

export default function SettingsWebChairPage() {
  const { push } = useRouter()
  const { user, loading } = useAuth()

  const [brothers, setBrothers] = useState<BrotherCommandItem[]>([])
  const [defaultValues, setDefaultValues] = useState<PositionsFormValues>()

  useEffect(() => {
    if (!loading && !user) {
      push('/login')
      return
    }

    if (user) {
      const fetchData = async () => {
        try {
          // Fetch users (brothers) from Payload
          const usersResponse = await fetch('/api/users?where[status][in][0]=active&where[status][in][1]=alumni&where[status][in][2]=pledge&sort=lastName')
          const usersData = await usersResponse.json()
          
          const brothersList: BrotherCommandItem[] = usersData.docs.map((user: any) => ({
            value: user.id,
            label: `${user.firstName} ${user.lastName}`,
          }))

          const sortedBrothers = brothersList.slice().sort((a, b) => a.label.localeCompare(b.label));

          // Fetch officers from Payload
          const officersResponse = await fetch('/api/officers?where[isActive][equals]=true')
          const officersData = await officersResponse.json()

          // Transform to match existing format
          const ecOfficers: any = {}
          const chairs: any[] = []

          officersData.docs.forEach((officer: any) => {
            const userId = typeof officer.user === 'object' ? officer.user.id : officer.user
            
            if (officer.type === 'ec' && officer.ecPosition) {
              ecOfficers[officer.ecPosition] = userId
            } else if (officer.type === 'chair') {
              chairs.push({
                userId,
                posName: officer.positionName,
              })
            }
          })

          const defaultValues: PositionsFormValues = {
            regent: ecOfficers.regent || '',
            viceRegent: ecOfficers.viceRegent || '',
            scribe: ecOfficers.scribe || '',
            treasurer: ecOfficers.treasurer || '',
            correspondingSecretary: ecOfficers.correspondingSecretary || '',
            delegateAtLarge: ecOfficers.delegateAtLarge || '',
            newMemberEducator: ecOfficers.newMemberEducator || '',
            chairs: chairs.map(chair => ({ value: chair.userId })),
            chairTitles: chairs.map(chair => ({ value: chair.posName })),
          }

          setBrothers(sortedBrothers)
          setDefaultValues(defaultValues)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }

      fetchData()
    }
  }, [user, loading, push])

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
