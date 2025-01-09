'use client'

import React from 'react'
import { UserInfo } from './columns'
import { Button } from "../../../../../../components/ui/data-entry/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../../../../components/ui/overlay/dialog"
import { Input } from "../../../../../../components/ui/data-entry/input"
import { Label } from "../../../../../../components/ui/forms/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../../components/ui/data-entry/select"
import { toast } from "../../../../../../components/ui/feedback/use-toast"

interface UserEditModalProps {
  user: UserInfo
  isOpen: boolean
  onClose: () => void
  onSave: (updatedUser: UserInfo) => void
}

export function UserEditModal({ user, isOpen, onClose, onSave }: UserEditModalProps) {
  const [editedUser, setEditedUser] = React.useState<UserInfo>(user)

  const handleSave = () => {
    // Validate required fields
    if (!editedUser.firstName || !editedUser.lastName || !editedUser.email || !editedUser.major || !editedUser.pledgeClass) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields: First Name, Last Name, Email, Major, and Pledge Class",
        variant: "destructive"
      })
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(editedUser.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      })
      return
    }

    // Validate badge number
    if (editedUser.badgeNumber <= 0) {
      toast({
        title: "Invalid Badge Number",
        description: "Badge number must be greater than 0",
        variant: "destructive"
      })
      return
    }

    onSave(editedUser)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{user.firstName ? 'Edit User' : 'Add New User'}</DialogTitle>
          <DialogDescription>
            {user.firstName ? 'Update user information and settings.' : 'Enter information for the new user.'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="firstName" className="text-right">
              First Name *
            </Label>
            <Input
              id="firstName"
              className="col-span-3"
              value={editedUser.firstName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEditedUser((prev) => ({ ...prev, firstName: e.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lastName" className="text-right">
              Last Name *
            </Label>
            <Input
              id="lastName"
              className="col-span-3"
              value={editedUser.lastName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEditedUser((prev) => ({ ...prev, lastName: e.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              className="col-span-3"
              value={editedUser.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEditedUser((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="major" className="text-right">
              Major *
            </Label>
            <Input
              id="major"
              className="col-span-3"
              value={editedUser.major}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEditedUser((prev) => ({ ...prev, major: e.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="badgeNumber" className="text-right">
              Badge Number *
            </Label>
            <Input
              id="badgeNumber"
              type="number"
              className="col-span-3"
              value={editedUser.badgeNumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEditedUser((prev) => ({ ...prev, badgeNumber: parseInt(e.target.value) }))
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="pledgeClass" className="text-right">
              Pledge Class *
            </Label>
            <Input
              id="pledgeClass"
              className="col-span-3"
              value={editedUser.pledgeClass}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEditedUser((prev) => ({ ...prev, pledgeClass: e.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select
              value={editedUser.status}
              onValueChange={(value: UserInfo['status']) =>
                setEditedUser((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="alumni">Alumni</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <Select
              value={editedUser.role}
              onValueChange={(value: UserInfo['role']) =>
                setEditedUser((prev) => ({ ...prev, role: value }))
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="member">Member</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input
              id="phone"
              className="col-span-3"
              value={editedUser.phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEditedUser((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="graduationYear" className="text-right">
              Graduation Year
            </Label>
            <Input
              id="graduationYear"
              type="number"
              className="col-span-3"
              value={editedUser.graduationYear}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEditedUser((prev) => ({ ...prev, graduationYear: parseInt(e.target.value) }))
              }
            />
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
