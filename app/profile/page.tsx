"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { User, ShoppingCart, Heart, Package, LogOut, Edit, Save, Eye, EyeOff, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PageHeader } from "@/app/components/page-header"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal")
  const [isEditing, setIsEditing] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, USA",
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSavePersonalInfo = () => {
    // Simulate API call to update user data
    console.log("Saving personal info:", userData)
    setIsEditing(false)
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate API call to change password
    console.log("Changing password:", passwordData)
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <PageHeader title="My Account" description="Manage your profile, orders, and preferences" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/diverse-group.png" alt="Profile" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 rounded-full bg-rose-600 p-1 text-white shadow-sm">
                    <Upload size={16} />
                  </button>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-medium">{userData.name}</h3>
                  <p className="text-sm text-gray-500">{userData.email}</p>
                </div>
              </div>

              <Separator className="my-6" />

              <nav className="space-y-2">
                <Link
                  href="/profile"
                  className={`flex items-center space-x-2 rounded-md px-3 py-2 ${
                    activeTab === "personal" ? "bg-rose-50 text-rose-600" : "hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("personal")}
                >
                  <User size={18} />
                  <span>Personal Info</span>
                </Link>
                <Link
                  href="/profile?tab=orders"
                  className={`flex items-center space-x-2 rounded-md px-3 py-2 ${
                    activeTab === "orders" ? "bg-rose-50 text-rose-600" : "hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("orders")}
                >
                  <Package size={18} />
                  <span>Orders</span>
                </Link>
                <Link
                  href="/profile?tab=wishlist"
                  className={`flex items-center space-x-2 rounded-md px-3 py-2 ${
                    activeTab === "wishlist" ? "bg-rose-50 text-rose-600" : "hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("wishlist")}
                >
                  <Heart size={18} />
                  <span>Wishlist</span>
                </Link>
                <Link href="/cart" className="flex items-center space-x-2 rounded-md px-3 py-2 hover:bg-gray-100">
                  <ShoppingCart size={18} />
                  <span>Cart</span>
                </Link>
                <Link
                  href="/logout"
                  className="flex items-center space-x-2 rounded-md px-3 py-2 text-red-600 hover:bg-red-50"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </Link>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            </TabsList>

            {/* Personal Info Tab */}
            <TabsContent value="personal" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </div>
                  <Button
                    variant={isEditing ? "default" : "outline"}
                    size="sm"
                    onClick={() => (isEditing ? handleSavePersonalInfo() : setIsEditing(true))}
                  >
                    {isEditing ? (
                      <>
                        <Save size={16} className="mr-2" />
                        Save
                      </>
                    ) : (
                      <>
                        <Edit size={16} className="mr-2" />
                        Edit
                      </>
                    )}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={userData.name}
                        onChange={handlePersonalInfoChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={userData.email}
                        onChange={handlePersonalInfoChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={userData.phone}
                        onChange={handlePersonalInfoChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={userData.address}
                        onChange={handlePersonalInfoChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your password to keep your account secure</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          name="currentPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          className="pr-10"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          className="pr-10"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          className="pr-10"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <Button type="submit">Update Password</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>View your past orders and their status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Sample order items */}
                    {[1, 2, 3].map((order) => (
                      <div key={order} className="rounded-lg border p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <p className="font-medium">Order #{1000 + order}</p>
                            <p className="text-sm text-gray-500">Placed on May {10 + order}, 2023</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                order === 1
                                  ? "bg-blue-100 text-blue-800"
                                  : order === 2
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {order === 1 ? "Delivered" : order === 2 ? "Shipped" : "Processing"}
                            </span>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                        <Separator className="my-4" />
                        <div className="flex items-center space-x-4">
                          <div className="relative h-16 w-16 overflow-hidden rounded-md">
                            <Image
                              src={`/generic-product-display.png?height=64&width=64&query=product ${order}`}
                              alt={`Order ${order}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">Product Name {order}</p>
                            <p className="text-sm text-gray-500">
                              Qty: {order} × ${20 * order}.00
                            </p>
                          </div>
                          <div className="ml-auto font-medium">${20 * order * order}.00</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Wishlist Tab */}
            <TabsContent value="wishlist">
              <Card>
                <CardHeader>
                  <CardTitle>Your Wishlist</CardTitle>
                  <CardDescription>Items you've saved for later</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Sample wishlist items */}
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="group relative overflow-hidden rounded-lg border">
                        <div className="aspect-square relative">
                          <Image
                            src={`/generic-product-display.png?height=300&width=300&query=product ${item}`}
                            alt={`Wishlist item ${item}`}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium">Product Name {item}</h3>
                          <p className="text-sm text-gray-500">Category {item}</p>
                          <div className="mt-2 flex items-center justify-between">
                            <p className="font-medium">${15 * item}.00</p>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <ShoppingCart size={16} className="mr-2" />
                                Add to Cart
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Heart size={16} className="fill-current" />
                                <span className="sr-only">Remove from wishlist</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
