'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AdminLoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const login = async () => {
    try {
      setLoading(true)

      const { error } =
        await supabase.auth.signInWithPassword({
          email,
          password
        })

      if (error) {
        alert(error.message)
        return
      }

      router.push('/admin')
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md border border-white/10 rounded-[2rem] p-10 bg-white/5">
        <p className="uppercase tracking-[0.4em] text-[#d4af37] text-sm mb-4">
          XENON ADMIN
        </p>

        <h1 className="text-5xl mb-10">
          Login
        </h1>

        <div className="space-y-5">
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full bg-black/30 border border-white/10 rounded-2xl px-6 py-5 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full bg-black/30 border border-white/10 rounded-2xl px-6 py-5 outline-none"
          />

          <button
            onClick={login}
            disabled={loading}
            className="
            w-full
            py-5
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
            {loading
              ? 'Signing In...'
              : 'Login'}
          </button>
        </div>
      </div>
    </main>
  )
}