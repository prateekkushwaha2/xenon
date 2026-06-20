'use client'

import { useState } from 'react'

import Link from 'next/link'

import { Menu, X } from 'lucide-react'

import CartDrawer from './CartDrawer'

import { useCart } from '@/context/CartContext'

export default function Navbar({
  cartCount
}: {
  cartCount: number
}) {
  // const [open, setOpen] =
  //   useState(false)

  const [cartOpen, setCartOpen] =
    useState(false)

  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
  } = useCart()

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <Link
            href="/"
            className="
            text-lg
            md:text-2xl
            tracking-[0.3em]
            text-[#d4af37]
            "
          >
            XENON
          </Link>

          {/* Desktop Nav */}
          <nav
            className="
            hidden
            md:flex
            items-center
            gap-10
            text-sm
            uppercase
            tracking-[0.2em]
            "
          >
            <Link
              href="/"
              className="hover:text-[#d4af37]"
            >
              Home
            </Link>

            <a
              href="/#products"
              className="hover:text-[#d4af37]"
            >
              Products
            </a>

            <Link
              href="/track"
              className="hover:text-[#d4af37]"
            >
              Track
            </Link>

            <Link
              href="/admin/login"
              className="hover:text-[#d4af37]"
            >
              Admin
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            
            {/* Cart Button */}
            <button
              onClick={() =>
                setCartOpen(true)
              }
              className="
              relative
              px-4
              md:px-5
              py-2
              rounded-full
              border
              border-[#d4af37]
              text-[#d4af37]
              text-xs
              md:text-sm
              hover:bg-[#d4af37]
              hover:text-black
              transition-all
              duration-300
              "
            >
              Cart

              {/* Badge */}
              {cartCount > 0 && (
                <span
                  className="
                  absolute
                  -top-2
                  -right-2
                  w-5
                  h-5
                  rounded-full
                  bg-[#d4af37]
                  text-black
                  text-[10px]
                  font-bold
                  flex
                  items-center
                  justify-center
                  "
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            {/* <button
              onClick={() =>
                setOpen(!open)
              }
              className="
              md:hidden
              text-white
              "
            >
              {open ? (
                <X size={28} />
              ) : (
                <Menu size={28} />
              )}
            </button> */}
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {/* {open && (
        <div
          className="
          fixed
          inset-0
          z-40
          bg-black
          flex
          flex-col
          items-center
          justify-center
          gap-10
          text-2xl
          uppercase
          tracking-[0.2em]
          "
        >
          <Link
            href="/"
            onClick={() =>
              setOpen(false)
            }
            className="hover:text-[#d4af37]"
          >
            Home
          </Link>

          <a
            href="/#products"
            onClick={() =>
              setOpen(false)
            }
            className="hover:text-[#d4af37]"
          >
            Products
          </a>

          <Link
            href="/track"
            onClick={() =>
              setOpen(false)
            }
            className="hover:text-[#d4af37]"
          >
            Track
          </Link>

          <Link
            href="/admin/login"
            onClick={() =>
              setOpen(false)
            }
            className="hover:text-[#d4af37]"
          >
            Admin
          </Link>
        </div>
      )} */}

      {/* Cart Drawer */}
      <CartDrawer
        open={cartOpen}
        setOpen={setCartOpen}
        cart={cart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        removeFromCart={removeFromCart}
      />
    </>
  )
}