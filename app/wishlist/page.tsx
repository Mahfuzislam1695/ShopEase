"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Heart, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PageHeader } from "@/app/components/page-header"
import { ProductCard } from "@/app/components/product-card"

// Sample wishlist items
const initialWishlistItems = [
  {
    id: 2,
    name: "Cotton T-Shirt",
    price: 24.99,
    category: "Clothing",
    image: "tshirt",
    inStock: true,
  },
  {
    id: 4,
    name: "Running Shoes",
    price: 79.99,
    category: "Sports",
    image: "shoes",
    inStock: true,
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    price: 59.99,
    category: "Electronics",
    image: "speaker",
    inStock: false,
  },
  {
    id: 8,
    name: "Yoga Mat",
    price: 39.99,
    category: "Sports",
    image: "yoga",
    inStock: true,
  },
  {
    id: 10,
    name: "Backpack",
    price: 69.99,
    category: "Accessories",
    image: "backpack",
    inStock: true,
  },
]

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems)

  const removeItem = (id: number) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const moveToCart = (id: number) => {
    // In a real app, this would add the item to the cart
    // and then remove it from the wishlist
    console.log(`Moving item ${id} to cart`)
    removeItem(id)
  }

  // Check if wishlist is empty
  const isWishlistEmpty = wishlistItems.length === 0

  return (
    <div className="container mx-auto py-8 px-4">
      <PageHeader title="Your Wishlist" />

      {isWishlistEmpty ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <Heart size={32} className="text-gray-500" />
          </div>
          <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">Save items you love to your wishlist and review them anytime.</p>
          <Link href="/products">
            <Button className="bg-rose-600 hover:bg-rose-700">Explore Products</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="relative">
                {!item.inStock && (
                  <div className="absolute inset-0 z-10 bg-black/50 flex items-center justify-center rounded-lg">
                    <span className="text-white font-medium px-3 py-1 bg-black/70 rounded">Out of Stock</span>
                  </div>
                )}
                <div className="absolute top-2 right-2 z-20">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    className="h-8 w-8 rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                    <span className="sr-only">Remove from wishlist</span>
                  </Button>
                </div>
                <ProductCard
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  category={item.category}
                  image={item.image}
                  onAddToCart={() => moveToCart(item.id)}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Link href="/products" className="text-rose-600 hover:text-rose-700 flex items-center">
              <ChevronLeft size={16} className="mr-1" />
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
