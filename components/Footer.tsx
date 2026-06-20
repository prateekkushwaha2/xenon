export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-white px-4 md:px-6 py-14 md:py-16 mt-20 md:mt-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl md:text-3xl tracking-[0.3em] md:tracking-[0.4em] text-[#d4af37] mb-5">
            XENON
          </h2>

          <p className="text-white/50 leading-relaxed text-sm md:text-base">
            Luxury jewellery and cosmetics
            crafted with premium aesthetics,
            elegance, and modern sophistication.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white mb-5 text-lg">
            Navigation
          </h3>

          <div className="flex flex-col gap-3 text-white/50 text-sm md:text-base">
            <a
              href="/"
              className="hover:text-[#d4af37]"
            >
              Home
            </a>

            <a
              href="/#products"
              className="hover:text-[#d4af37]"
            >
              Products
            </a>

            <a
              href="/track"
              className="hover:text-[#d4af37]"
            >
              Track Order
            </a>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white mb-5 text-lg">
            Contact
          </h3>

          <div className="space-y-3 text-white/50 text-sm md:text-base">
            <p>support@xenon.com</p>

            <p>India Luxury Commerce</p>

            <p>Premium Customer Support</p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/30 text-xs md:text-sm">
        © 2026 XENON. All rights reserved.
      </div>
    </footer>
  )
}