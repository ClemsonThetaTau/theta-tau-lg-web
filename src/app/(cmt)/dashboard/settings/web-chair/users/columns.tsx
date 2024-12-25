'use client'

import { ColumnDef, FilterFn } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Pencil } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export type UserInfo = {
  id: string
  firstName: string
  lastName: string
  major: string
  badgeNumber: number
  pledgeClass: string
  status: 'active' | 'inactive' | 'alumni'
  email: string
  phone: string
  imageUrl?: string
  role: 'admin' | 'member'
  graduationYear: number
}

const nameFilterFn: FilterFn<UserInfo> = (row, columnId, filterValue) => {
  const firstName = row.original.firstName.toLowerCase()
  const lastName = row.original.lastName.toLowerCase()
  const filter = filterValue.toLowerCase()

  return firstName.includes(filter) || lastName.includes(filter)
}

interface ColumnOptions {
  onEdit: (user: UserInfo) => void
}

export const createColumns = ({ onEdit }: ColumnOptions): ColumnDef<UserInfo>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const firstName = row.original.firstName
      const lastName = row.original.lastName
      const major = row.original.major

      return (
        <div className="flex items-center">
          {row.original.imageUrl && (
            <img
              src={row.original.imageUrl}
              alt={`${firstName} ${lastName}`}
              className="h-8 w-8 rounded-full mr-2"
            />
          )}
          <div>
            <div>{`${firstName} ${lastName}`}</div>
            <div className="text-gray-500 text-sm">{major}</div>
          </div>
        </div>
      )
    },
    filterFn: nameFilterFn,
  },
  {
    accessorKey: 'badgeNumber',
    header: 'Badge Number',
  },
  {
    accessorKey: 'pledgeClass',
    header: 'Pledge Class',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status
      return (
        <Badge variant={status === 'active' ? 'default' : 'secondary'}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      const role = row.original.role
      return (
        <Badge variant={role === 'admin' ? 'destructive' : 'outline'}>
          {role}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'graduationYear',
    header: 'Grad Year',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.email)}
            >
              Copy email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onEdit(user)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit user
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
