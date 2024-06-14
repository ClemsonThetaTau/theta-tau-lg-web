'use client'

import { ColumnDef, FilterFn } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

export type BrotherInfo = {
  id: string
  firstName: string
  lastName: string
  major: string
  badgeNumber: number
  pledgeClass: string
  status: 'active' | 'inactive'
  email: string
  phone: string
}

// Custom name filter function
const nameFilterFn: FilterFn<BrotherInfo> = (row, columnId, filterValue) => {
  const firstName = row.original.firstName.toLowerCase()
  const lastName = row.original.lastName.toLowerCase()
  const filter = filterValue.toLowerCase()

  return firstName.includes(filter) || lastName.includes(filter)
}

export const columns: ColumnDef<BrotherInfo>[] = [
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
        <div>
          <div>{`${firstName} ${lastName}`}</div>
          <div style={{ color: 'lightgray' }}>{major}</div>
        </div>
      )
    },
    filterFn: nameFilterFn, // Add the custom filter function here
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
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ getValue }) => <div style={{ minWidth: '120px' }}>{getValue<string>()}</div>, // Making the phone cell wider
  },
]
