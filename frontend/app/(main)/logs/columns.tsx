"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import Link from "next/link"
import AuditLog from "@/interfaces/audit-log"


export const columns: ColumnDef<AuditLog>[] = [
  {
    accessorKey: "ip",
    header: () => <div className="">IP</div>,
    cell: ({ row }) => <Link href={`/logs/ip/${row.getValue("ip")}`}>{row.getValue("ip")}</Link>,
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: "event",
    header: () => <div className="">Event</div>,
    cell: ({ row }) => <div className="">{row.getValue("event")}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "modified_by",
    header: () => <div className="text-nowrap">Modified By</div>,
    cell: ({ row }) => <Link href={`/logs/user/${row.getValue("modified_by")}`}>{row.getValue("modified_by")}</Link>,
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="">{row.getValue("updated_at")}</div>
    },
    enableSorting: true,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const log = row.original

      return (
        <Button variant="outline">
          <Link href={`/logs/${log.id}`}>View Changes</Link>
        </Button>
      )
    },
  },
]
