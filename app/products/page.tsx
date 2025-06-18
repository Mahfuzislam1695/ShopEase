"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, ChevronUp, Filter, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { PageHeader } from "@/app/components/page-header"
import { ProductCard } from "@/app/components/product-card"
import { useToast } from "@/components/ui/toast"

// Sample product data
const PRODUCTS = [
  { id: 1, name: "Wireless Headphones", price: 99.99, category: "Electronics", rating: 4.5, image: "headphones" },
  { id: 2, name: "Cotton T-Shirt", price: 24.99, category: "Clothing", rating: 4.2, image: "tshirt" },
  { id: 3, name: "Smart Watch", price: 149.99, category: "Electronics", rating: 4.8, image: "watch" },
  { id: 4, name: "Running Shoes", price: 79.99, category: "Sports", rating: 4.3, image: "shoes" },
  { id: 5, name: "Bluetooth Speaker", price: 59.99, category: "Electronics", rating: 4.1, image: "speaker" },
  { id: 6, name: "Denim Jacket", price: 89.99, category: "Clothing", rating: 4.4, image: "jacket" },
  { id: 7, name: "Coffee Maker", price: 129.99, category: "Home & Kitchen", rating: 4.7, image: "coffee" },
  { id: 8, name: "Yoga Mat", price: 39.99, category: "Sports", rating: 4.0, image: "yoga" },
  { id: 9, name: "Desk Lamp", price: 49.99, category: "Home & Kitchen", rating: 4.2, image: "lamp" },
  { id: 10, name: "Backpack", price: 69.99, category: "Accessories", rating: 4.5, image: "backpack" },
  { id: 11, name: "Sunglasses", price: 29.99, category: "Accessories", rating: 4.1, image: "sunglasses" },
  { id: 12, name: "Water Bottle", price: 19.99, category: "Sports", rating: 4.3, image: "bottle" },
]

// Sample categories
const CATEGORIES = [
  { id: "electronics", name: "Electronics" },
  { id: "clothing", name: "Clothing" },
  { id: "home-kitchen", name: "Home & Kitchen" },
  { id: "sports", name: "Sports" },
  { id: "accessories", name: "Accessories" },
]

export default function ProductsPage() {
  const { addToast } = useToast()
  const [products, setProducts] = useState(PRODUCTS)
  const [priceRange, setPriceRange] = useState([0, 200])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortOption, setSortOption] = useState("popularity")
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 8

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

  // Filter and sort products
  useEffect(() => {
    let filteredProducts = [...PRODUCTS]

    // Filter by price
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1],
    )

    // Filter by category
    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedCategories.includes(product.category.toLowerCase().replace(/\s+/g, "-")),
      )
    }

    // Sort products
    switch (sortOption) {
      case "price-low-high":
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case "price-high-low":
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filteredProducts.sort((a, b) => b.rating - a.rating)
        break
      default: // popularity (default)
        // No sorting needed as the original order is by popularity
        break
    }

    setProducts(filteredProducts)
    setCurrentPage(1) // Reset to first page when filters change
  }, [priceRange, selectedCategories, sortOption])

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(products.length / productsPerPage)

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId])
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId))
    }
  }

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value)
  }

  const clearFilters = () => {
    setPriceRange([0, 200])
    setSelectedCategories([])
    setSortOption("popularity")
  }

  // Filter component for both desktop and mobile
  const FiltersComponent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="h-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50"
        >
          Clear All
        </Button>
      </div>

      {/* Categories */}
      <div>
        <h4 className="font-medium mb-3">Categories</h4>
        <div className="space-y-2">
          {CATEGORIES.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={(checked) => handleCategoryChange(category.id, checked === true)}
              />
              <Label htmlFor={`category-${category.id}`} className="text-sm cursor-pointer">
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-medium mb-3">Price Range</h4>
        <Slider
          defaultValue={[0, 200]}
          max={200}
          step={1}
          value={priceRange}
          onValueChange={handlePriceChange}
          className="mb-6"
        />
        <div className="flex items-center justify-between">
          <span className="text-sm">${priceRange[0]}</span>
          <span className="text-sm">${priceRange[1]}</span>
        </div>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto py-8 px-4">
      <PageHeader title="All Products" description="Browse our collection of high-quality products" />
      <div className="flex items-center justify-between mb-6">
        <div></div>
        <div className="flex items-center space-x-2">
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="price-low-high">Price: Low to High</SelectItem>
              <SelectItem value="price-high-low">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>

          {/* Mobile filter button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Filter size={18} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px]">
              <FiltersComponent />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Desktop Filters */}
        <div className="hidden lg:block">
          <FiltersComponent />
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {/* Mobile Filters Toggle */}
          <div className="lg:hidden mb-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-between"
            >
              <span className="flex items-center">
                <SlidersHorizontal size={18} className="mr-2" />
                Filters
              </span>
              {showFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </Button>

            {showFilters && (
              <div className="mt-4 p-4 border rounded-lg">
                <FiltersComponent />
              </div>
            )}
          </div>

          {/* Results count */}
          <div className="mb-4 text-sm text-gray-500">
            Showing {currentProducts.length} of {products.length} products
          </div>

          {/* Products */}
          {products.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your filters to find what you're looking for.</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {currentProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    category={product.category}
                    image={product.image}
                    rating={product.rating}
                    onAddToCart={handleAddToCart}
                    onAddToWishlist={handleAddToWishlist}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>

                    {[...Array(totalPages)].map((_, i) => (
                      <Button
                        key={i}
                        variant={currentPage === i + 1 ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(i + 1)}
                        className={currentPage === i + 1 ? "bg-rose-600 hover:bg-rose-700" : ""}
                      >
                        {i + 1}
                      </Button>
                    ))}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
