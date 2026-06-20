'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section
      id="home"
      className="
      min-h-[85vh]
      flex
      items-center
      justify-center
      px-4
      md:px-6
      py-16
      md:py-20
      bg-black
      text-white
      overflow-hidden
      "
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        
        {/* Left Content */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.8
          }}
        >
          <p className="uppercase tracking-[0.4em] text-[#d4af37] text-xs md:text-sm mb-6">
            Luxury Jewellery & Cosmetics
          </p>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-light leading-tight mb-8">
            Luxury That
            <br />
            <span className="italic text-[#d4af37]">
              Defines Beauty
            </span>
          </h1>

          <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-xl mb-10">
            Discover premium jewellery and
            cosmetics crafted for elegance,
            confidence, and timeless luxury.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
            <a
              href="#products"
              className="
              text-center
              px-8
              py-4
              rounded-full
              bg-[#d4af37]
              text-black
              font-semibold
              transition-all
              duration-300
              hover:bg-white
              hover:scale-105
              "
            >
              Shop Collection
            </a>

            <a
              href="#checkout"
              className="
              text-center
              px-8
              py-4
              rounded-full
              border
              border-white/20
              text-white
              transition-all
              duration-300
              hover:border-[#d4af37]
              hover:text-[#d4af37]
              "
            >
              Quick Checkout
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16">
            <div>
              <h3 className="text-3xl text-[#d4af37] mb-2">
                100+
              </h3>

              <p className="text-white/50 text-xs md:text-sm uppercase tracking-widest">
                Luxury Products
              </p>
            </div>

            <div>
              <h3 className="text-3xl text-[#d4af37] mb-2">
                24/7
              </h3>

              <p className="text-white/50 text-xs md:text-sm uppercase tracking-widest">
                Customer Support
              </p>
            </div>

            <div>
              <h3 className="text-3xl text-[#d4af37] mb-2">
                2–3 Days
              </h3>

              <p className="text-white/50 text-xs md:text-sm uppercase tracking-widest">
                Fast Delivery
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="relative"
          initial={{
            opacity: 0,
            scale: 0.95
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          transition={{
            duration: 1,
            delay: 0.2
          }}
        >
          <div className="absolute inset-0 bg-[#d4af37]/10 blur-3xl rounded-full" />

          <img
            src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop"
            alt="Luxury Fashion"

            className="
            relative
            z-10
            rounded-[2rem]
            md:rounded-[3rem]
            h-[400px]
            sm:h-[500px]
            md:h-[620px]
            w-full
            object-cover
            border
            border-white/10
            "
          />
        </motion.div>
      </div>
    </section>
  )
}