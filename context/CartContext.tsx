'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import toast from 'react-hot-toast'

type CartItem = {
  id: number
  name: string
  category: string
  price: number
  image: string
  quantity: number
  stock: number
}

type Product = {
  id: number
  name: string
  category: string
  price: number
  image: string
  stock: number
  featured: boolean
}

type CartContextType = {
  cart: CartItem[]

  addToCart: (
    product: Product
  ) => void

  increaseQuantity: (
    id: number
  ) => void

  decreaseQuantity: (
    id: number
  ) => void

  removeFromCart: (
    id: number
  ) => void

  clearCart: () => void
}

const CartContext =
  createContext<CartContextType | null>(
    null
  )

export function CartProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [cart, setCart] = useState<
    CartItem[]
  >([])

  // Load Cart
  useEffect(() => {
    const savedCart =
      localStorage.getItem(
        'xenon-cart'
      )

    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Save Cart
  useEffect(() => {
    localStorage.setItem(
      'xenon-cart',
      JSON.stringify(cart)
    )
  }, [cart])

  // Add Product
  const addToCart = (
    product: Product
  ) => {
    const existing =
      cart.find(
        (item) =>
          item.id === product.id
      )

    if (existing) {
      if (
        existing.quantity >=
        existing.stock
      ) {
        toast.error(
          'Stock limit reached'
        )

        return
      }

      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + 1
              }
            : item
        )
      )
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1
        }
      ])
    }
  }

  // Increase

  const increaseQuantity = (
    id: number
  ) => {
    const existing = cart.find(
      (item) => item.id === id
    )

    if (!existing) return

    if (
      existing.quantity >=
      existing.stock
    ) {
      toast.error(
        'Maximum stock reached'
      )

      return
    }

    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity + 1
            }
          : item
      )
    )
  }

  // Decrease
  const decreaseQuantity = (
    id: number
  ) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  item.quantity - 1
              }
            : item
        )
        .filter(
          (item) =>
            item.quantity > 0
        )
    )
  }

  const clearCart = () => {
  setCart([])
  }
  // Remove
  const removeFromCart = (
    id: number
  ) => {
    setCart(
      cart.filter(
        (item) => item.id !== id
      )
    )
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context =
    useContext(CartContext)

  if (!context) {
    throw new Error(
      'useCart must be used inside CartProvider'
    )
  }

  return context
}