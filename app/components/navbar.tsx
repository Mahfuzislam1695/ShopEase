"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Search, ShoppingCart, User, Heart, Menu, X, ChevronDown, LogOut, Package, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Sample categories for navigation
const categories = [
  { name: "Clothing", href: "/products?category=clothing" },
  { name: "Electronics", href: "/products?category=electronics" },
  { name: "Home & Kitchen", href: "/products?category=home-kitchen" },
  { name: "Sports", href: "/products?category=sports" },
  { name: "Beauty", href: "/products?category=beauty" },
  { name: "Books", href: "/products?category=books" },
]

export function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [cartItemsCount, setCartItemsCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true")
    }
    checkAuth()
  }, [])

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Update cart and wishlist counts
  useEffect(() => {
    const updateCounts = () => {
      try {
        const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]")
        const wishlistItems = JSON.parse(localStorage.getItem("wishlistItems") || "[]")

        const totalCartItems = cartItems.reduce((total: number, item: any) => total + (item.quantity || 1), 0)
        setCartItemsCount(totalCartItems)
        setWishlistCount(wishlistItems.length)
      } catch (error) {
        console.error("Error updating counts:", error)
      }
    }

    // Initial load
    updateCounts()

    // Listen for updates
    const handleCartUpdate = () => updateCounts()
    const handleWishlistUpdate = () => updateCounts()
    const handleStorageChange = () => updateCounts()

    window.addEventListener("cartUpdated", handleCartUpdate)
    window.addEventListener("wishlistUpdated", handleWishlistUpdate)
    window.addEventListener("storage", handleStorageChange)

    // Also update on focus (when user comes back to tab)
    window.addEventListener("focus", updateCounts)

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate)
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate)
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("focus", updateCounts)
    }
  }, [])

  // Toggle login state (for demo purposes)
  const toggleLogin = () => {
    const newState = !isLoggedIn
    setIsLoggedIn(newState)
    localStorage.setItem("isLoggedIn", String(newState))
  }

  // Check if a link is active
  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${isScrolled ? "bg-white shadow-md" : "bg-white/80 backdrop-blur-md"
        }`}
    >
      {/* Top bar - only on desktop */}
      <div className="hidden sm:block bg-gray-900 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div>Free shipping on orders over $50</div>
          <div className="flex items-center space-x-4">
            <Link href="/help" className="hover:text-gray-300">
              Help
            </Link>
            <Link href="/orders" className="hover:text-gray-300">
              Track Order
            </Link>
            <Link href="/contact" className="hover:text-gray-300">
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu size={24} />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between py-4 border-b">
                  <Link href="/" className="flex items-center space-x-2">
                    <Image src="/abstract-logo.png" alt="Logo" width={32} height={32} />
                    <span className="font-bold text-lg">ShopEase</span>
                  </Link>
                  <SheetClose className="rounded-full p-2 hover:bg-gray-100">
                    <X size={18} />
                  </SheetClose>
                </div>

                <div className="py-4 flex-1 overflow-auto">
                  <div className="mb-4">
                    <Input placeholder="Search products..." className="w-full" />
                  </div>

                  <nav className="space-y-1">
                    <Link
                      href="/"
                      className={`block px-4 py-2 rounded-md ${pathname === "/" ? "bg-rose-50 text-rose-600" : "hover:bg-gray-100"
                        }`}
                    >
                      Home
                    </Link>
                    <div className="py-2">
                      <div className="px-4 font-medium mb-1">Categories</div>
                      {categories.map((category) => (
                        <Link
                          key={category.name}
                          href={category.href}
                          className={`block px-6 py-2 rounded-md ${pathname.includes(category.href) ? "bg-rose-50 text-rose-600" : "hover:bg-gray-100"
                            }`}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                    <Link
                      href="/cart"
                      className={`flex items-center justify-between px-4 py-2 rounded-md ${pathname === "/cart" ? "bg-rose-50 text-rose-600" : "hover:bg-gray-100"
                        }`}
                    >
                      <span>Cart</span>
                      {cartItemsCount > 0 && <Badge className="bg-rose-600">{cartItemsCount}</Badge>}
                    </Link>
                    <Link
                      href="/wishlist"
                      className={`flex items-center justify-between px-4 py-2 rounded-md ${pathname === "/wishlist" ? "bg-rose-50 text-rose-600" : "hover:bg-gray-100"
                        }`}
                    >
                      <span>Wishlist</span>
                      {wishlistCount > 0 && <Badge className="bg-rose-600">{wishlistCount}</Badge>}
                    </Link>
                    <Link
                      href="/orders"
                      className={`block px-4 py-2 rounded-md ${pathname.startsWith("/orders") ? "bg-rose-50 text-rose-600" : "hover:bg-gray-100"
                        }`}
                    >
                      My Orders
                    </Link>
                  </nav>
                </div>

                <div className="py-4 border-t">
                  {isLoggedIn ? (
                    <>
                      <Link
                        href="/profile"
                        className={`block px-4 py-2 rounded-md ${pathname === "/profile" ? "bg-rose-50 text-rose-600" : "hover:bg-gray-100"
                          }`}
                      >
                        My Account
                      </Link>
                      <button
                        onClick={toggleLogin}
                        className="block w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 text-red-600"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className={`block px-4 py-2 rounded-md ${pathname === "/login" ? "bg-rose-50 text-rose-600" : "hover:bg-gray-100"
                          }`}
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/register"
                        className={`block px-4 py-2 rounded-md ${pathname === "/register" ? "bg-rose-50 text-rose-600" : "hover:bg-gray-100"
                          }`}
                      >
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/abstract-logo.png" alt="Logo" width={36} height={36} />
            <span className="font-bold text-xl hidden sm:inline-block">ShopEase</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-sm font-medium ${isActive("/") ? "text-rose-600" : "text-gray-700 hover:text-rose-600"}`}
            >
              Home
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-sm font-medium text-gray-700 hover:text-rose-600">
                Categories <ChevronDown size={16} className="ml-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {categories.map((category) => (
                  <DropdownMenuItem key={category.name} asChild>
                    <Link href={category.href}>{category.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              href="/products"
              className={`text-sm font-medium ${isActive("/products") ? "text-rose-600" : "text-gray-700 hover:text-rose-600"}`}
            >
              All Products
            </Link>
            <Link
              href="/orders"
              className={`text-sm font-medium ${isActive("/orders") ? "text-rose-600" : "text-gray-700 hover:text-rose-600"}`}
            >
              My Orders
            </Link>
          </nav>

          {/* Search, cart, and account */}
          <div className="flex items-center space-x-4">
            {/* Search toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-700 hover:text-rose-600"
            >
              <Search size={20} />
              <span className="sr-only">Search</span>
            </Button>

            {/* Wishlist - desktop only */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/wishlist" className="hidden sm:flex text-gray-700 hover:text-rose-600 relative">
                    <Heart size={20} />
                    {wishlistCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 min-w-[20px] px-1 flex items-center justify-center bg-rose-600">
                        {wishlistCount}
                      </Badge>
                    )}
                    <span className="sr-only">Wishlist</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Wishlist ({wishlistCount} items)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Cart */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/cart" className="relative text-gray-700 hover:text-rose-600">
                    <ShoppingCart size={20} />
                    {cartItemsCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 min-w-[20px] px-1 flex items-center justify-center bg-rose-600">
                        {cartItemsCount}
                      </Badge>
                    )}
                    <span className="sr-only">Cart</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Cart ({cartItemsCount} items)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Account */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full text-gray-700 hover:text-rose-600">
                    <User size={20} />
                    <span className="sr-only">Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start p-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <User size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">John Doe</p>
                        <p className="text-xs text-gray-500">john.doe@example.com</p>
                      </div>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer flex items-center">
                      <User size={16} className="mr-2" />
                      <span>My Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders" className="cursor-pointer flex items-center">
                      <Package size={16} className="mr-2" />
                      <span>My Orders</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/wishlist" className="cursor-pointer flex items-center">
                      <Heart size={16} className="mr-2" />
                      <span>Wishlist</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer flex items-center">
                      <Settings size={16} className="mr-2" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={toggleLogin} className="text-red-600 cursor-pointer">
                    <LogOut size={16} className="mr-2" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full text-gray-700 hover:text-rose-600">
                    <User size={20} />
                    <span className="sr-only">Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/login">Sign In</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/register">Create Account</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>

      {/* Search bar - expanded */}
      {isSearchOpen && (
        <div className="border-t border-b py-4 bg-white">
          <div className="container mx-auto px-4">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search for products..." className="pl-10 pr-10" autoFocus />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-400"
              >
                <X size={18} />
              </Button>
            </div>
            <div className="mt-2 text-sm text-gray-500">Popular: Headphones, T-shirts, Sneakers</div>
          </div>
        </div>
      )}
    </header>
  )
}
