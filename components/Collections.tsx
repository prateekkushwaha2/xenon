'use client'

import Link from 'next/link'

import { useEffect, useState } from 'react'

import { supabase } from '@/lib/supabase'

type Collection = {
  id: number
  name: string
  slug: string
  image: string
  featured: boolean
}

export default function Collections() {
  const [
    collections,
    setCollections
  ] = useState<Collection[]>([])

  useEffect(() => {
    fetchCollections()
  }, [])

  const fetchCollections =
    async () => {
      const { data, error } =
        await supabase
          .from('collections')
          .select('*')
          .eq('featured', true)

      if (error) {
        console.log(error)

        return
      }

      setCollections(data || [])
    }

  if (collections.length === 0)
    return (
      <section className="px-4 md:px-6 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">

          <div className="mb-16">
            <div className="h-4 w-40 bg-white/10 rounded mb-4 animate-pulse" />

            <div className="h-16 w-80 bg-white/10 rounded animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="
                h-[250px]
                md:h-[400px]
                rounded-[3rem]
                bg-white/5
                animate-pulse
                "
              />
            ))}
          </div>
        </div>
      </section>
  )

  return (
    <section className="px-4 md:px-6 py-24">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-16">
          <p className="uppercase tracking-[0.4em] text-[#d4af37] text-sm mb-4">
            XENON COLLECTIONS
          </p>

          <h2 className="text-5xl md:text-7xl font-light text-white">
            Explore Luxury
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map(
            (collection) => (
              <Link
                key={collection.id}
                href={`/collection/${collection.slug}`}
                className="
                group
                relative
                overflow-hidden
                rounded-[3rem]
                h-[500px]
                border
                border-white/10
                "
              >
                {collection.image ? (
                  <img
                    src={collection.image}
                    alt={collection.name}
                    loading="lazy"
                    width={1200}
                    height={800}
                    className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                    group-hover:scale-105
                    transition-all
                    duration-700
                    "
                  />
                ) : (
                  <div
                    className="
                    absolute
                    inset-0
                    bg-white/5
                    "
                  />
                )}

                <div
                  className="
                  absolute
                  inset-0
                  bg-black/40
                  "
                />

                <div
                  className="
                  relative
                  z-10
                  h-full
                  flex
                  flex-col
                  justify-end
                  p-10
                  "
                >
                  <p className="uppercase tracking-[0.4em] text-[#d4af37] text-sm mb-4">
                    XENON COLLECTION
                  </p>

                  <h3 className="text-5xl font-light text-white mb-6">
                    {collection.name}
                  </h3>

                  <span className="text-white/80">
                    View Collection →
                  </span>
                </div>
              </Link>
            )
          )}
        </div>        
      </div>
    </section>
  )
}