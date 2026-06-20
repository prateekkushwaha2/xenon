'use client'

import Link from 'next/link'

import {
  useMemo,
  useState
} from 'react'
import { Search } from 'lucide-react'
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

export default function CollectionProducts({
  products
}: {
  products: Product[]
}) {
  const [sortBy, setSortBy] =
    useState('newest')
  const [search, setSearch] =
    useState('')
  const [inStockOnly, setInStockOnly] = useState(false)  
  const filteredProducts =
  useMemo(() => {
        const filtered =
        products.filter(
            (product) => {
            const matchesSearch =
                product.name
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )

            const matchesStock =
                !inStockOnly ||
                product.stock > 0

            return (
                matchesSearch &&
                matchesStock
            )
            }
        )

    switch (sortBy) {
      case 'low':
        return filtered.sort(
          (a, b) =>
            a.price - b.price
        )

      case 'high':
        return filtered.sort(
          (a, b) =>
            b.price - a.price
        )

      default:
        return filtered.reverse()
    }
  }, [
    products,
    sortBy,
    search
  ])

  return (
    <>
      {/* Top Bar */}
      <div
        className="
        flex
        flex-col
        md:flex-row
        md:items-center
        md:justify-between
        gap-6
        mb-12
        "
      >
        <div className="relative w-full md:max-w-md">
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
        <p className="text-white/50">
          Showing{' '}
          {
            filteredProducts.length
          }{' '}
          products
        </p>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(
              e.target.value
            )
          }
          className="
          bg-white/5
          border
          border-white/10
          rounded-2xl
          px-5
          py-4
          outline-none
          text-white
          appearance-none
          "
        >
          <option value="newest" className="bg-black text-white">
            Newest
          </option>

          <option value="low" className="bg-black text-white">
            Price: Low to High
          </option>

          <option value="high" className="bg-black text-white">
            Price: High to Low
          </option>
        </select>
        <label
            className="
            flex
            items-center
            gap-3
            text-white/70
            "
            >
            <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) =>
                setInStockOnly(
                e.target.checked
                )
            }
            />

            In Stock Only
        </label>
      </div>

      {/* Products */}
    {filteredProducts.length === 0 ? (
    <div
        className="
        border
        border-white/10
        rounded-[3rem]
        bg-white/5
        py-24
        px-6
        text-center
        "
    >
        <p className="uppercase tracking-[0.4em] text-[#d4af37] text-sm mb-6">
        XENON SEARCH
        </p>

        <h2 className="text-4xl md:text-5xl font-light mb-6">
        No Products Found
        </h2>

        <p className="text-white/50 max-w-2xl mx-auto">
        Try adjusting your search or explore another luxury collection.
        </p>
    </div>
    ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map(
        (product) => (
            <Link
            key={product.id}
            href={`/product/${product.slug}`}
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
                h-[320px]
                w-full
                object-cover
                group-hover:scale-105
                transition-all
                duration-700
                "
                />
            </div>

            <div className="p-6">
                <p className="uppercase tracking-[0.3em] text-[10px] text-[#d4af37] mb-3">
                {product.category}
                </p>

                <h2 className="text-2xl font-light mb-4">
                {product.name}
                </h2>

                <div className="flex items-center justify-between">
                <span className="text-[#d4af37] text-2xl">
                    ₹{product.price}
                </span>

                <span className="text-white/40 text-sm">
                    Premium
                </span>
                </div>
            </div>
            </Link>
        )
        )}
    </div>
    )}
    </>
  )
}