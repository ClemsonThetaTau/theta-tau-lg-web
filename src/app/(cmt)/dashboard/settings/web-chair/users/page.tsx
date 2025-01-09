'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth, db } from '@/firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, doc, setDoc, updateDoc } from 'firebase/firestore'
import { UserInfo, createColumns } from './columns'
import { DataTable } from '@/components/ui/data-table/data-table'
import { SkeletonForm } from '@/components/ui/feedback/skeleton-form'
import { Button } from '@/components/ui/data-entry/button'
import { Upload } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/overlay/dialog'
import { Input } from '@/components/ui/data-entry/input'
import Papa from 'papaparse'
import { UserEditModal } from './user-edit-modal'

export default function UsersPage() {
  const { push } = useRouter()
  const [users, setUsers] = useState<UserInfo[]>()
  const [editingUser, setEditingUser] = useState<UserInfo | null>(null)

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    Papa.parse<string[]>(file, {
      complete: (results) => {
        const newUsers = results.data.slice(1).map((row) => ({
          id: crypto.randomUUID(),
          firstName: row[0],
          lastName: row[1],
          major: row[2],
          badgeNumber: parseInt(row[3]),
          pledgeClass: row[4],
          status: row[5] as UserInfo['status'],
          email: row[6],
          phone: row[7],
          graduationYear: parseInt(row[8]),
          role: 'member' as UserInfo['role'],
        }))
        handleDataChange([...(users || []), ...newUsers])
      },
      header: true,
    })
  }

  const handleEditUser = (user: UserInfo) => {
    setEditingUser(user)
  }

  const handleSaveUser = (updatedUser: UserInfo) => {
    const isNewUser = !users?.find(user => user.id === updatedUser.id)
    const newData = isNewUser 
      ? [...(users || []), updatedUser]
      : users?.map((user) => user.id === updatedUser.id ? updatedUser : user) || []
    handleDataChange(newData)
  }

  const renderTopToolbar = () => (
    <>
      <Button
        variant="outline"
        className="ml-auto"
        onClick={() => {
          setEditingUser({
            id: crypto.randomUUID(),
            firstName: '',
            lastName: '',
            major: '',
            badgeNumber: 0,
            pledgeClass: '',
            status: 'active',
            email: '',
            phone: '',
            role: 'member',
            graduationYear: new Date().getFullYear(),
          })
        }}
      >
        + Add User
      </Button>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="ml-4">
            <Upload className="mr-2 h-4 w-4" />
            Import CSV
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Users from CSV</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p className="text-sm text-muted-foreground">
              Upload a CSV file with the following columns:
              firstName, lastName, major, badgeNumber, pledgeClass, status, email, phone, graduationYear
            </p>
            <Input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
      </div>
      {users ? (
        <>
          <DataTable
            columns={createColumns({ onEdit: handleEditUser })}
            data={users}
            defaultSorting={[{ id: 'name', desc: true }]}
            renderTopToolbar={renderTopToolbar}
          />
          {editingUser && (
            <UserEditModal
              user={editingUser}
              isOpen={true}
              onClose={() => setEditingUser(null)}
              onSave={handleSaveUser}
            />
          )}
        </>
      ) : (
        <SkeletonForm />
      )}
    </div>
  )
}
