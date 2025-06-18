"use client"

import { useState } from "react"
import { Eye, Truck, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UpdateOrderStatusDialog } from "./update-status"

// Sample order data
const orders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    date: "2023-05-15",
    total: 249.99,
    status: "Delivered",
    items: 3,
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    date: "2023-05-16",
    total: 129.5,
    status: "Processing",
    items: 2,
  },
  {
    id: "ORD-003",
    customer: "Robert Johnson",
    date: "2023-05-17",
    total: 349.99,
    status: "Shipped",
    items: 4,
  },
  {
    id: "ORD-004",
    customer: "Emily Davis",
    date: "2023-05-18",
    total: 79.99,
    status: "Pending",
    items: 1,
  },
  {
    id: "ORD-005",
    customer: "Michael Wilson",
    date: "2023-05-19",
    total: 199.95,
    status: "Cancelled",
    items: 2,
  },
]

export function OrderList() {
  const [updateOrder, setUpdateOrder] = useState<string | null>(null)

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Delivered":
        return "default"
      case "Processing":
        return "secondary"
      case "Shipped":
        return "info"
      case "Pending":
        return "warning"
      case "Cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(order.status) as any}>{order.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        Actions
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Options</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => (window.location.href = `/admin/orders/${order.id}`)}>
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setUpdateOrder(order.id)}>
                        <Truck className="mr-2 h-4 w-4" /> Update Status
                      </DropdownMenuItem>
                      {order.status !== "Cancelled" && (
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                          <XCircle className="mr-2 h-4 w-4" /> Cancel Order
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {updateOrder && (
        <UpdateOrderStatusDialog
          orderId={updateOrder}
          open={!!updateOrder}
          onOpenChange={(open) => !open && setUpdateOrder(null)}
        />
      )}
    </>
  )
}
