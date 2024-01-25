'use client'

import React from "react"

import { useState, useEffect } from 'react'
import {
  PublicBrother,
  PublicOfficerData,
  PublicBrotherData,
} from '@/components/types/brother'

import { db } from '@/firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { set } from 'react-hook-form'

import OfficerGrid from "./officerGrid"
import ChairGrid from "./chairGrid"

import { Separator } from "@/components/ui/separator"

export default function OfficersChairs() {
    const [officers, setofficers] = useState<PublicOfficerData>()
    const [brothers, setBrothers] = useState<{ [key: string]: PublicBrother }>()

    useEffect(() => {
        // Fetch officers data from database
        const fetchData = async () => {
        const officersDoc = doc(db, 'public', 'officers')
        const officersSnapshot = await getDoc(officersDoc)
        const officersData: PublicOfficerData =
            officersSnapshot.data() as PublicOfficerData

        const brothersDoc = doc(db, 'public', 'brothers')
        const brothersSnapshot = await getDoc(brothersDoc)
        const brothersData: PublicBrotherData =
            brothersSnapshot.data() as PublicBrotherData

        setofficers(officersData)
        setBrothers(brothersData.brotherList)
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