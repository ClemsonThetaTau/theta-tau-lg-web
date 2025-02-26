import React from 'react'
import CountdownTimer from '@/components/ui/data-display/countdown-timer'
import { getPayloadClient } from '@/payload/payload'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/data-display/card'

// This is a server component that fetches data from Payload CMS
export default async function CountdownSection() {
  // Default values in case CMS data is not available yet
  let countdownData = {
    name: 'Next Event',
    description: 'Countdown to our next event',
    targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Default to 7 days from now
    isActive: true,
  }

  try {
    // Fetch the active countdown event from Payload CMS
    const client = await getPayloadClient()
    const response = await client.find({
      collection: 'countdown-events',
      where: {
        isActive: { equals: true },
      },
      limit: 1,
    })

    // If there's data, use it
    if (response.docs.length > 0) {
      const countdownEvent = response.docs[0]
      countdownData = {
        name: countdownEvent.name || countdownData.name,
        description: countdownEvent.description || countdownData.description,
        targetDate: new Date(countdownEvent.targetDate) || countdownData.targetDate,
        isActive: true,
      }
    }
  } catch (error) {
    // If there's an error, use the default values
    console.error('Error fetching countdown data:', error)
  }

  return (
    <div className="w-full max-w-md mx-auto my-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">{countdownData.name}</CardTitle>
          {countdownData.description && (
            <p className="text-center text-muted-foreground">{countdownData.description}</p>
          )}
        </CardHeader>
        <CardContent>
          <CountdownTimer targetDate={countdownData.targetDate} />
        </CardContent>
      </Card>
    </div>
  )
}
