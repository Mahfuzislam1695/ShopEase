import type React from "react"
import Link from "next/link"
import Image from "next/image"

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  description: string
}

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Auth form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-8">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/abstract-logo.png" alt="Logo" width={40} height={40} />
              <span className="text-xl font-bold">ShopEase</span>
            </Link>
            <h2 className="mt-6 text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
            <p className="mt-2 text-sm text-gray-600">{description}</p>
          </div>
          {children}
        </div>
      </div>

      {/* Right side - Image */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-rose-400 to-orange-500 opacity-90"></div>
        <Image
          className="absolute inset-0 h-full w-full object-cover mix-blend-overlay"
          src="/placeholder.svg?height=1200&width=800&query=shopping experience with people browsing products"
          alt="Shopping experience"
          width={1200}
          height={800}
        />
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="max-w-md text-center text-white">
            <h3 className="text-3xl font-bold">Welcome to ShopEase</h3>
            <p className="mt-4 text-lg">Discover amazing products with the best shopping experience.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
