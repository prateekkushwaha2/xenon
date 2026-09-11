'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const ORDER_STEPS = [
  'Request Received',
  'Visit Confirmed',
  'Fit Assessed',
  'In Tailoring',
  'Quality Check',
  'Ready for Return',
  'Completed',
]

type Order = {
  id: number
  total: number
  status: string
  created_at: string
  tracking_id: string
  preferred_visit_date?: string | null
  preferred_visit_time?: string | null
}

export default function TrackPage() {
  const [trackingId, setTrackingId] = useState('')
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get('tracking')
    if (value) {
      setTrackingId(value.toUpperCase())
    }
  }, [])

  const searchOrder = async () => {
    const id = trackingId.trim().toUpperCase()

    if (!id) return

    try {
      setLoading(true)
      setSearched(true)

      const { data, error } = await supabase
        .from('orders')
        .select('id,total,status,created_at,tracking_id,preferred_visit_date,preferred_visit_time')
        .eq('tracking_id', id)
        .maybeSingle()

      if (error) throw error

      setOrder(data || null)
    } catch (error) {
      console.error(error)
      setOrder(null)
    } finally {
      setLoading(false)
    }
  }

  const currentIndex = order
    ? Math.max(0, ORDER_STEPS.indexOf(order.status))
    : -1

  return (
    <main className="min-h-screen bg-[#F7F1E7] text-[#211719] px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1000px]">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-[#A77A42]">L’ERA</p>
          <h1 className="mt-4 font-serif text-[clamp(54px,8vw,96px)] leading-[0.84] tracking-[-0.06em]">
            Track your
            <br />
            <span className="italic">fit journey.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-6 text-black/55">
            Enter the tracking ID you received after submitting your doorstep fit request.
          </p>
        </div>

        <div className="mt-12 rounded-[28px] border border-black/10 bg-white/50 p-5 md:p-7">
          <div className="flex flex-col gap-3 md:flex-row">
            <input
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
              onKeyDown={(e) => {
                if (e.key === 'Enter') searchOrder()
              }}
              placeholder="Example: LE-A1B2C3D4"
              className="min-h-[56px] flex-1 rounded-2xl border border-black/10 bg-white px-5 font-mono text-base uppercase outline-none placeholder:font-sans placeholder:normal-case placeholder:text-black/35 focus:border-[#A77A42]"
            />
            <button
              onClick={searchOrder}
              disabled={loading}
              className="min-h-[56px] rounded-full bg-[#211719] px-8 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#3A2528] disabled:opacity-50"
            >
              {loading ? 'Checking...' : 'Track request'}
            </button>
          </div>
        </div>

        {searched && !loading && !order && (
          <div className="mt-8 rounded-[24px] border border-[#A33A3A]/15 bg-[#A33A3A]/[0.05] p-6 text-center">
            <p className="font-serif text-2xl">We couldn’t find that request.</p>
            <p className="mt-2 text-sm text-black/55">Check the tracking ID and try again.</p>
          </div>
        )}

        {order && (
          <div className="mt-8 rounded-[28px] bg-[#211719] p-6 text-white md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/45">Tracking ID</p>
                <p className="mt-2 font-mono text-2xl tracking-[0.08em] text-[#D4B277]">{order.tracking_id}</p>
                <p className="mt-3 text-sm text-white/40">Request #{order.id}</p>
              </div>
              <div className="md:text-right">
                <span className="inline-flex rounded-full bg-[#D4AF37] px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#211719]">
                  {order.status}
                </span>
                {order.total > 0 && (
                  <p className="mt-4 font-serif text-3xl text-[#D4B277]">₹{order.total} estimated</p>
                )}
              </div>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {ORDER_STEPS.map((step, index) => {
                const completed = index <= currentIndex
                return (
                  <div key={step} className="relative rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold ${completed ? 'bg-[#D4AF37] text-[#211719]' : 'bg-white/10 text-white/35'}`}>
                      {completed ? '✓' : index + 1}
                    </div>
                    <p className={`mt-4 text-sm ${completed ? 'text-white' : 'text-white/35'}`}>{step}</p>
                  </div>
                )
              })}
            </div>

            {(order.preferred_visit_date || order.preferred_visit_time) && (
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-xs uppercase tracking-[0.18em] text-white/35">Requested visit</p>
                <p className="mt-2 text-sm text-white/70">
                  {order.preferred_visit_date || 'Date to be confirmed'} · {order.preferred_visit_time || 'Time to be confirmed'}
                </p>
              </div>
            )}

            <p className="mt-6 text-xs text-white/30">
              Submitted {new Date(order.created_at).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
