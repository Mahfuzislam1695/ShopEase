"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"

interface CartItemProps {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  color?: string
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

export function CartItem({ id, name, price, image, quantity, color, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative h-16 w-16 rounded-md overflow-hidden">
        <Image
          src={`/abstract-geometric-shapes.png?height=64&width=64&query=${image}`}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-medium">{name}</h3>
        {color && <p className="text-sm text-gray-500">Color: {color}</p>}
        <p className="font-semibold">${price.toFixed(2)}</p>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onUpdateQuantity(id, quantity - 1)}
          disabled={quantity <= 1}
          className="h-8 w-8"
        >
          <Minus size={14} />
        </Button>

        <span className="w-8 text-center">{quantity}</span>

        <Button variant="outline" size="icon" onClick={() => onUpdateQuantity(id, quantity + 1)} className="h-8 w-8">
          <Plus size={14} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(id)}
          className="h-8 w-8 text-red-500 hover:text-red-700"
        >
          <Trash2 size={14} />
        </Button>
      </div>
    </div>
  )
}
