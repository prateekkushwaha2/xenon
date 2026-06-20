import { supabase } from '@/lib/supabase'

import ProductDetails from '@/components/ProductDetails'

import {
  getEstimatedDelivery
} from '@/lib/delivery'

async function getProduct(
  slug: string
) {
  const { data, error } =
    await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single()

  if (error) {
    console.log(error)

    return null
  }

  return data
}

export default async function ProductPage({
  params
}: {
  params: Promise<{
    slug: string
  }>
}) {
  const { slug } =
    await params

  const product =
    await getProduct(slug)

  if (!product) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Product not found
      </main>
    )
  }

  const estimatedDelivery =
    getEstimatedDelivery()

  return (
    <ProductDetails
      product={product}
      estimatedDelivery={
        estimatedDelivery
      }
    />
  )
}