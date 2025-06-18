"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Download, ExternalLink, Package, Printer, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { PageHeader } from "@/app/components/page-header"

// Sample order data (same as in the order history page)
const orders = [
  {
    id: "ORD-1001",
    date: "May 15, 2023",
    total: 249.97,
    status: "Delivered",
    items: [
      {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        quantity: 1,
        image: "headphones",
      },
      {
        id: 3,
        name: "Smart Watch",
        price: 149.98,
        quantity: 1,
        image: "watch",
      },
    ],
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
    trackingNumber: "TRK123456789",
    deliveryDate: "May 20, 2023",
    shippingAddress: "123 Main St, Anytown, USA",
  },
  {
    id: "ORD-1002",
    date: "June 2, 2023",
    total: 89.99,
    status: "Shipped",
    items: [
      {
        id: 6,
        name: "Denim Jacket",
        price: 89.99,
        quantity: 1,
        image: "jacket",
      },
    ],
    paymentStatus: "Paid",
    paymentMethod: "PayPal",
    trackingNumber: "TRK987654321",
    deliveryDate: "June 7, 2023 (Expected)",
    shippingAddress: "456 Oak Ave, Somewhere, USA",
  },
  {
    id: "ORD-1003",
    date: "June 10, 2023",
    total: 169.98,
    status: "Processing",
    items: [
      {
        id: 7,
        name: "Coffee Maker",
        price: 129.99,
        quantity: 1,
        image: "coffee",
      },
      {
        id: 12,
        name: "Water Bottle",
        price: 19.99,
        quantity: 2,
        image: "bottle",
      },
    ],
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
    trackingNumber: null,
    deliveryDate: "June 15, 2023 (Expected)",
    shippingAddress: "789 Pine St, Elsewhere, USA",
  },
  {
    id: "ORD-1004",
    date: "June 15, 2023",
    total: 59.99,
    status: "Canceled",
    items: [
      {
        id: 5,
        name: "Bluetooth Speaker",
        price: 59.99,
        quantity: 1,
        image: "speaker",
      },
    ],
    paymentStatus: "Refunded",
    paymentMethod: "Credit Card",
    trackingNumber: null,
    deliveryDate: null,
    shippingAddress: "123 Main St, Anytown, USA",
    cancellationReason: "Item out of stock",
  },
]

export default function OrderDetailsPage() {
  const router = useRouter()
  const { id } = useParams()
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchOrder = () => {
      setLoading(true)
      const foundOrder = orders.find((o) => o.id === id)

      if (foundOrder) {
        setOrder(foundOrder)
      } else {
        // Order not found, redirect to orders page
        router.push("/orders")
      }

      setLoading(false)
    }

    if (id) {
      fetchOrder()
    }
  }, [id, router])

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "shipped":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "processing":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "canceled":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container mx-auto py-8 px-4">
        <PageHeader title="Order Not Found" />
        <div className="text-center py-12">
          <Package className="mx-auto h-16 w-16 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium">We couldn't find this order</h3>
          <p className="mt-2 text-gray-500">The order you're looking for doesn't exist or has been removed.</p>
          <Link href="/orders">
            <Button className="mt-6 bg-rose-600 hover:bg-rose-700">Back to Orders</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Calculate subtotal, shipping, and tax
  const subtotal = order.items.reduce((total: number, item: any) => total + item.price * item.quantity, 0)
  const shipping = 10.0
  const tax = subtotal * 0.08 // 8% tax

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link href="/orders" className="inline-flex items-center text-rose-600 hover:text-rose-700">
          <ArrowLeft size={16} className="mr-2" />
          Back to Orders
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Order {order.id}</h1>
          <p className="text-gray-500">Placed on {order.date}</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm" className="flex items-center">
            <Printer size={16} className="mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm" className="flex items-center">
            <Download size={16} className="mr-2" />
            Download Invoice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Summary */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Order Summary</CardTitle>
                <Badge className={getStatusBadgeColor(order.status)}>{order.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Order Items */}
              <div>
                <h3 className="font-medium mb-3">Items</h3>
                <div className="space-y-4">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="flex items-start space-x-4">
                      <div className="relative h-20 w-20 overflow-hidden rounded-md flex-shrink-0">
                        <Image
                          src={`/abstract-geometric-shapes.png?height=80&width=80&query=${item.image} product`}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link href={`/products/${item.id}`} className="hover:text-rose-600">
                          <h4 className="font-medium">{item.name}</h4>
                        </Link>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Order Totals */}
              <div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Tracking Information */}
              {order.status !== "Canceled" && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-3">Delivery Information</h3>
                  {order.trackingNumber ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm">
                          <Truck size={18} className="mr-2 text-gray-600" />
                          <span>
                            {order.status === "Delivered"
                              ? `Delivered on ${order.deliveryDate}`
                              : `Expected delivery by ${order.deliveryDate}`}
                          </span>
                        </div>
                        <Button variant="outline" size="sm" className="text-sm">
                          <ExternalLink size={14} className="mr-1" />
                          Track Package
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500">
                        Tracking Number: <span className="font-medium">{order.trackingNumber}</span>
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-700">
                      {order.status === "Processing"
                        ? "Your order is being processed. Tracking information will be available once shipped."
                        : "Tracking information not available."}
                    </p>
                  )}
                </div>
              )}

              {/* Cancellation Information */}
              {order.status === "Canceled" && (
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 text-red-800">Order Canceled</h3>
                  <p className="text-sm text-red-700">Reason: {order.cancellationReason || "Not specified"}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Order Information */}
        <div className="lg:col-span-1 space-y-6">
          {/* Shipping Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{order.shippingAddress}</p>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Method</span>
                <span className="text-sm">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Status</span>
                <span className="text-sm">{order.paymentStatus}</span>
              </div>
            </CardContent>
          </Card>

          {/* Need Help Section */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-700">
                If you need to make changes to your order or have any questions, please contact our customer service
                team.
              </p>
              <div className="space-y-2">
                <Button className="w-full bg-rose-600 hover:bg-rose-700">Contact Support</Button>
                {order.status !== "Canceled" && order.status !== "Delivered" && (
                  <p className="text-xs text-gray-500 text-center">
                    To cancel an order, please contact our customer service team by phone or through social media.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
