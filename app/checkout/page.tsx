'use client'

import Navbar from '@/components/Navbar'
import Checkout from '@/components/Checkout'
import Footer from '@/components/Footer'

import { useCart } from '@/context/CartContext'

export default function CheckoutPage() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity
  } = useCart()

  // Total Cart Quantity
  const totalItems = cart.reduce(
    (sum, item) =>
      sum + item.quantity,
    0
  )

  return (
    <>
      <Navbar cartCount={totalItems} />

      <main className="pt-28">
        <Checkout
          cart={cart}
          removeFromCart={removeFromCart}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
        />
      </main>

      <Footer />
    </>
  )
}