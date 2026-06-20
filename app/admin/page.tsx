'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

type Order = {
  id: number
  customer_name: string
  email: string
  phone: string
  address: string
  city: string
  pincode: string
  total: number
  created_at: string
  status: string
  order_items?: {
    product_name: string
    category: string
    price: number
    quantity: number
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
  featured: boolean
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
    featured: false,
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

  const deleteCollection = async (
    id: number
  ) => {
    const { error } =
      await supabase
        .from('collections')
        .delete()
        .eq('id', id)

    if (error) {
      console.log(error)

      alert(
        'Collection delete failed'
      )

      return
    }

    alert('Collection deleted')

    fetchCollections()
  }

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
          price,
          quantity
          
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

  const uploadCollectionImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]

    if (!file) return

    try {
      setUploading(true)

      const fileName = `${Date.now()}-${file.name}`

      const { error } =
        await supabase.storage
          .from('products')
          .upload(fileName, file)

      if (error) {
        console.log(error)

        alert(
          'Collection image upload failed'
        )

        return
      }

      const {
        data: { publicUrl }
      } = supabase.storage
        .from('products')
        .getPublicUrl(fileName)

      setCollection({
        ...collection,
        image: publicUrl
      })

      alert(
        'Collection image uploaded'
      )
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
          featured: product.featured,
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
      featured: false,
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
              XENON ADMIN
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
                    loading="lazy"
                    width={600}
                    height={800}
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
          {/* Featured */}
          <div className="flex items-center gap-4 mt-4">
            <input
              type="checkbox"
              checked={product.featured}
              onChange={(e) =>
                setProduct({
                  ...product,
                  featured:
                    e.target.checked
                })
              }
            />

            <p className="text-white/70">
              Featured Product
            </p>
          </div>          
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
                    loading="lazy"
                    width={600}
                    height={800}
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
        {/* Collections CMS */}
        <div className="mb-20">
          <div
            className="
            border
            border-white/10
            rounded-[2rem]
            bg-white/5
            p-8
            mb-12
            "
          >
            <div className="mb-10">
              <p className="uppercase tracking-[0.4em] text-[#d4af37] text-sm mb-3">
                XENON CMS
              </p>

              <h2 className="text-4xl font-light">
                Add Collection
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Collection Name */}
               <input
                type="text"
                placeholder="Collection Name"
                value={collection.name}
                onChange={(e) =>
                  setCollection({
                    ...collection,
                    name: e.target.value
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

              {/* Collection Banner */}
               <input
                type="text"
                placeholder="Collection Banner Image URL"
                value={collection.image}
                onChange={(e) =>
                  setCollection({
                    ...collection,
                    image: e.target.value
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
              <input
                type="file"
                accept="image/*"
                onChange={uploadCollectionImage}
                className="
                border
                border-white/10
                rounded-2xl
                px-5
                py-4
                bg-black
                text-white
                "
              />               
            </div>

            {/* Featured */}
            <div className="mt-6 flex items-center gap-4">
              <input
                type="checkbox"
                checked={collection.featured}
                onChange={(e) =>
                  setCollection({
                    ...collection,
                    featured:
                      e.target.checked
                  })
                }
              />

              <p className="text-white/70">
                Show on homepage
              </p>
            </div>

            {/* Add Button */}
            <button
              onClick={addCollection}
              className="
              mt-8
              px-8
              py-4
              rounded-full
              bg-[#d4af37]
              text-black
              font-semibold
              hover:bg-white
              transition-all
              duration-300
              "
            >
              Add Collection
            </button>
          </div>

          {/* Collections List */}
          <div>
            <h2 className="text-5xl mb-10">
              Collections
            </h2>

            {collections.length === 0 ? (
              <p className="text-white/50">
                No collections yet.
              </p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {collections.map(
                  (item) => (
                    <div
                      key={item.id}
                      className="
                      border
                      border-white/10
                      rounded-[2rem]
                      overflow-hidden
                      bg-white/5
                      "
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="
                        h-[260px]
                        w-full
                        object-cover
                        "
                      />

                      <div className="p-6">
                        <p className="uppercase tracking-[0.3em] text-xs text-[#d4af37] mb-3">
                          COLLECTION
                        </p>

                        <h3 className="text-3xl mb-4">
                          {item.name}
                        </h3>

                        <div className="flex items-center justify-between">
                          <span className="text-white/50">
                            /collection/{item.slug}
                          </span>

                          {item.featured && (
                            <span
                              className="
                              px-4
                              py-2
                              rounded-full
                              bg-[#d4af37]
                              text-black
                              text-sm
                              font-semibold
                              "
                            >
                              Featured
                            </span>
                          )}
                        </div>
                          <button
                            onClick={() =>
                              deleteCollection(item.id!)
                            }
                            className="
                            mt-6
                            w-full
                            py-3
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
                            Delete Collection
                          </button>                        
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div> 
        {/* Orders */}
        <div>
          <h2 className="text-5xl mb-10">
            Orders
          </h2>

          {loading ? (
            <p className="text-white/50">
              Loading orders...
            </p>
          ) : orders.length === 0 ? (
            <p className="text-white/50">
              No orders yet.
            </p>
          ) : (
            <div className="grid gap-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-white/10 rounded-[2rem] p-8 bg-white/5"
                >
                  <div className="flex flex-col lg:flex-row lg:justify-between gap-10">
                    {/* LEFT */}
                    <div className="flex-1">
                      <h2 className="text-3xl mb-4">
                        {order.customer_name}
                      </h2>

                      <div className="space-y-2 text-white/70">
                        <p>
                          📞 {order.phone}
                        </p>

                        <p>
                          📍 {order.address}
                        </p>

                        <p>
                          {order.city} —{' '}
                          {order.pincode}
                        </p>
                      </div>

                      {/* ORDER ITEMS */}
                      <div className="mt-8">
                        <p className="uppercase tracking-[0.3em] text-xs text-[#d4af37] mb-4">
                          Ordered Products
                        </p>

                        <div className="space-y-3">
                          {order.order_items?.map(
                            (
                              item,
                              index
                            ) => (
                              <div
                                key={index}
                                className="
                                flex
                                items-center
                                justify-between
                                border
                                border-white/10
                                rounded-xl
                                px-4
                                py-3
                                "
                              >
                                <div>
                                  <p className="text-white">
                                    {
                                      item.product_name
                                    }
                                  </p>

                                <p className="text-white/40 text-sm">
                                  {item.category} • Qty: {item.quantity}
                                </p>
                                </div>

                                <span className="text-[#d4af37]">
                                  ₹
                                  {item.price}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className="lg:text-right">
                      <p className="text-white/50 mb-2">
                        Order #{order.id}
                      </p>

                      <select
                        value={
                          statusUpdates[
                            order.id
                          ] || order.status
                        }
                        onChange={(e) =>
                          setStatusUpdates({
                            ...statusUpdates,
                            [order.id]:
                              e.target.value
                          })
                        }
                        className="
                        bg-black
                        border
                        border-white/10
                        rounded-xl
                        px-4
                        py-2
                        mb-4
                        "
                        >
                        <option value="packing">
                          packing
                        </option>

                        <option value="Packed">
                          Packed
                        </option>

                        <option value="Shipped">
                          Shipped
                        </option>

                        <option value="Delivered">
                          Delivered
                        </option>
                      </select>
                      <div className="flex flex-col gap-3 mb-6">
                        {/* Save Status */}
                        <button
                          onClick={() =>
                            updateStatus(
                              order.id,
                              statusUpdates[
                                order.id
                              ] || order.status
                            )
                          }
                          className="
                          px-5
                          py-3
                          rounded-full
                          bg-[#d4af37]
                          text-black
                          font-semibold
                          hover:bg-white
                          transition-all
                          duration-300
                          "
                        >
                          Save Status
                        </button>

                        {/* Send Email */}
                        <button
                          onClick={async () => {
                            try {
                              const response =
                                await fetch(
                                  '/api/send-email',
                                  {
                                    method: 'POST',
                                    headers: {
                                      'Content-Type':
                                        'application/json'
                                    },
                                    body: JSON.stringify({
                                      to: order.email,

                                      subject:
                                        'Your XENON Order Update',

                                      customerName:
                                        order.customer_name,

                                      orderId:
                                        order.id,

                                      status:
                                        statusUpdates[
                                          order.id
                                        ] ||
                                        order.status
                                    })
                                  }
                                )

                              if (!response.ok) {
                                alert(
                                  'Email failed'
                                )

                                return
                              }

                              alert(
                                'Email sent successfully'
                              )
                            } catch (error) {
                              console.log(error)

                              alert(
                                'Email send failed'
                              )
                            }
                          }}
                          className="
                          px-5
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
                          Send Email
                        </button>
                      </div>

                      <h3 className="text-4xl text-[#d4af37] mb-3">
                        ₹{order.total}
                      </h3>

                      <p className="text-white/50">
                        {new Date(
                          order.created_at
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}