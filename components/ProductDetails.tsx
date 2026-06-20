'use client'

import {
  useEffect,
  useState
} from 'react'

import toast from 'react-hot-toast'
import Link from 'next/link'

import { supabase } from '@/lib/supabase'
import Navbar from './Navbar'
import Footer from './Footer'

import { useCart } from '@/context/CartContext'

type Product = {
  id: number
  slug: string
  name: string
  category: string
  price: number
  image: string
  images: string
  description: string
  features: string
  featured: boolean
  stock: number
}

export default function ProductDetails({
  product,
  estimatedDelivery
}: {
  product: Product
  estimatedDelivery: string
}) {
  const {
    cart,
    addToCart
  } = useCart()

  // Total Cart Quantity
  const totalItems = cart.reduce(
    (sum, item) =>
      sum + item.quantity,
    0
  )

  // Gallery Images
  const productImages =
    product.images
      ? JSON.parse(product.images)
      : [product.image]

  const [
    selectedImage,
    setSelectedImage
  ] = useState(
    productImages[0]
  )
  const [
    relatedProducts,
    setRelatedProducts
   ] = useState<Product[]>([])
  const [
    recentlyViewed,
    setRecentlyViewed
  ] = useState<Product[]>([])   

  useEffect(() => {
    fetchRelatedProducts()
    fetchRecentlyViewed()
    // Recently Viewed
    const existing =
      JSON.parse(
        localStorage.getItem(
          'recentlyViewed'
        ) || '[]'
      )

    const updated = [
      product.id,
      ...existing.filter(
        (id: number) =>
          id !== product.id
      )
    ].slice(0, 8)

    localStorage.setItem(
      'recentlyViewed',
      JSON.stringify(updated)
    )
  }, [])

   const fetchRelatedProducts =
    async () => {
    const { data, error } =
      await supabase
        .from('products')
        .select('*')
        .eq(
          'category',
          product.category
        )
        .neq('id', product.id)
        .limit(4)

        if (error) {
        console.log(error)
        return
        }

        setRelatedProducts(data || [])
    }
    const fetchRecentlyViewed =
      async () => {
        const ids =
          JSON.parse(
            localStorage.getItem(
              'recentlyViewed'
            ) || '[]'
          )

        const filteredIds =
          ids.filter(
            (id: number) =>
              id !== product.id
          )

        if (
          filteredIds.length === 0
        )
          return

        const { data, error } =
          await supabase
            .from('products')
            .select('*')
            .in(
              'id',
              filteredIds
            )

        if (error) {
          console.log(error)
          return
        }

        setRecentlyViewed(
          data || []
        )
    }
  return (
    <>
      <Navbar cartCount={totalItems} />
      <main className="min-h-screen bg-black text-white px-4 md:px-6 py-24 md:py-32">
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          
          {/* IMAGE GALLERY */}
          <div className="lg:sticky lg:top-28">
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-[3rem] border border-white/10">
              <img
                src={selectedImage}
                alt={product.name}
                loading="lazy"
                width={600}
                    height={800}
                  className="
                  w-full
                  h-[500px]
                  md:h-[700px]
                  object-cover
                  hover:scale-125
                  transition-all
                  duration-700
                  cursor-zoom-in
                  "                
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 mt-6 overflow-x-auto pb-2">
              {productImages.map(
                (
                  image: string,
                  index: number
                ) => (
                  <button
                    key={index}
                    onClick={() =>
                      setSelectedImage(
                        image
                      )
                    }
                    className={`
                    min-w-[90px]
                    h-[90px]
                    rounded-2xl
                    overflow-hidden
                    border
                    transition-all
                    duration-300
                    ${
                      selectedImage ===
                      image
                        ? `
                        border-[#d4af37]
                        scale-105
                        `
                        : `
                        border-white/10
                        hover:border-[#d4af37]/50
                        `
                    }
                    `}
                  >
                    <img
                      src={image}
                      alt={`Preview ${index}`}
                      loading="lazy"
                      width={600}
                    height={800}
                      className="
                      w-full
                      h-full
                      object-cover
                      "
                    />
                  </button>
                )
              )}
            </div>
          </div>

          {/* DETAILS */}
          <div>
            <p className="uppercase tracking-[0.4em] text-[#d4af37] text-sm mb-5">
              {product.category}
            </p>

            <h1 className="text-5xl md:text-7xl font-light mb-8 leading-tight">
              {product.name}
            </h1>

            {/* Description */}
            <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-10">
              {product.description}
            </p>

            {/* Price */}
            <div className="text-5xl md:text-6xl text-[#d4af37] mb-10">
              ₹{product.price}
            </div>
            {/* Stock Status */}
            <div className="mb-10">
              {product.stock <= 0 ? (
                <div
                  className="
                  inline-flex
                  items-center
                  gap-3
                  px-5
                  py-3
                  rounded-full
                  bg-red-500/10
                  border
                  border-red-500/20
                  text-red-400
                  "
                >
                  <div className="w-2 h-2 rounded-full bg-red-400" />

                  Sold Out
                </div>
              ) : product.stock <= 3 ? (
                <div
                  className="
                  inline-flex
                  items-center
                  gap-3
                  px-5
                  py-3
                  rounded-full
                  bg-yellow-500/10
                  border
                  border-yellow-500/20
                  text-yellow-300
                  "
                >
                  <div className="w-2 h-2 rounded-full bg-yellow-300" />

                  Only {product.stock} Left
                </div>
              ) : (
                <div
                  className="
                  inline-flex
                  items-center
                  gap-3
                  px-5
                  py-3
                  rounded-full
                  bg-green-500/10
                  border
                  border-green-500/20
                  text-green-400
                  "
                >
                  <div className="w-2 h-2 rounded-full bg-green-400" />

                  In Stock
                </div>
              )}
            </div>            

            {/* Add To Cart */}
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
              px-10
              py-5
              rounded-full
              bg-[#d4af37]
              text-black
              text-lg
              font-semibold
              hover:bg-white
              hover:scale-[1.03]
              active:scale-[0.98]
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

            {/* Purchase Reassurance */}
            {/* <div
              className="
              mt-8
              flex
              flex-col
              gap-4
              text-white/60
              "
            > */}
              {/* <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#d4af37]" />

                Secure Payments
              </div>

              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#d4af37]" />

                Premium Luxury Packaging
              </div> */}

              {/* <div
                className="
                mt-8
                p-5
                rounded-2xl
                border
                border-white/10
                bg-white/5
                "
              >
                <p className="uppercase tracking-[0.3em] text-[#d4af37] text-xs mb-3">
                  Estimated Delivery
                </p>

                <p className="text-white/80 text-lg">
                  {estimatedDelivery}
                </p>
              </div> */}
            {/* </div>             */}
            {/* Trust Points */}
            <div className="mt-14 space-y-4">
              {[
                    'Secure Payments',
                    'Premium Packaging',
                    'Fast Delivery',
                    'Luxury Craftsmanship',
                    '24/7 Customer Support'
                ].map((item, index) => (
                <div
                key={index}
                className="
                flex
                items-center
                gap-4
                text-white/70
                "
                >
                <div
                    className="
                    w-7
                    h-7
                    rounded-full
                    bg-[#d4af37]
                    text-black
                    flex
                    items-center
                    justify-center
                    text-sm
                    font-bold
                    "
                >
                    ✓
                </div>

                <p className="text-lg">
                    {item}
                </p>
                </div>
            ))}
            </div>
            <div
              className="
              mt-8
              p-5
              rounded-2xl
              border
              border-white/10
              bg-white/5
              "
            >
              <p className="uppercase tracking-[0.3em] text-[#d4af37] text-xs mb-3">
                Estimated Delivery
              </p>

              <p className="text-white/80 text-lg">
                {estimatedDelivery}
              </p>
            </div>

            {/* Features */}
            <div className="mt-14">
              <p className="uppercase tracking-[0.3em] text-[#d4af37] text-sm mb-6">
                Features
              </p>

              <div className="space-y-4">
                {product.features
                  ?.split('\n')
                  .map(
                    (
                      feature,
                      index
                    ) => (
                      <div
                        key={index}
                        className="
                        flex
                        items-center
                        gap-4
                        text-white/70
                        "
                      >
                        <div
                          className="
                          w-2
                          h-2
                          rounded-full
                          bg-[#d4af37]
                          "
                        />

                        <p>
                          {feature}
                        </p>
                      </div>
                    )
                  )}
              </div>
            </div>
          </div>
        </div>
        {/* Related Products */}
        {relatedProducts.length > 0 && (
        <section className="mt-32">
            <div className="max-w-7xl mx-auto">
            
            {/* Heading */}
            <div className="mb-14">
                <p className="uppercase tracking-[0.4em] text-[#d4af37] text-sm mb-4">
                More Luxury
                </p>

                <h2 className="text-4xl md:text-6xl font-light">
                You May Also Like
                </h2>
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map(
                (item) => (
                    <Link
                    key={item.id}
                    href={`/product/${item.slug}`}
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
                    {/* Image */}
                    <div className="overflow-hidden">
                        <img
                        src={item.image}
                        alt={item.name}
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

                    {/* Content */}
                    <div className="p-6">
                        <p className="uppercase tracking-[0.3em] text-[10px] text-[#d4af37] mb-3">
                        {item.category}
                        </p>

                        <h3 className="text-2xl font-light mb-4">
                        {item.name}
                        </h3>

                        <div className="flex items-center justify-between">
                        <span className="text-[#d4af37] text-2xl">
                            ₹{item.price}
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
            </div>
        </section>
        )}
        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <section className="mt-32">
            <div className="max-w-7xl mx-auto">

              {/* Heading */}
              <div className="mb-14">
                <p className="uppercase tracking-[0.4em] text-[#d4af37] text-sm mb-4">
                  Recently Viewed
                </p>

                <h2 className="text-4xl md:text-6xl font-light">
                  Continue Exploring
                </h2>
              </div>

              {/* Products */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {recentlyViewed.map(
                  (item) => (
                    <Link
                      key={item.id}
                      href={`/product/${item.slug}`}
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
                      {/* Image */}
                      <div className="relative overflow-hidden">
                        {item.stock <= 0 && (
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
                          src={item.image}
                          alt={item.name}
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

                      {/* Content */}
                      <div className="p-6">
                        <p className="uppercase tracking-[0.3em] text-[10px] text-[#d4af37] mb-3">
                          {item.category}
                        </p>

                        <h3 className="text-2xl font-light mb-4">
                          {item.name}
                        </h3>

                        <div className="flex items-center justify-between">
                          <span className="text-[#d4af37] text-2xl">
                            ₹{item.price}
                          </span>

                          <span className="text-white/40 text-sm">
                            Viewed
                          </span>
                        </div>
                      </div>
                    </Link>
                  )
                )}
              </div>
            </div>
          </section>
        )}        
      </main>

      <Footer />
    </>
  )
}