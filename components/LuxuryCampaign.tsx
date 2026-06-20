import Link from 'next/link'

export default function LuxuryCampaign() {
  return (
    <section className="px-4 md:px-6 py-10 md:py-20">
      <div className="max-w-7xl mx-auto">
        
        <Link
          href="/collection/jewellery"
          className="
          group
          relative
          block
          overflow-hidden
          rounded-[3rem]
          h-[500px]
          md:h-[650px]
          border
          border-white/10
          "
        >
          {/* Background Image */}
          <img loading="lazy"
              width={600}
              height={800}
            src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1600&auto=format&fit=crop"
            alt="Luxury Jewellery"
            className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            group-hover:scale-105
            transition-all
            duration-1000
            "
          />

          {/* Overlay */}
          <div
            className="
            absolute
            inset-0
            bg-black/40
            group-hover:bg-black/50
            transition-all
            duration-500
            "
          />

          {/* Content */}
          <div
            className="
            relative
            z-10
            h-full
            flex
            flex-col
            justify-center
            items-center
            text-center
            px-6
            "
          >
            <p className="uppercase tracking-[0.5em] text-[#d4af37] text-xs md:text-sm mb-6">
              XENON SIGNATURE
            </p>

            <h2 className="text-5xl md:text-7xl font-light max-w-4xl leading-tight mb-8">
              Crafted For Timeless Elegance
            </h2>

            <p className="text-white/70 text-lg md:text-xl max-w-2xl mb-10">
              Discover luxury jewellery designed with refined craftsmanship, modern sophistication, and timeless beauty.
            </p>

            <div
              className="
              inline-flex
              items-center
              gap-3
              px-8
              py-4
              rounded-full
              bg-[#d4af37]
              text-black
              font-semibold
              group-hover:bg-white
              transition-all
              duration-300
              "
            >
              Explore Collection →
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}