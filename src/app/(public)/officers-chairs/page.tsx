'use client'

import React from "react"

import { useState, useEffect } from 'react'
import {
  PublicBrother,
  PublicOfficerData,
} from '@/components/types/brother'

import OfficerGrid from "./officerGrid"
import ChairGrid from "./chairGrid"

import { Separator } from "@/components/ui/data-display/separator"

export default function OfficersChairs() {
    const [officers, setofficers] = useState<PublicOfficerData>()
    const [brothers, setBrothers] = useState<{ [key: string]: PublicBrother }>()

    useEffect(() => {
        // Fetch officers data from Payload
        const fetchData = async () => {
        try {
            const officersResponse = await fetch('/api/officers?where[isActive][equals]=true&sort=displayOrder')
            const officersData = await officersResponse.json()

            const usersResponse = await fetch('/api/users?where[displayOnWebsite][equals]=true')
            const usersData = await usersResponse.json()

            // Transform Payload data to match existing format
            const officersMap: any = {
                ec: {},
                chair: {}
            }

            officersData.docs.forEach((officer: any) => {
                const userId = typeof officer.user === 'object' ? officer.user.id : officer.user
                const type = officer.type === 'ec' ? 'ec' : 'chair'
                
                officersMap[type][userId] = {
                    position: officer.positionName,
                    ecPosition: officer.ecPosition,
                }
            })

            const brothersMap: any = {}
            usersData.docs.forEach((user: any) => {
                brothersMap[user.id] = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    displayName: `${user.firstName} ${user.lastName}`,
                    email: user.displayEmail,
                    major: user.major,
                    profilePicture: typeof user.profilePicture === 'object' 
                        ? user.profilePicture.url 
                        : user.profilePicture,
                    status: user.status,
                }
            })

            setofficers(officersMap)
            setBrothers(brothersMap)
        } catch (error) {
            console.error('Error fetching officers:', error)
        }
        }
        fetchData()
    }, [])

    return (
        <div>
             <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight my-10 text-center">
                Executive Committee
            </h2>
            <OfficerGrid officers={officers} brothers={brothers} />

            <div className="my-10 px-16">
                <Separator />
            </div>

            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight mb-10 text-center">
                The Chairs
            </h2>
            <ChairGrid officers={officers} brothers={brothers} />
        </div>
    )
}