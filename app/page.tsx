"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProductCard } from "@/app/components/product-card"
import { useToast } from "@/components/ui/toast"

export default function HomePage() {
  const { addToast } = useToast()

  // Sample categories
  const categories = [
    { id: 1, name: "Clothing", image: "/images/home/category/clothing.png" },
    { id: 2, name: "Electronics", image: "/images/home/category/electronics.png" },
    { id: 3, name: "Home & Kitchen", image: "/images/home/category/homeKitchen.png" },
    { id: 4, name: "Beauty", image: "/images/home/category/beauty.png" },
    { id: 5, name: "Sports", image: "/images/home/category/sports.png" },
    { id: 6, name: "Books", image: "/images/home/category/books.png" },
  ]

  // Sample featured products
  const featuredProducts = [
    { id: 1, name: "Wireless Headphones", price: 99.99, category: "Electronics", image: "headphones" },
    { id: 2, name: "Cotton T-Shirt", price: 24.99, category: "Clothing", image: "tshirt" },
    { id: 3, name: "Smart Watch", price: 149.99, category: "Electronics", image: "watch" },
    { id: 4, name: "Running Shoes", price: 79.99, category: "Sports", image: "shoes" },
  ]

  // Sample new arrivals
  const newArrivals = [
    { id: 5, name: "Bluetooth Speaker", price: 59.99, category: "Electronics", image: "speaker" },
    { id: 6, name: "Denim Jacket", price: 89.99, category: "Clothing", image: "jacket" },
    { id: 7, name: "Coffee Maker", price: 129.99, category: "Home & Kitchen", image: "coffee" },
    { id: 8, name: "Yoga Mat", price: 39.99, category: "Sports", image: "yoga" },
  ]

  // Handle add to cart
  const handleAddToCart = (id: number, name: string) => {
    addToast({
      title: "Added to Cart",
      description: `${name} has been added to your cart.`,
      action: (
        <Link href="/cart">
          <Button size="sm" variant="outline">
            View Cart
          </Button>
        </Link>
      ),
    })
  }

  // Handle add to wishlist
  const handleAddToWishlist = (id: number, name: string) => {
    addToast({
      title: "Added to Wishlist",
      description: `${name} has been added to your wishlist.`,
      action: (
        <Link href="/wishlist">
          <Button size="sm" variant="outline">
            View Wishlist
          </Button>
        </Link>
      ),
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
        <div className="relative h-[500px] w-full">
          <Image src="/modern-shopping.png" alt="Hero Image" fill priority className="object-cover" />
        </div>
        <div className="absolute inset-0 z-20 flex items-center justify-start container mx-auto px-4">
          <div className="max-w-lg text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Amazing Products</h1>
            <p className="text-lg mb-8">Shop the latest trends and find everything you need in one place.</p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-rose-600 hover:bg-rose-700">
                Shop Now
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Explore Categories
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Shop by Category</h2>
          <Link href="/categories" className="text-rose-600 hover:text-rose-700 flex items-center">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category.id} href={`/products?category=${category.name.toLowerCase()}`} className="group">
              <div className="relative overflow-hidden rounded-lg aspect-square bg-white">
                <Image
                  src={`${category.image}`}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <h3 className="text-primary font-medium text-lg">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Link href="/products" className="text-rose-600 hover:text-rose-700 flex items-center">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                category={product.category}
                image={product.image}
                rating={4.5}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="py-12 container mx-auto px-4">
        <div className="relative overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-600/90 to-orange-500/90 z-10" />
          <div className="relative h-[300px] w-full">
            <Image src="/fashion-sale-banner.png" alt="Sale Banner" fill className="object-cover" />
          </div>
          <div className="absolute inset-0 z-20 flex items-center container mx-auto px-4">
            <div className="max-w-lg text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Summer Sale</h2>
              <p className="text-lg mb-6">Get up to 50% off on selected items. Limited time offer.</p>
              <Button size="lg" className="bg-white text-rose-600 hover:bg-gray-100">
                Shop the Sale
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">New Arrivals</h2>
            <Link href="/new-arrivals" className="text-rose-600 hover:text-rose-700 flex items-center">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                category={product.category}
                image={product.image}
                isNew={true}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
