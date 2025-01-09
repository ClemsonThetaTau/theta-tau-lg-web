// This component provides a data table for managing users with features for:
// - Adding new users manually via a form
// - Importing users from CSV
// - Editing existing users
// - Filtering and sorting users
// - Customizing visible columns

'use client'

import * as React from 'react'
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Button } from "../../../../../../components/ui/data-entry/button"
import { Input } from "../../../../../../components/ui/data-entry/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../../../../../components/ui/data-entry/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../../../../components/ui/overlay/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../../../components/ui/data-table/table"
import { DataTablePagination } from './data-table-pagination'
import { UserInfo, createColumns } from './columns'
import { Upload } from 'lucide-react'
import Papa from 'papaparse'
import { UserEditModal } from './user-edit-modal'

interface DataTableProps {
  data: UserInfo[]
  onDataChange: (newData: UserInfo[]) => void
}

export function DataTable({ data, onDataChange }: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [editingUser, setEditingUser] = React.useState<UserInfo | null>(null)

  const handleEditUser = (user: UserInfo) => {
    setEditingUser(user)
  }

  const handleSaveUser = (updatedUser: UserInfo) => {
    const isNewUser = !data.find(user => user.id === updatedUser.id)
    const newData = isNewUser 
      ? [...data, updatedUser]
      : data.map((user) => user.id === updatedUser.id ? updatedUser : user)
    onDataChange(newData)
  }

  const columns = React.useMemo(
    () => createColumns({ onEdit: handleEditUser }),
    []
  )

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

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
        onDataChange([...data, ...newUsers])
      },
      header: true,
    })
  }

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-4">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4">
        <DataTablePagination table={table} />
      </div>
      {editingUser && (
        <UserEditModal
          user={editingUser}
          isOpen={true}
          onClose={() => setEditingUser(null)}
          onSave={handleSaveUser}
        />
      )}
    </div>
  )
}
