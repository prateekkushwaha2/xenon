'use client'

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Checkout from '@/components/Checkout'
import Footer from '@/components/Footer'
import HomeSections from '@/components/HomeSections'
import LuxuryCampaign from '@/components/LuxuryCampaign'
import FeaturedProducts from '@/components/FeaturedProducts'
import Collections from '@/components/Collections'

import { useCart } from '@/context/CartContext'

export default function Home() {
  const {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart()

  // Total Cart Quantity
  const totalItems = cart.reduce(
    (sum, item) =>
      sum + item.quantity,
    0
  )

  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar cartCount={totalItems} />

      <Hero />

      <Collections />

      <LuxuryCampaign />

      <FeaturedProducts
        addToCart={addToCart}
      />

      <HomeSections
        addToCart={addToCart}
      />

      <Checkout
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
      />

      <Footer />
    </main>
  )
}