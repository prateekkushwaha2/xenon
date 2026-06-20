'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { useCart } from '@/context/CartContext'

type CartItem = {
  id: number
  name: string
  category: string
  price: number
  image: string
  quantity: number
  stock: number
}

export default function Checkout({
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
}: {
  cart: CartItem[]

  removeFromCart: (
    id: number
  ) => void

  increaseQuantity: (
    id: number
  ) => void

  decreaseQuantity: (
    id: number
  ) => void
}) {
  const router = useRouter()
  const { clearCart } = useCart()

  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  })

  const [loading, setLoading] =
    useState(false)

  const [
    processingOrder,
    setProcessingOrder
  ] = useState(false)

  // Correct Quantity Total
  const subtotal = cart.reduce(
    (sum, item) =>
      sum +
      item.price * item.quantity,
    0
  )

  const shipping = subtotal > 500 ? 0 : 30

  const total = subtotal + shipping 

  const handleOrder = async () => {
    if (
      !customer.name ||
      !customer.email ||
      !customer.phone ||
      !customer.address
    ) {
      toast.error(
        'Please fill all details'
      )

      return
    }
    if (cart.length === 0) {
      toast.error('Your cart is empty')

      return
    }

    try {
      setLoading(true)

      const response = await fetch(
        '/api/create-order',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json'
          },

          body: JSON.stringify({
            amount: total
          })
        }
      )

      const order = await response.json()

      const options = {
        key: process.env
          .NEXT_PUBLIC_RAZORPAY_KEY,

        amount: order.amount,

        currency: order.currency,

        name: 'XENON',

        description:
          'Luxury Ecommerce Payment',

        order_id: order.id,

        handler: async function () {
          setProcessingOrder(true)
          // LIVE STOCK VALIDATION
          for (const item of cart) {
            const {
              data: product,
              error
            } = await supabase
              .from('products')
              .select('stock')
              .eq('id', item.id)
              .single()

            if (error || !product) {
              toast.error(
                'Stock verification failed'
              )

              setProcessingOrder(false)

              return
            }

            if (
              item.quantity >
              product.stock
            ) {
              toast.error(
                `${item.name} is out of stock`
              )

              setProcessingOrder(false)

              return
            }
          }


          const trackingId =
            `XN-${Math.random()
              .toString(36)
              .substring(2, 8)
              .toUpperCase()}`
          
          const { data, error } =
            await supabase
              .from('orders')
              .insert([
                {
                  customer_name:
                    customer.name,

                  email:
                    customer.email,

                  phone:
                    customer.phone,

                  address:
                    customer.address,

                  city: customer.city,

                  pincode:
                    customer.pincode,

                  total,
                  tracking_id: trackingId
                }
              ])
              .select()

          if (error) {
            console.log(error)

            toast.error(
              'Order save failed'
            )

            setProcessingOrder(false)

            return
          }

          const orderId = data[0].id

          const orderItems = cart.map(
            (item) => ({
              order_id: orderId,
              product_name:
                item.name,
              category:
                item.category,
              price: item.price,
              quantity:
                item.quantity
            })
          )

          const {
            error: orderItemsError
          } = await supabase
            .from('order_items')
            .insert(orderItems)

          if (orderItemsError) {
            console.log(orderItemsError)

            toast.error(
              'Failed to save order items'
            )

            setProcessingOrder(false)

            return
          }
          // STOCK DEDUCTION
          for (const item of cart) {
            const {
              data: product
            } = await supabase
              .from('products')
              .select('stock')
              .eq('id', item.id)
              .single()

            if (!product) continue

            await supabase
              .from('products')
              .update({
                stock:
                  product.stock -
                  item.quantity
              })
              .eq('id', item.id)
          }


        await fetch(
          '/api/send-order-confirmation',
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json'
            },

            body: JSON.stringify({
              to: customer.email,

              customerName:
                customer.name,

              trackingId,

              total,

              address:
                customer.address,

              city: customer.city,

              pincode:
                customer.pincode,

              products: cart
            })
          }
        )          
          toast.success(
            'Order placed successfully'
          )
          clearCart()
          router.push('/success')
        },

        theme: {
          color: '#d4af37'
        }
      }

      if (typeof window !== 'undefined') {
        const razorpay = new (
          window as any
        ).Razorpay(options)

        razorpay.open()
      }
    } catch (error) {
      console.log(error)

      toast.error('Payment Failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="checkout"
      className="
      bg-black
      text-white
      px-4
      md:px-6
      pb-20
      md:pb-24
      "
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
        
        {/* Cart */}
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <h2 className="text-3xl md:text-4xl mb-8">
            Your Cart
          </h2>

          <div className="space-y-5">
            {cart.length === 0 ? (
              <p className="text-white/50">
                No products added yet.
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
                  md:p-5
                  "
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg md:text-xl">
                        {item.name}
                      </h4>

                      <p className="text-white/50 text-sm">
                        {item.category}
                      </p>
                    </div>

                    <span className="text-[#d4af37] text-sm md:text-base">
                      ₹
                      {item.price *
                        item.quantity}
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-5">
                    <div className="flex items-center gap-4">
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
                        hover:border-[#d4af37]
                        "
                      >
                        −
                      </button>

                      <span className="text-lg">
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
                        hover:border-[#d4af37]
                        "
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        removeFromCart(
                          item.id
                        )

                        toast.success(
                          'Removed from cart'
                        )
                      }}
                      className="
                      text-red-400
                      text-sm
                      hover:text-red-300
                      "
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pricing */}
          <div className="border-t border-white/10 mt-10 pt-6 space-y-4">
            <div className="flex items-center justify-between text-white/60 text-sm md:text-base">
              <span>Subtotal</span>

              <span>₹{subtotal}</span>
            </div>

            <div className="flex items-center justify-between text-white/60 text-sm md:text-base">
              <span>Shipping</span>

              <span>
                {shipping === 0
                  ? 'FREE'
                  : `₹${shipping}`}
              </span>
            </div>

            <div className="flex items-center justify-between text-2xl md:text-3xl pt-4">
              <span>Total</span>

              <span className="text-[#d4af37]">
                ₹{total}
              </span>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <h2 className="text-3xl md:text-4xl mb-8">
            Checkout
          </h2>

          <div className="space-y-5">
            <input
              type="text"
              placeholder="Full Name"
              value={customer.name}
              onChange={(e) =>
                setCustomer({
                  ...customer,
                  name: e.target.value
                })
              }
              className="
              w-full
              bg-black/30
              border
              border-white/10
              rounded-2xl
              px-5
              md:px-6
              py-4
              md:py-5
              outline-none
              "
            />
            <input
              type="email"
              placeholder="Email Address"
              value={customer.email}
              onChange={(e) =>
                setCustomer({
                  ...customer,
                  email: e.target.value
                })
              }
              className="
              w-full
              bg-black/30
              border
              border-white/10
              rounded-2xl
              px-5
              md:px-6
              py-4
              md:py-5
              outline-none
              "
            />             
            <input
              type="text"
              placeholder="Phone Number"
              value={customer.phone}
              onChange={(e) =>
                setCustomer({
                  ...customer,
                  phone: e.target.value
                })
              }
              className="
              w-full
              bg-black/30
              border
              border-white/10
              rounded-2xl
              px-5
              md:px-6
              py-4
              md:py-5
              outline-none
              "
            />
                       
            <textarea
              placeholder="Delivery Address"
              rows={5}
              value={customer.address}
              onChange={(e) =>
                setCustomer({
                  ...customer,
                  address: e.target.value
                })
              }
              className="
              w-full
              bg-black/30
              border
              border-white/10
              rounded-2xl
              px-5
              md:px-6
              py-4
              md:py-5
              outline-none
              "
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="City"
                value={customer.city}
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    city: e.target.value
                  })
                }
                className="
                w-full
                bg-black/30
                border
                border-white/10
                rounded-2xl
                px-5
                md:px-6
                py-4
                md:py-5
                outline-none
                "
              />

              <input
                type="text"
                placeholder="Pincode"
                value={customer.pincode}
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    pincode: e.target.value
                  })
                }
                className="
                w-full
                bg-black/30
                border
                border-white/10
                rounded-2xl
                px-5
                md:px-6
                py-4
                md:py-5
                outline-none
                "
              />
            </div>

            <button
              onClick={handleOrder}
              disabled={loading}
              className="
              w-full
              py-4
              md:py-5
              rounded-full
              bg-[#d4af37]
              text-black
              text-base
              md:text-lg
              font-semibold
              transition-all
              duration-300
              hover:bg-white
              hover:scale-[1.03]
              active:scale-[0.98]
              disabled:opacity-50
              "
            >
              {loading
                ? 'Processing...'
                : `Pay ₹${total}`}
            </button>
          </div>
        </div>
      </div>

      {/* Processing Overlay */}
      {processingOrder && (
        <div
          className="
          fixed
          inset-0
          bg-black/90
          backdrop-blur-xl
          z-[100]
          flex
          items-center
          justify-center
          "
        >
          <div className="text-center">
            <div
              className="
              w-20
              h-20
              border-4
              border-white/10
              border-t-[#d4af37]
              rounded-full
              animate-spin
              mx-auto
              mb-8
              "
            />

            <h2 className="text-3xl text-white mb-4">
              Confirming Your Order
            </h2>

            <p className="text-white/50">
              Please wait a moment...
            </p>
          </div>
        </div>
      )}
    </section>
  )
}