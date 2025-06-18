"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, Minus, Plus, ShieldCheck, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { PageHeader } from "@/app/components/page-header"

// Sample cart items
const cartItems = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    image: "headphones",
    quantity: 1,
    color: "Black",
    maxQuantity: 10,
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 149.99,
    image: "watch",
    quantity: 2,
    color: "Silver",
    maxQuantity: 5,
  },
]

// Sample saved addresses
const savedAddresses = [
  {
    id: 1,
    name: "John Doe",
    address: "123 Main St",
    city: "Anytown",
    state: "CA",
    zip: "12345",
    country: "United States",
    phone: "+1 (555) 123-4567",
    isDefault: true,
  },
  {
    id: 2,
    name: "John Doe",
    address: "456 Oak Ave",
    city: "Somewhere",
    state: "NY",
    zip: "67890",
    country: "United States",
    phone: "+1 (555) 987-6543",
    isDefault: false,
  },
]

export default function CheckoutPage() {
  const router = useRouter()
  const [selectedAddress, setSelectedAddress] = useState<number>(1)
  const [paymentMethod, setPaymentMethod] = useState<string>("stripe")
  const [isAddingAddress, setIsAddingAddress] = useState<boolean>(false)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [cartItemsState, setCartItemsState] = useState(cartItems)

  // Calculate totals
  const subtotal = cartItemsState.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItemsState((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.min(Math.max(1, newQuantity), item.maxQuantity) } : item,
      ),
    )
  }

  const handleSubmitOrder = async () => {
    setIsProcessing(true)

    try {
      // Simulate API call to process order
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Redirect to confirmation page
      router.push("/checkout/confirmation?orderId=ORD-1005")
    } catch (error) {
      console.error("Error processing order:", error)
      setIsProcessing(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <PageHeader title="Checkout" />

      <div className="mb-6">
        <Link href="/cart" className="inline-flex items-center text-rose-600 hover:text-rose-700">
          <ArrowLeft size={16} className="mr-2" />
          Back to Cart
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Address */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              {!isAddingAddress ? (
                <div className="space-y-4">
                  <RadioGroup
                    value={selectedAddress.toString()}
                    onValueChange={(value) => setSelectedAddress(Number.parseInt(value))}
                    className="space-y-4"
                  >
                    {savedAddresses.map((address) => (
                      <div key={address.id} className="flex items-start space-x-3">
                        <RadioGroupItem value={address.id.toString()} id={`address-${address.id}`} className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor={`address-${address.id}`} className="flex items-center cursor-pointer">
                            <span className="font-medium">{address.name}</span>
                            {address.isDefault && (
                              <span className="ml-2 text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded">
                                Default
                              </span>
                            )}
                          </Label>
                          <div className="text-sm text-gray-500 mt-1">
                            <p>{address.address}</p>
                            <p>
                              {address.city}, {address.state} {address.zip}
                            </p>
                            <p>{address.country}</p>
                            <p className="mt-1">{address.phone}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>

                  <Button variant="outline" onClick={() => setIsAddingAddress(true)} className="mt-4">
                    Add New Address
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="+1 (555) 123-4567" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input id="address" placeholder="123 Main St" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="Anytown" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province</Label>
                      <Input id="state" placeholder="CA" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP/Postal Code</Label>
                      <Input id="zip" placeholder="12345" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" placeholder="United States" />
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mt-4">
                    <Button onClick={() => setIsAddingAddress(false)}>Save Address</Button>
                    <Button variant="outline" onClick={() => setIsAddingAddress(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="stripe" id="stripe" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="stripe" className="flex items-center cursor-pointer">
                      <span className="font-medium">Credit/Debit Card</span>
                      <Image src="/payment-cards.png" alt="Credit Cards" width={120} height={24} className="ml-2" />
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">
                      Secure payment via Stripe. We accept Visa, Mastercard, American Express, and Discover.
                    </p>
                    {paymentMethod === "stripe" && (
                      <div className="mt-4 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input id="expiryDate" placeholder="MM/YY" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="sslcommerz" id="sslcommerz" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="sslcommerz" className="flex items-center cursor-pointer">
                      <span className="font-medium">SSLCommerz</span>
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">Pay using SSLCommerz secure payment gateway.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="bkash" id="bkash" className="mt-1" disabled />
                  <div className="flex-1">
                    <Label htmlFor="bkash" className="flex items-center cursor-pointer opacity-50">
                      <span className="font-medium">bKash</span>
                      <span className="ml-2 text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded">Coming Soon</span>
                    </Label>
                    <p className="text-sm text-gray-500 mt-1 opacity-50">Pay using bKash mobile payment service.</p>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Order Notes */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Order Notes (Optional)</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Add any special instructions or notes about your order here..."
                className="resize-none"
                rows={3}
              />
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader className="pb-3">
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Order Items */}
              <div className="space-y-4">
                {cartItemsState.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-md flex-shrink-0">
                      <Image
                        src={`/abstract-geometric-shapes.png?height=64&width=64&query=${item.image} product`}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium">{item.name}</h4>
                      <p className="text-xs text-gray-500">Color: {item.color}</p>
                      <div className="flex items-center mt-1">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="h-6 w-6 rounded-md"
                        >
                          <Minus size={12} />
                        </Button>
                        <span className="mx-2 text-sm">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.maxQuantity}
                          className="h-6 w-6 rounded-md"
                        >
                          <Plus size={12} />
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Order Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <Button
                className="w-full bg-rose-600 hover:bg-rose-700"
                size="lg"
                onClick={handleSubmitOrder}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </Button>

              {/* Security Notice */}
              <div className="text-xs text-gray-500 flex items-center justify-center">
                <ShieldCheck size={14} className="mr-1" />
                <span>Secure checkout powered by Stripe</span>
              </div>

              {/* Shipping & Returns */}
              <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                <div className="flex items-center text-sm">
                  <Truck size={16} className="mr-2 text-gray-600" />
                  <span>Free shipping on orders over $100</span>
                </div>
                <div className="flex items-center text-sm">
                  <CreditCard size={16} className="mr-2 text-gray-600" />
                  <span>We never store your full payment details</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
