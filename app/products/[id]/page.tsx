"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Heart, Minus, Plus, Share2, ShoppingCart, Star, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ProductCard } from "@/app/components/product-card"

// Sample product data
const product = {
  id: 3,
  name: "Premium Wireless Headphones",
  price: 149.99,
  originalPrice: 199.99,
  discount: 25,
  rating: 4.8,
  reviews: 124,
  stock: 15,
  sku: "WH-1000XM4",
  category: "Electronics",
  description:
    "Experience premium sound quality with these wireless headphones. Features active noise cancellation, long battery life, and comfortable design for all-day wear.",
  features: [
    "Active Noise Cancellation",
    "40 Hour Battery Life",
    "Quick Charge (5 min charge = 1 hour playback)",
    "Bluetooth 5.0 Connectivity",
    "Touch Controls",
    "Voice Assistant Compatible",
  ],
  colors: ["Black", "Silver", "Blue"],
  images: ["headphones-1", "headphones-2", "headphones-3", "headphones-4"],
}

// Sample reviews
const reviews = [
  {
    id: 1,
    user: "Alex Johnson",
    avatar: "user-1",
    rating: 5,
    date: "May 15, 2023",
    title: "Best headphones I've ever owned",
    comment: "The sound quality is incredible and the noise cancellation works perfectly. Battery life is amazing too!",
  },
  {
    id: 2,
    user: "Sarah Miller",
    avatar: "user-2",
    rating: 4,
    date: "April 28, 2023",
    title: "Great quality, slightly expensive",
    comment:
      "These headphones are fantastic. The sound is crystal clear and the comfort is great for long sessions. Only downside is the price.",
  },
  {
    id: 3,
    user: "Michael Chen",
    avatar: "user-3",
    rating: 5,
    date: "March 12, 2023",
    title: "Worth every penny",
    comment:
      "After trying several brands, these are by far the best. The noise cancellation is perfect for my commute and work calls.",
  },
]

// Sample related products
const relatedProducts = [
  { id: 5, name: "Bluetooth Speaker", price: 59.99, category: "Electronics", rating: 4.1, image: "speaker" },
  { id: 6, name: "Wireless Earbuds", price: 89.99, category: "Electronics", rating: 4.4, image: "earbuds" },
  { id: 7, name: "Smart Watch", price: 129.99, category: "Electronics", rating: 4.7, image: "watch" },
  { id: 8, name: "Portable Charger", price: 39.99, category: "Electronics", rating: 4.0, image: "charger" },
]

export default function ProductDetailPage() {
  const [selectedColor, setSelectedColor] = useState("Black")
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const calculateRatingPercentage = (rating: number) => {
    const counts = [0, 0, 0, 0, 0] // 5 stars to 1 star
    reviews.forEach((review) => {
      counts[5 - review.rating]++
    })
    return (counts[5 - rating] / reviews.length) * 100
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-rose-600">
          Home
        </Link>
        <ChevronRight size={16} className="mx-2" />
        <Link href="/products" className="hover:text-rose-600">
          Products
        </Link>
        <ChevronRight size={16} className="mx-2" />
        <Link href="/products?category=electronics" className="hover:text-rose-600">
          Electronics
        </Link>
        <ChevronRight size={16} className="mx-2" />
        <span className="text-gray-900">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={`/abstract-geometric-shapes.png?height=600&width=600&query=${product.images[selectedImage]} product detail`}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.discount > 0 && (
              <div className="absolute top-4 left-4 bg-rose-600 text-white text-sm font-medium px-2 py-1 rounded">
                {product.discount}% OFF
              </div>
            )}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`relative aspect-square overflow-hidden rounded-md border ${
                  selectedImage === index ? "border-rose-600" : "border-gray-200"
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={`/abstract-geometric-shapes.png?height=150&width=150&query=${image} product thumbnail`}
                  alt={`${product.name} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2 space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              <span className="text-sm text-gray-500">SKU: {product.sku}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-3xl font-bold">${product.price}</div>
            {product.originalPrice && (
              <div className="text-xl text-gray-500 line-through">${product.originalPrice}</div>
            )}
          </div>

          <Separator />

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Color</h3>
              <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex space-x-2">
                {product.colors.map((color) => (
                  <div key={color} className="flex items-center space-x-2">
                    <RadioGroupItem value={color} id={`color-${color}`} className="sr-only" />
                    <Label
                      htmlFor={`color-${color}`}
                      className={`h-10 w-10 rounded-full border-2 cursor-pointer flex items-center justify-center ${
                        selectedColor === color ? "border-rose-600" : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <span
                        className="h-8 w-8 rounded-full"
                        style={{
                          backgroundColor: color.toLowerCase() === "silver" ? "#C0C0C0" : color.toLowerCase(),
                        }}
                      />
                      <span className="sr-only">{color}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Quantity</h3>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="h-10 w-10 rounded-l-md rounded-r-none"
                >
                  <Minus size={16} />
                </Button>
                <div className="h-10 w-12 flex items-center justify-center border-y">{quantity}</div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}
                  className="h-10 w-10 rounded-r-md rounded-l-none"
                >
                  <Plus size={16} />
                </Button>
                <span className="ml-4 text-sm text-gray-500">{product.stock} items available</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <Button size="lg" className="bg-rose-600 hover:bg-rose-700 flex-1">
              <ShoppingCart size={18} className="mr-2" />
              Add to Cart
            </Button>
            <Button variant="outline" size="lg" className="flex-1">
              <Heart size={18} className="mr-2" />
              Add to Wishlist
            </Button>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex items-center text-sm">
              <Truck size={18} className="mr-2 text-gray-600" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center text-sm">
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-2">
                <span className="text-white text-xs">✓</span>
              </div>
              <span>In stock, ready to ship</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-600">
              <Share2 size={18} className="mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="description" className="mb-12">
        <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
          <TabsTrigger
            value="description"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-rose-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="features"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-rose-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
          >
            Features
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-rose-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
          >
            Reviews ({reviews.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="pt-4">
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
        </TabsContent>

        <TabsContent value="features" className="pt-4">
          <ul className="list-disc pl-5 space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="text-gray-700">
                {feature}
              </li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent value="reviews" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Review Summary */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-center mb-4">
                <div className="text-5xl font-bold">{product.rating}</div>
                <div className="flex justify-center my-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-500">Based on {product.reviews} reviews</div>
              </div>

              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center text-sm">
                    <div className="w-12">{rating} stars</div>
                    <div className="flex-1 mx-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: `${calculateRatingPercentage(rating)}%` }}
                      />
                    </div>
                    <div className="w-8 text-right">{Math.round(calculateRatingPercentage(rating))}%</div>
                  </div>
                ))}
              </div>

              <Button className="w-full mt-6 bg-rose-600 hover:bg-rose-700">Write a Review</Button>
            </div>

            {/* Review List */}
            <div className="md:col-span-2 space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-6 last:border-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage
                          src={`/abstract-geometric-shapes.png?height=40&width=40&query=${review.avatar}`}
                          alt={review.user}
                        />
                        <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{review.user}</div>
                        <div className="text-sm text-gray-500">{review.date}</div>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}
                        />
                      ))}
                    </div>
                  </div>
                  <h4 className="font-medium mb-1">{review.title}</h4>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Related Products</h2>
          <Link href="/products" className="text-rose-600 hover:text-rose-700 flex items-center">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              category={product.category}
              image={product.image}
              rating={product.rating}
              onAddToCart={(id) => console.log(`Adding product ${id} to cart`)}
              onAddToWishlist={(id) => console.log(`Adding product ${id} to wishlist`)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
