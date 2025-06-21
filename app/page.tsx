"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProductCard } from "@/app/components/product-card"
import { useToast } from "@/components/ui/toast"
import { HeroSlider } from "@/components/home/hero-slider"

export default function HomePage() {
  const { addToast } = useToast()

  // Sample categories
  // const categories = [
  //   { id: 1, name: "Clothing", image: "/images/home/category/clothing.png" },
  //   { id: 2, name: "Electronics", image: "/images/home/category/electronics.png" },
  //   { id: 3, name: "Home & Kitchen", image: "/images/home/category/homeKitchen.png" },
  //   { id: 4, name: "Beauty", image: "/images/home/category/beauty.png" },
  //   { id: 5, name: "Sports", image: "/images/home/category/sports.png" },
  //   { id: 6, name: "Books", image: "/images/home/category/books.png" },
  // ]

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

  const categories = [
    {
      id: 1,
      name: "Clothing",
      icon: "👕",
      color: "from-blue-500 to-purple-600",
      hoverColor: "hover:from-blue-600 hover:to-purple-700",
    },
    {
      id: 2,
      name: "Electronics",
      icon: "📱",
      color: "from-green-500 to-teal-600",
      hoverColor: "hover:from-green-600 hover:to-teal-700",
    },
    {
      id: 3,
      name: "Home & Kitchen",
      icon: "🏠",
      color: "from-orange-500 to-red-600",
      hoverColor: "hover:from-orange-600 hover:to-red-700",
    },
    {
      id: 4,
      name: "Beauty",
      icon: "💄",
      color: "from-pink-300 to-rose-600",
      hoverColor: "hover:from-pink-600 hover:to-rose-700",
    },
    {
      id: 5,
      name: "Sports",
      icon: "⚽",
      color: "from-indigo-500 to-blue-600",
      hoverColor: "hover:from-indigo-600 hover:to-blue-700",
    },
    {
      id: 6,
      name: "Books",
      icon: "📚",
      color: "from-purple-500 to-indigo-600",
      hoverColor: "hover:from-purple-600 hover:to-indigo-700",
    },
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
      <HeroSlider />

      {/* Categories Section */}
      {/* Categories Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Shop by Category</h2>
            <p className="text-gray-600">Discover products tailored to your needs</p>
          </div>
          <Link href="/categories" className="text-rose-600 hover:text-rose-700 flex items-center font-medium">
            View All <ChevronRight size={20} className="ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/products?category=${category.name.toLowerCase()}`} className="group">
              <div
                className={`relative overflow-hidden rounded-2xl aspect-square bg-gradient-to-br ${category.color} ${category.hoverColor} transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-xl`}
              >
                <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors duration-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                  <div className="text-7xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-center text-sm lg:text-base leading-tight">{category.name}</h3>
                </div>
                <div className="absolute inset-0 rounded-2xl ring-2 ring-white/20 group-hover:ring-white/40 transition-all duration-300" />
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
