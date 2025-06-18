"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"
import { CartItem } from "./components/cart-item"
import { useCart } from "@/hooks/use-cart"
import { useRouter } from "next/navigation"
import { ShoppingCart } from "lucide-react"
import { useEffect } from "react"

export default function CartPage() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart, isLoading } = useCart()
  const router = useRouter()

  // Add sample data for testing (remove this in production)
  useEffect(() => {
    if (!isLoading && items.length === 0) {
      const sampleItems = [
        {
          id: "1",
          name: "Wireless Headphones",
          price: 99.99,
          image: "headphones",
          quantity: 1,
          color: "Black",
        },
        {
          id: "2",
          name: "Smart Watch",
          price: 149.99,
          image: "watch",
          quantity: 2,
          color: "Silver",
        },
      ]

      localStorage.setItem("cartItems", JSON.stringify(sampleItems))
      window.dispatchEvent(new CustomEvent("cartUpdated"))
    }
  }, [isLoading, items.length])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <PageHeader title="Shopping Cart" description="Your cart is currently empty" />
        <div className="text-center py-12">
          <ShoppingCart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-500 mb-6">Start shopping to add items to your cart</p>
          <Button onClick={() => router.push("/products")}>Continue Shopping</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Shopping Cart"
        description={`${totalItems} ${totalItems === 1 ? "item" : "items"} in your cart`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Cart Items</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {items.map((item) => (
                  <div key={item.id} className="p-6">
                    <CartItem {...item} onUpdateQuantity={updateQuantity} onRemove={removeItem} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal ({totalItems} items)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <Button className="w-full" size="lg" onClick={() => router.push("/checkout")}>
                Proceed to Checkout
              </Button>
              <Button variant="outline" className="w-full" onClick={clearCart}>
                Clear Cart
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
