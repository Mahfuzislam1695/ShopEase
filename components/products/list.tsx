"use client"

import { useState } from "react"
import { Edit, Trash2, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EditProductDialog } from "./edit"
import { DeleteProductDialog } from "./delete"

// Sample product data
const products = [
  {
    id: "1",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 129.99,
    stock: 45,
    status: "In Stock",
  },
  {
    id: "2",
    name: "Cotton T-Shirt",
    category: "Clothing",
    price: 24.99,
    stock: 120,
    status: "In Stock",
  },
  {
    id: "3",
    name: "Smart Watch",
    category: "Electronics",
    price: 199.99,
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: "4",
    name: "Kitchen Blender",
    category: "Home & Kitchen",
    price: 79.99,
    stock: 8,
    status: "Low Stock",
  },
  {
    id: "5",
    name: "Denim Jeans",
    category: "Clothing",
    price: 49.99,
    stock: 35,
    status: "In Stock",
  },
]

export function ProductList() {
  const [editProduct, setEditProduct] = useState<string | null>(null)
  const [deleteProduct, setDeleteProduct] = useState<string | null>(null)

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      product.status === "In Stock"
                        ? "default"
                        : product.status === "Low Stock"
                          ? "warning"
                          : "destructive"
                    }
                  >
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        Actions
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Options</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => (window.location.href = `/admin/products/${product.id}`)}>
                        <Eye className="mr-2 h-4 w-4" /> View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setEditProduct(product.id)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setDeleteProduct(product.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {editProduct && (
        <EditProductDialog
          productId={editProduct}
          open={!!editProduct}
          onOpenChange={(open) => !open && setEditProduct(null)}
        />
      )}

      {deleteProduct && (
        <DeleteProductDialog
          productId={deleteProduct}
          open={!!deleteProduct}
          onOpenChange={(open) => !open && setDeleteProduct(null)}
        />
      )}
    </>
  )
}
