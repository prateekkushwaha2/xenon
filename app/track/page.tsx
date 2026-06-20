'use client'

import { useState } from 'react'

import { supabase } from '@/lib/supabase'

type Order = {
  id: number
  total: number
  status: string
  created_at: string
  tracking_id: string
}

export default function TrackPage() {
  const [
    trackingId,
    setTrackingId
  ] = useState('')

  const [orders, setOrders] =
    useState<Order[]>([])

  const [loading, setLoading] =
    useState(false)

  const orderSteps = [
    'packing',
    'Packed',
    'Shipped',
    'Delivered'
  ]

  const searchOrders = async () => {
    if (!trackingId) {
      alert('Enter tracking ID')

      return
    }

    try {
      setLoading(true)

      const { data, error } =
        await supabase
          .from('orders')
          .select('*')
          .eq(
            'tracking_id',
            trackingId.toUpperCase()
          )
          .order('created_at', {
            ascending: false
          })

      if (error) {
        console.log(error)

        alert(
          'Failed to fetch order'
        )

        return
      }

      setOrders(data || [])
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white px-4 md:px-8 py-24">
      <div className="max-w-5xl mx-auto">
        
        {/* Heading */}
        <div className="mb-20 text-center">
          <p className="uppercase tracking-[0.5em] text-[#d4af37] text-sm mb-5">
            XENON ORDER TRACKING
          </p>

          <h1 className="text-5xl md:text-7xl font-light mb-8">
            Track Your Order
          </h1>

          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            Enter your secure tracking ID to view your order status and delivery progress.
          </p>
                    <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            Check your email for Tracking id. In case of any issues, contact support.
          </p>
        </div>

        {/* Search */}
        <div className="border border-white/10 rounded-[2rem] bg-white/5 p-6 md:p-8 mb-16">
          <div className="flex flex-col md:flex-row gap-5">
            <input
              type="text"
              placeholder="Enter Tracking ID (Example: XN-84KD92)"
              value={trackingId}
              onChange={(e) =>
                setTrackingId(
                  e.target.value
                )
              }
              className="
              flex-1
              bg-black/30
              border
              border-white/10
              rounded-2xl
              px-6
              py-5
              outline-none
              focus:border-[#d4af37]/40
              "
            />

            <button
              onClick={searchOrders}
              disabled={loading}
              className="
              px-8
              py-5
              rounded-full
              bg-[#d4af37]
              text-black
              font-semibold
              hover:bg-white
              transition-all
              duration-300
              disabled:opacity-50
              "
            >
              {loading
                ? 'Searching...'
                : 'Track Order'}
            </button>
          </div>
        </div>

        {/* Orders */}
        {orders.length === 0 ? (
          <p className="text-white/40 text-center">
            No orders found.
          </p>
        ) : (
          <div className="grid gap-8">
            {orders.map((order) => {
              const currentStep =
                orderSteps.indexOf(
                  order.status
                )

              return (
                <div
                  key={order.id}
                  className="
                  border
                  border-white/10
                  rounded-[2rem]
                  p-6
                  md:p-8
                  bg-white/5
                  "
                >
                  {/* Top */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
                    <div>
                      <p className="text-white/50 mb-3">
                        Tracking ID
                      </p>

                      <h2 className="text-2xl md:text-3xl text-[#d4af37] mb-4">
                        {order.tracking_id}
                      </h2>

                      <p className="text-white/40">
                        Order #{order.id}
                      </p>
                    </div>

                    <div className="md:text-right">
                      <span
                        className="
                        inline-block
                        px-5
                        py-2
                        rounded-full
                        bg-[#d4af37]
                        text-black
                        font-semibold
                        mb-4
                        "
                      >
                        {order.status}
                      </span>

                      <h3 className="text-4xl text-[#d4af37] mb-3">
                        ₹{order.total}
                      </h3>

                      <p className="text-white/40">
                        {new Date(
                          order.created_at
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {orderSteps.map(
                      (
                        step,
                        index
                      ) => {
                        const completed =
                          index <=
                          currentStep

                        return (
                          <div
                            key={step}
                            className="relative"
                          >
                            {/* Line */}
                            {index <
                              orderSteps.length -
                                1 && (
                              <div
                                className={`
                                absolute
                                top-5
                                left-1/2
                                w-full
                                h-[2px]
                                ${
                                  completed
                                    ? 'bg-[#d4af37]'
                                    : 'bg-white/10'
                                }
                                `}
                              />
                            )}

                            {/* Circle */}
                            <div
                              className={`
                              relative
                              z-10
                              w-10
                              h-10
                              rounded-full
                              flex
                              items-center
                              justify-center
                              text-sm
                              font-semibold
                              mb-4
                              ${
                                completed
                                  ? `
                                  bg-[#d4af37]
                                  text-black
                                  `
                                  : `
                                  bg-white/10
                                  text-white/40
                                  `
                              }
                              `}
                            >
                              {index + 1}
                            </div>

                            {/* Label */}
                            <p
                              className={`
                              text-sm
                              uppercase
                              tracking-[0.2em]
                              ${
                                completed
                                  ? 'text-white'
                                  : 'text-white/40'
                              }
                              `}
                            >
                              {step}
                            </p>
                          </div>
                        )
                      }
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}