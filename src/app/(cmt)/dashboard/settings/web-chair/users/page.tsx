'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth, db } from '@/firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, doc, setDoc, updateDoc } from 'firebase/firestore'
import { UserInfo } from './columns'
import { DataTable } from './data-table'
import { SkeletonForm } from '@/components/ui/skeleton-form'

export default function UsersPage() {
  const { push } = useRouter()
  const [users, setUsers] = useState<UserInfo[]>()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'))
        const usersArray = querySnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as UserInfo)
        )
        setUsers(usersArray)
      } catch (error) {
        console.error('Error fetching users: ', error)
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchUsers()
      } else {
        push('/login')
      }
    })

    return () => unsubscribe()
  }, [push])

  const handleDataChange = async (newData: UserInfo[]) => {
    try {
      // Find new users (ones without IDs in Firestore)
      const existingIds = (users || []).map((user) => user.id)
      const newUsers = newData.filter((user) => !existingIds.includes(user.id))

      // Add new users to Firestore
      for (const user of newUsers) {
        const userDoc = doc(collection(db, 'users'))
        await setDoc(userDoc, {
          ...user,
          id: userDoc.id,
        })
      }

      // Update existing users
      const updatedUsers = newData.filter((user) => existingIds.includes(user.id))
      for (const user of updatedUsers) {
        const userDoc = doc(db, 'users', user.id)
        await updateDoc(userDoc, user)
      }

      setUsers(newData)
    } catch (error) {
      console.error('Error updating users:', error)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
      </div>
      {users ? (
        <DataTable data={users} onDataChange={handleDataChange} />
      ) : (
        <SkeletonForm />
      )}
    </div>
  )
}
