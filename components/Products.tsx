'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'

import { supabase } from '@/lib/supabase'

import toast from 'react-hot-toast'

type Product = {
  id: number
  slug: string
  name: string
  category: string
  price: number
  image: string
  featured: boolean
  stock: number
}

export default function Products({
  addToCart
}: {
  addToCart: (product: Product) => void
}) {
  const [products, setProducts] =
    useState<Product[]>([])

  const [loading, setLoading] =
    useState(true)

  // Search
  const [search, setSearch] =
    useState('')

  // Category
  const [
    selectedCategory,
    setSelectedCategory
  ] = useState('All')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)

    const { data, error } =
      await supabase
        .from('products')
        .select('*')

    if (error) {
      console.log(error)

      setLoading(false)

      return
    }

    setProducts(data || [])

    setLoading(false)
  }

  // Categories
  const categories = [
    'All',
    ...new Set(
      products.map(
        (product) =>
          product.category
      )
    )
  ]

  // Filtered Products
  const filteredProducts =
    products.filter((product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

      const matchesCategory =
        selectedCategory ===
          'All' ||
        product.category ===
          selectedCategory

      return (
        matchesSearch &&
        matchesCategory
      )
    })

  return (
    <section
      id="products"
      className="bg-black text-white px-4 md:px-6 py-20 md:py-24"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.6
          }}
          viewport={{ once: true }}
          className="mb-14 md:mb-16"
        >
          <p className="uppercase tracking-[0.4em] text-[#d4af37] text-xs md:text-sm mb-4">
            Exclusive Collection
          </p>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-light leading-tight">
            Crafted For{' '}
            <span className="italic text-[#d4af37]">
              Luxury
            </span>
          </h2>
        </motion.div>

        {/* Search */}
        <div className="relative mb-8">
          <Search
            size={18}
            className="
            absolute
            left-5
            top-1/2
            -translate-y-1/2
            text-white/40
            "
          />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
            w-full
            bg-white/5
            border
            border-white/10
            rounded-2xl
            pl-14
            pr-5
            py-4
            outline-none
            focus:border-[#d4af37]/50
            "
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map(
            (category) => (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(
                    category
                  )
                }
                className={`
                px-5
                py-3
                rounded-full
                border
                transition-all
                duration-300
                ${
                  selectedCategory ===
                  category
                    ? `
                    bg-[#d4af37]
                    text-black
                    border-[#d4af37]
                    `
                    : `
                    border-white/10
                    text-white/60
                    hover:border-[#d4af37]
                    hover:text-[#d4af37]
                    `
                }
                `}
              >
                {category}
              </button>
            )
          )}
        </div>

        {/* Skeleton Loading */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[1, 2, 3, 4].map(
              (item) => (
                <div
                  key={item}
                  className="
                  rounded-[2rem]
                  overflow-hidden
                  border
                  border-white/10
                  bg-white/5
                  animate-pulse
                  "
                >
                  <div className="h-[320px] md:h-[420px] bg-white/10" />

                  <div className="p-6">
                    <div className="h-3 w-24 bg-white/10 rounded mb-4" />

                    <div className="h-8 w-40 bg-white/10 rounded mb-6" />

                    <div className="h-6 w-20 bg-white/10 rounded mb-6" />

                    <div className="h-12 w-full bg-white/10 rounded-full" />
                  </div>
                </div>
              )
            )}
          </div>
        ) : filteredProducts.length ===
          0 ? (
          <p className="text-white/50">
            No matching products found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map(
              (product) => (
                <motion.div
                  key={product.id}
                  initial={{
                    opacity: 0,
                    y: 40
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0
                  }}
                  transition={{
                    duration: 0.6
                  }}
                  viewport={{
                    once: true
                  }}
                  className="
                  group
                  rounded-[2rem]
                  overflow-hidden
                  border
                  border-white/10
                  bg-white/5
                  transition-all
                  duration-500
                  hover:border-[#d4af37]/40
                  hover:-translate-y-2
                  "
                >
                  {/* Clickable Area */}
                  <Link
                    href={`/product/${product.slug}`}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      {product.stock <= 0 && (
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
                      <img loading="lazy"
                      width={600}
                    height={800}
                        src={
                          product.image
                        }
                        alt={
                          product.name
                        }
                        className="
                        h-[320px]
                        sm:h-[380px]
                        md:h-[420px]
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-110
                        "
                      />
                    </div>

                    {/* Content */}
                    <div className="p-5 md:p-6">
                      <p className="uppercase tracking-[0.3em] text-[10px] md:text-xs text-[#d4af37] mb-3">
                        {
                          product.category
                        }
                      </p>

                      <h3 className="text-xl md:text-2xl font-light mb-4">
                        {product.name}
                      </h3>

                      <div className="flex items-center justify-between mb-6">
                        <span className="text-xl md:text-2xl text-[#d4af37]">
                          ₹
                          {
                            product.price
                          }
                        </span>

                        <span className="text-white/40 text-xs md:text-sm">
                          Premium
                        </span>
                      </div>
                    </div>
                  </Link>

                  {/* Button */}
                  <div className="px-5 md:px-6 pb-5 md:pb-6">
                    <button
                      onClick={() => {
                        if (product.stock <= 0)
                          return

                        addToCart(product)

                        toast.success(
                          `${product.name} added to cart`
                        )
                      }}
                      disabled={
                        product.stock <= 0
                      }
                      className="
                      w-full
                      py-3 md:py-4
                      rounded-full
                      bg-[#d4af37]
                      text-black
                      text-sm md:text-base
                      font-semibold
                      transition-all
                      duration-300
                      hover:bg-white
                      hover:scale-[1.03]
                      active:scale-[0.98]
                      disabled:opacity-50
                      disabled:cursor-not-allowed
                      "
                      >
                      {product.stock <= 0
                        ? 'Sold Out'
                        : 'Add To Cart'}
                    </button>
                  </div>
                </motion.div>
              )
            )}
          </div>
        )}
      </div>
    </section>
  )
}