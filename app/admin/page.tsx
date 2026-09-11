'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

type Order = {
  id: number
  customer_name: string
  email?: string | null
  phone: string
  address: string
  area?: string | null
  city: string
  pincode: string
  total: number
  created_at: string
  status: string
  tracking_id?: string | null
  preferred_visit_date?: string | null
  preferred_visit_time?: string | null
  order_type?: string | null
  group_size?: number | null
  fit_issues?: string[] | null
  marketing_source?: string | null
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
  fbclid?: string | null
  gclid?: string | null
  order_items?: {
    product_name: string
    category: string
    price: number
    quantity?: number
  }[]
}

type Product = {
  id: number
  name: string
  category: string
  price: number
  image: string
  images: string
  description: string
  features: string
  stock: number
}
type Collection = {
  id?: number
  name: string
  slug: string
  image: string
  featured: boolean
}
export default function AdminPage() {
  const router = useRouter()

  const [orders, setOrders] = useState<Order[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)
  const [
  statusUpdates,
  setStatusUpdates
  ] = useState<{
    [key: number]: string
  }>({})
  const [uploading, setUploading] =
    useState(false)

  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    image: '',
    images: '',
    description: '',
    features: '',
    stock:''
  })
  const [collection, setCollection] = useState<Collection>({
    name: '',
    slug: '',
    image: '',
    featured: false
  })  

  useEffect(() => {
    checkAdmin()
    fetchCollections()
  }, [])

  // CHECK ADMIN AUTH
  const checkAdmin = async () => {
    const {
      data: { session }
    } = await supabase.auth.getSession()

    if (!session) {
      router.push('/admin/login')
      return
    }

    fetchOrders()
    fetchProducts()
  }

  // FETCH ORDERS
  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          product_name,
          category,
          price
        )
      `)
      .order('created_at', {
        ascending: false
      })

    if (error) {
      console.log(error)
      return
    }

    setOrders(data || [])
    setLoading(false)
  }

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', {
        ascending: false
      })

    if (error) {
      console.log(error)
      return
    }

    setProducts(data || [])
  }
  const fetchCollections =
    async () => {
      const { data, error } =
        await supabase
          .from('collections')
          .select('*')
          .order('id', {
            ascending: false
          })

      if (error) {
        console.log(error)

        return
      }

      setCollections(data || [])
  }
  // UPDATE ORDER STATUS
  const updateStatus = async (
    id: number,
    status: string
  ) => {
    const { error } = await supabase
      .from('orders')
      .update({
        status
      })
      .eq('id', id)

    if (error) {
      console.log(error)
      alert('Status update failed')
      return
    }

    fetchOrders()
  }

  // IMAGE UPLOAD
  const uploadImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]

    if (!file) return

    try {
      setUploading(true)

      const fileName = `${Date.now()}-${file.name}`

      const { error } = await supabase.storage
        .from('products')
        .upload(fileName, file)

      if (error) {
        console.log(error)
        alert('Image upload failed')
        return
      }

      const {
        data: { publicUrl }
      } = supabase.storage
        .from('products')
        .getPublicUrl(fileName)

      setProduct({
        ...product,
        image: publicUrl
      })

      alert('Image uploaded successfully')
    } catch (error) {
      console.log(error)
      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }
  const uploadMultipleImages = async (
  e: React.ChangeEvent<HTMLInputElement>
   ) => {
    const files = e.target.files

    if (!files) return

    try {
      setUploading(true)

      const uploadedUrls: string[] = []

      for (const file of Array.from(files)) {
        const fileName = `${Date.now()}-${file.name}`

        const { error } =
          await supabase.storage
            .from('products')
            .upload(fileName, file)

        if (error) {
          console.log(error)
          continue
        }

        const {
          data: { publicUrl }
        } = supabase.storage
          .from('products')
          .getPublicUrl(fileName)

        uploadedUrls.push(publicUrl)
      }

      setProduct({
        ...product,
        images: JSON.stringify(
          uploadedUrls
        ),

        image:
          uploadedUrls[0] || ''
      })

      alert(
        'Gallery images uploaded'
      )
    } catch (error) {
      console.log(error)

      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }
        
  const generateSlug = (
    text: string
  ) => {
    return text
      .toLowerCase()
      .trim()
      .replace(
        /[^a-z0-9\s-]/g,
        ''
      )
      .replace(/\s+/g, '-')
  }
      const addCollection = async () => {
        try {
          const { error } =
            await supabase
              .from('collections')
              .insert([
                {
                  name:
                    collection.name,

                  slug:
                    generateSlug(
                      collection.name
                    ),

                  image:
                    collection.image,

                  featured:
                    collection.featured
                }
              ])

          if (error) {
            console.log(error)

            toast.error(
              'Collection add failed'
            )

            return
          }

          toast.success(
            'Collection added'
          )

          setCollection({
            name: '',
            slug: '',
            image: '',
            featured: false
          })
          fetchCollections()
        } catch (error) {
          console.log(error)
        }
      }  
  // ADD PRODUCT
  const addProduct = async () => {
    if (
      !product.name ||
      !product.category ||
      !product.price ||
      !product.image
    ) {
      alert('Fill all product details')
      return
    }

    const { error } = await supabase
      .from('products')
      .insert([
        {
          name: product.name,
          slug: generateSlug(
            product.name
          ),
          category: product.category,
          price: Number(product.price),
          image: product.image,
          images: product.images,
          description:
          product.description,
          features:
          product.features,
          stock:
          Number(product.stock)
        }
      ])

    if (error) {
      console.log(error)
      alert('Failed to add product')
      return
    }

    alert('Product Added Successfully')

    setProduct({
      name: '',
      category: '',
      price: '',
      image: '',
      images: '',
      description: '',
      features: '',
      stock: ''
    })

    fetchProducts()
  }

  // DELETE PRODUCT
  const deleteProduct = async (id: number) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) {
      console.log(error)
      alert('Delete failed')
      return
    }

    fetchProducts()
  }

  // LOGOUT
  const logout = async () => {
    await supabase.auth.signOut()

    router.push('/admin/login')
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 flex items-center justify-between">
          <div>
            <p className="uppercase tracking-[0.4em] text-[#d4af37] text-sm mb-4">
              L’ERA ADMIN
            </p>

            <h1 className="text-6xl font-light">
              Dashboard
            </h1>
          </div>

          <button
            onClick={logout}
            className="
            px-6
            py-3
            rounded-full
            border
            border-white/10
            hover:bg-white
            hover:text-black
            transition-all
            duration-300
            "
          >
            Logout
          </button>
        </div>
        {/* Add Product */}
        <div className="border border-white/10 rounded-[2rem] bg-white/5 p-8 mb-16">
          <h2 className="text-4xl mb-8">
            Add Product
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            <input
              type="text"
              placeholder="Product Name"
              value={product.name}
              onChange={(e) =>
                setProduct({
                  ...product,
                  name: e.target.value
                })
              }
              className="bg-black/30 border border-white/10 rounded-2xl px-6 py-5 outline-none"
            />

            <input
              type="text"
              placeholder="Category"
              value={product.category}
              onChange={(e) =>
                setProduct({
                  ...product,
                  category: e.target.value
                })
              }
              className="bg-black/30 border border-white/10 rounded-2xl px-6 py-5 outline-none"
            />

            <input
              type="number"
              placeholder="Price"
              value={product.price}
              onChange={(e) =>
                setProduct({
                  ...product,
                  price: e.target.value
                })
              }
              className="bg-black/30 border border-white/10 rounded-2xl px-6 py-5 outline-none"
            />
            <input
              type="number"
              placeholder="Stock Quantity"
              value={product.stock}
              onChange={(e) =>
                setProduct({
                  ...product,
                  stock: e.target.value
                })
              }
              className="
              bg-black/30
              border
              border-white/10
              rounded-2xl
              px-6
              py-5
              outline-none
              "
            />            

           <div className="md:col-span-2">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={
                  uploadMultipleImages
                }
                className="
                w-full
                bg-black/30
                border
                border-white/10
                rounded-2xl
                px-6
                py-5
                outline-none
                "
              />

              <p className="text-white/40 text-sm mt-3">
                Upload multiple product images
              </p>
            </div>
            <textarea
              placeholder="Product Description"
              value={product.description}
              onChange={(e) =>
                setProduct({
                  ...product,
                  description: e.target.value
                })
              }
              className="
              md:col-span-2
              bg-black/30
              border
              border-white/10
              rounded-2xl
              px-6
              py-5
              outline-none
              min-h-[140px]
              "
          />

          <textarea
              placeholder="Product Features (One Per Line)"
              value={product.features}
              onChange={(e) =>
                setProduct({
                  ...product,
                  features: e.target.value
                })
              }
              className="
              md:col-span-2
              bg-black/30
              border
              border-white/10
              rounded-2xl
              px-6
              py-5
              outline-none
              min-h-[140px]
              "
          />
          </div>

          {product.images && (
            <div className="flex flex-wrap gap-4 mt-6">
              {JSON.parse(
                product.images
              ).map(
                (
                  image: string,
                  index: number
                ) => (
                  <img
                    key={index}
                    src={image}
                    alt="Preview"
                    className="
                    h-32
                    w-32
                    object-cover
                    rounded-2xl
                    border
                    border-white/10
                    "
                  />
                )
              )}
            </div>
          )}
          <button
            onClick={addProduct}
            disabled={uploading}
            className="
            mt-6
            px-8
            py-4
            rounded-full
            bg-[#d4af37]
            text-black
            font-semibold
            hover:bg-white
            transition-all
            duration-300
            disabled:opacity-50
            "
          >
            {uploading
              ? 'Uploading...'
              : 'Add Product'}
          </button>
        </div>

        {/* Products */}
        <div className="mb-20">
          <h2 className="text-5xl mb-10">
            Products
          </h2>

          {products.length === 0 ? (
            <p className="text-white/50">
              No products found.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((item) => (
                <div
                  key={item.id}
                  className="border border-white/10 rounded-[2rem] overflow-hidden bg-white/5"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-[320px] w-full object-cover"
                  />

                  <div className="p-6">
                    <p className="uppercase text-xs tracking-[0.3em] text-[#d4af37] mb-3">
                      {item.category}
                    </p>

                    <h3 className="text-3xl mb-4">
                      {item.name}
                    </h3>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl text-[#d4af37]">
                        ₹{item.price}
                      </span>

                      <button
                        onClick={() =>
                          deleteProduct(item.id)
                        }
                        className="
                        px-5
                        py-2
                        rounded-full
                        border
                        border-red-500/30
                        text-red-400
                        hover:bg-red-500
                        hover:text-white
                        transition-all
                        duration-300
                        "
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Orders / Fit requests */}
        <div>
          <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#d4af37] mb-3">
                L’ERA FIT REQUESTS
              </p>
              <h2 className="text-5xl mb-2">
                Requests
              </h2>
              <p className="text-white/45 max-w-2xl">
                Every booking is captured here — including location, garments, fit issues, visit preference and ad attribution.
              </p>
            </div>
            <button
              onClick={fetchOrders}
              className="self-start rounded-full border border-white/10 px-5 py-3 text-xs uppercase tracking-[0.15em] text-white/70 transition hover:bg-white hover:text-black"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <p className="text-white/50">Loading requests...</p>
          ) : orders.length === 0 ? (
            <p className="text-white/50">No fit requests yet.</p>
          ) : (
            <div className="grid gap-6">
              {orders.map((order) => {
                const currentStatus = statusUpdates[order.id] || order.status || 'Request Received'
                return (
                  <div
                    key={order.id}
                    className="border border-white/10 rounded-[2rem] p-6 md:p-8 bg-white/[0.035]"
                  >
                    <div className="flex flex-col xl:flex-row xl:justify-between gap-8">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-white/35 mb-2">
                              Request #{order.id}
                            </p>
                            <h2 className="text-3xl md:text-4xl">{order.customer_name}</h2>
                          </div>
                          <div className="rounded-full border border-[#d4af37]/25 bg-[#d4af37]/[0.08] px-4 py-2">
                            <span className="text-[10px] uppercase tracking-[0.16em] text-[#d4af37]">Tracking</span>
                            <p className="mt-0.5 font-mono text-sm text-white">{order.tracking_id || 'Not generated'}</p>
                          </div>
                        </div>

                        <div className="mt-6 grid gap-2 text-sm text-white/70 md:grid-cols-2">
                          <p>📞 {order.phone}</p>
                          {order.email ? <p>✉️ {order.email}</p> : <p className="text-white/35">✉️ No email provided</p>}
                          <p>📍 {order.area || order.address}</p>
                          <p>{order.city} — {order.pincode}</p>
                          <p>🗓 {order.preferred_visit_date || 'Date not selected'}</p>
                          <p>🕒 {order.preferred_visit_time || 'Time not selected'}</p>
                          <p>👥 {order.order_type || 'Just me'} · {order.group_size || 1} {Number(order.group_size || 1) === 1 ? 'person' : 'people'}</p>
                          <p>📣 {order.marketing_source || 'direct'}</p>
                        </div>

                        {order.fit_issues && order.fit_issues.length > 0 && (
                          <div className="mt-5">
                            <p className="text-[10px] uppercase tracking-[0.22em] text-white/35 mb-2">Fit issues</p>
                            <div className="flex flex-wrap gap-2">
                              {order.fit_issues.map((issue) => (
                                <span key={issue} className="rounded-full bg-white/5 px-3 py-1.5 text-xs text-white/70">{issue}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="mt-7">
                          <p className="uppercase tracking-[0.25em] text-xs text-[#d4af37] mb-3">Garments</p>
                          <div className="flex flex-wrap gap-2">
                            {order.order_items?.map((item, index) => (
                              <div key={`${item.product_name}-${index}`} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                                <p className="text-white">{item.product_name}</p>
                                <p className="mt-1 text-xs text-white/35">{item.price > 0 ? `₹${item.price}+` : 'Price at home'}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {(order.utm_source || order.utm_medium || order.utm_campaign) && (
                          <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/35 mb-2">Ad attribution</p>
                            <p className="text-xs text-white/60">
                              {[order.utm_source, order.utm_medium, order.utm_campaign].filter(Boolean).join(' · ')}
                            </p>
                            {(order.fbclid || order.gclid) && (
                              <p className="mt-1 text-[10px] text-white/25 break-all">
                                Click ID: {order.fbclid || order.gclid}
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="xl:w-[260px] shrink-0 xl:text-right">
                        <p className="text-white/40 mb-2">Estimated total</p>
                        <h3 className="text-4xl text-[#d4af37] mb-5">
                          {order.total > 0 ? `₹${order.total}` : 'At home'}
                        </h3>

                        <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-left">
                          <p className="text-[10px] uppercase tracking-[0.18em] text-white/35 mb-2">Update journey</p>
                          <select
                            value={currentStatus}
                            onChange={(e) =>
                              setStatusUpdates({ ...statusUpdates, [order.id]: e.target.value })
                            }
                            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm outline-none"
                          >
                            <option value="Request Received">Request Received</option>
                            <option value="Visit Confirmed">Visit Confirmed</option>
                            <option value="Fit Assessed">Fit Assessed</option>
                            <option value="In Tailoring">In Tailoring</option>
                            <option value="Quality Check">Quality Check</option>
                            <option value="Ready for Return">Ready for Return</option>
                            <option value="Completed">Completed</option>
                          </select>

                          <div className="mt-3 flex flex-col gap-2">
                            <button
                              onClick={async () => {
                                await updateStatus(order.id, currentStatus)
                              }}
                              className="px-5 py-3 rounded-full bg-[#d4af37] text-black font-semibold hover:bg-white transition-all duration-300"
                            >
                              Save Status
                            </button>

                            <button
                              disabled={!order.email}
                              onClick={async () => {
                                if (!order.email) return
                                try {
                                  const response = await fetch('/api/send-email', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                      type: 'status-update',
                                      to: order.email,
                                      customerName: order.customer_name,
                                      trackingId: order.tracking_id,
                                      status: currentStatus,
                                      appointmentDate: order.preferred_visit_date,
                                      appointmentTime: order.preferred_visit_time,
                                    }),
                                  })

                                  if (!response.ok) throw new Error('Email failed')
                                  toast.success('Email sent successfully')
                                } catch (error) {
                                  console.error(error)
                                  toast.error('Email could not be sent')
                                }
                              }}
                              className="px-5 py-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                              {order.email ? 'Send Email Update' : 'No Email Provided'}
                            </button>
                          </div>
                        </div>

                        <p className="mt-4 text-xs text-white/30">
                          {new Date(order.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
