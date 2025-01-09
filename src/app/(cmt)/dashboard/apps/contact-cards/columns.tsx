'use client'

import { ColumnDef, FilterFn } from "@tanstack/react-table"
import { Button } from "@/components/ui/data-entry/button"
import { Checkbox } from "@/components/ui/data-entry/checkbox"
import { ChevronUp, ChevronDown } from "lucide-react"

export type BrotherInfo = {
  id: string
  firstName: string
  lastName: string
  major: string
  badgeNumber: number
  pledgeClass: string
  status: "active" | "inactive"
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
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1"
        >
          Name
          {column.getIsSorted() === "asc" ? (
            <ChevronUp className="ml-1 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ChevronDown className="ml-1 h-4 w-4" />
          ) : null}
        </Button>
      )
    },
    cell: ({ row }) => {
      const firstName = row.original.firstName
      const lastName = row.original.lastName
      const major = row.original.major

      return (
        <div>
          <div>{`${firstName} ${lastName}`}</div>
          <div style={{ color: "lightgray" }}>{major}</div>
        </div>
      )
    },
    filterFn: nameFilterFn,
    sortingFn: (rowA, rowB) => {
      const aName = `${rowA.original.firstName} ${rowA.original.lastName}`.toLowerCase()
      const bName = `${rowB.original.firstName} ${rowB.original.lastName}`.toLowerCase()
      return aName.localeCompare(bName)
    },
  },
  {
    accessorKey: "badgeNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1"
        >
          Badge Number
          {column.getIsSorted() === "asc" ? (
            <ChevronUp className="ml-1 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ChevronDown className="ml-1 h-4 w-4" />
          ) : null}
        </Button>
      )
    },
  },
  {
    accessorKey: "pledgeClass",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1"
        >
          Pledge Class
          {column.getIsSorted() === "asc" ? (
            <ChevronUp className="ml-1 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ChevronDown className="ml-1 h-4 w-4" />
          ) : null}
        </Button>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1"
        >
          Status
          {column.getIsSorted() === "asc" ? (
            <ChevronUp className="ml-1 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ChevronDown className="ml-1 h-4 w-4" />
          ) : null}
        </Button>
      )
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1"
        >
          Email
          {column.getIsSorted() === "asc" ? (
            <ChevronUp className="ml-1 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ChevronDown className="ml-1 h-4 w-4" />
          ) : null}
        </Button>
      )
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1"
        >
          Phone
          {column.getIsSorted() === "asc" ? (
            <ChevronUp className="ml-1 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ChevronDown className="ml-1 h-4 w-4" />
          ) : null}
        </Button>
      )
    },
    cell: ({ getValue }) => <div style={{ minWidth: "120px" }}>{getValue<string>()}</div>,
  },
]
