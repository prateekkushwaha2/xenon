'use client'

import {
  useEffect,
  useState
} from 'react'

import Link from 'next/link'

import toast from 'react-hot-toast'

import { supabase } from '@/lib/supabase'

type Product = {
  id: number
  slug: string
  name: string
  category: string
  price: number
  image: string
  stock: number
  featured: boolean
}

export default function FeaturedProducts({
  addToCart
}: {
  addToCart: (
    product: Product
  ) => void
}) {
  const [products, setProducts] =
    useState<Product[]>([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts =
    async () => {
      const { data, error } =
        await supabase
          .from('products')
          .select('*')
          .eq('featured', true)
          .limit(4)

      if (error) {
        console.log(error)

        return
      }

      setProducts(data || [])
    }

  if (products.length === 0)
    return null

  return (
    <section className="px-4 md:px-6 py-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <div className="mb-14">
          <p className="uppercase tracking-[0.4em] text-[#d4af37] text-xs mb-4">
            XENON CURATED
          </p>

          <h2 className="text-5xl md:text-7xl font-light">
            Featured Luxury
          </h2>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(
            (product) => (
              <div
                key={product.id}
                className="
                group
                rounded-[2rem]
                overflow-hidden
                border
                border-white/10
                bg-white/5
                hover:border-[#d4af37]/40
                hover:-translate-y-2
                transition-all
                duration-500
                "
              >
                <Link
                  href={`/product/${product.slug}`}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    {product.stock <=
                      0 && (
                      <div
                        className="
                        absolute
                        top-5
                        left-5
                        z-20
                        px-4
                        py-2
                        rounded-full
                        bg-red-500
                        text-white
                        text-xs
                        uppercase
                        tracking-[0.2em]
                        "
                      >
                        Sold Out
                      </div>
                    )}

                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      width={600}
                      height={800}
                      className="
                      h-[420px]
                      w-full
                      object-cover
                      group-hover:scale-110
                      transition-all
                      duration-700
                      "
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="uppercase tracking-[0.3em] text-[10px] text-[#d4af37] mb-3">
                      {product.category}
                    </p>

                    <h3 className="text-2xl font-light mb-4">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between">
                      <span className="text-[#d4af37] text-2xl">
                        ₹{product.price}
                      </span>

                      <span className="text-white/40 text-sm">
                        Featured
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Button */}
                <div className="px-6 pb-6">
                  <button
                    onClick={() => {
                      if (
                        product.stock <=
                        0
                      )
                        return

                      addToCart(
                        product
                      )

                      toast.success(
                        `${product.name} added to cart`
                      )
                    }}
                    disabled={
                      product.stock <=
                      0
                    }
                    className="
                    w-full
                    py-4
                    rounded-full
                    bg-[#d4af37]
                    text-black
                    font-semibold
                    hover:bg-white
                    transition-all
                    duration-300
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    "
                  >
                    {product.stock <= 0
                      ? 'Sold Out'
                      : 'Add To Cart'}
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}