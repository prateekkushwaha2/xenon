import Link from 'next/link'

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-2xl w-full border border-white/10 rounded-[3rem] bg-white/5 p-12 text-center">
        {/* Icon */}
        <div
          className="
          h-24
          w-24
          rounded-full
          bg-[#d4af37]
          text-black
          flex
          items-center
          justify-center
          text-5xl
          mx-auto
          mb-10
          "
        >
          ✓
        </div>

        <p className="uppercase tracking-[0.4em] text-[#d4af37] text-sm mb-4">
          XENON
        </p>

        <h1 className="text-6xl font-light mb-6">
          Order Confirmed
        </h1>

        <p className="text-white/60 text-lg leading-relaxed mb-10">
          Your luxury order has been placed
          successfully. You can track your
          delivery status anytime from the
          tracking page.
        </p>

        <div className="flex flex-col md:flex-row gap-5 justify-center">
          <Link
            href="/track"
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
            "
          >
            Track Order
          </Link>

          <Link
            href="/"
            className="
            px-8
            py-5
            rounded-full
            border
            border-white/10
            hover:bg-white
            hover:text-black
            transition-all
            duration-300
            "
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  )
}