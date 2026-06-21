import Link from 'next/link'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CollectionProducts from '@/components/CollectionProducts'
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

async function getProducts(
  category: string
) {
  const { data, error } =
    await supabase
      .from('products')
      .select('*')
      .ilike(
        'category',
        category
      )

  if (error) {
    console.log(error)

    return []
  }

  return data || []
}

export default async function CollectionPage({
  params
}: {
  params: Promise<{
    category: string
  }>
}) {
  const { category } =
    await params

  const products =
    await getProducts(category)

  return (
    <>
      <Navbar cartCount={0} />

      <main className="min-h-screen bg-black text-white px-4 md:px-6 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          
          {/* Hero */}
          <div className="mb-20">
            <p className="uppercase tracking-[0.4em] text-[#d4af37] text-sm mb-4">
              XENON COLLECTION
            </p>

            <h1 className="text-5xl md:text-7xl font-light capitalize">
              {category}
            </h1>

            {/* Collection Stats */}
            <div
              className="
              flex
              flex-wrap
              items-center
              gap-6
              mt-8
              text-white/50
              "
            >
              <span>
                {products.length} Products
              </span>

              <span className="w-1 h-1 rounded-full bg-white/30" />

              <span>
                Luxury Crafted
              </span>

              <span className="w-1 h-1 rounded-full bg-white/30" />

              <span>
                Premium Collection
              </span>
            </div>
          </div>
{/* This website made by prateek kushwaha github : @prateekkushwaha2*/}
          {/* Products */}
          <CollectionProducts products={products}/>
        </div>
      </main>

      <Footer />
    </>
  )
}
