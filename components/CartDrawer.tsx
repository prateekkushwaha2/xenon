'use client'

import Link from 'next/link'
import { X } from 'lucide-react'

type CartItem = {
  id: number
  name: string
  category: string
  price: number
  image: string
  quantity: number
  stock: number
}

export default function CartDrawer({
  open,
  setOpen,
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart
}: {
  open: boolean

  setOpen: (
    open: boolean
  ) => void

  cart: CartItem[]

  increaseQuantity: (
    id: number
  ) => void

  decreaseQuantity: (
    id: number
  ) => void

  removeFromCart: (
    id: number
  ) => void
}) {
  const subtotal = cart.reduce(
    (sum, item) =>
      sum +
      item.price * item.quantity,
    0
  )

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={() =>
            setOpen(false)
          }
          className="
          fixed
          inset-0
          bg-black/60
          backdrop-blur-sm
          z-50
          "
        />
      )}

      {/* Drawer */}
      <div
        className={`
        fixed
        top-0
        right-0
        h-full
        w-full
        sm:w-[450px]
        bg-black
        border-l
        border-white/10
        z-50
        transition-all
        duration-500
        flex
        flex-col
        ${
          open
            ? 'translate-x-0'
            : 'translate-x-full'
        }
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl text-white">
            Your Cart
          </h2>

          <button
            onClick={() =>
              setOpen(false)
            }
            className="text-white/60 hover:text-white"
          >
            <X />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {cart.length === 0 ? (
            <p className="text-white/50">
              Your cart is empty.
            </p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="
                border
                border-white/10
                rounded-2xl
                p-4
                "
              >
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    width={600}
                    height={800}
                    className="
                    w-20
                    h-20
                    object-cover
                    rounded-xl
                    "
                  />

                  <div className="flex-1">
                    <h3 className="text-white">
                      {item.name}
                    </h3>

                    <p className="text-white/40 text-sm">
                      {item.category}
                    </p>

                    <div className="text-[#d4af37] mt-2">
                      ₹
                      {item.price *
                        item.quantity}
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        decreaseQuantity(
                          item.id
                        )
                      }
                      className="
                      w-8
                      h-8
                      rounded-full
                      border
                      border-white/20
                      "
                    >
                      −
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.id
                        )
                      }
                      className="
                      w-8
                      h-8
                      rounded-full
                      border
                      border-white/20
                      "
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() =>
                      removeFromCart(
                        item.id
                      )
                    }
                    className="text-red-400 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 space-y-5">
          <div className="flex items-center justify-between text-lg">
            <span>Total</span>

            <span className="text-[#d4af37]">
              ₹{subtotal}
            </span>
          </div>

          <Link
            href="/checkout"
            onClick={() =>
              setOpen(false)
            }
            className="
            block
            w-full
            text-center
            py-4
            rounded-full
            bg-[#d4af37]
            text-black
            font-semibold
            hover:bg-white
            transition-all
            duration-300
            "
          >
            Go To Checkout
          </Link>
        </div>
      </div>
    </>
  )
}