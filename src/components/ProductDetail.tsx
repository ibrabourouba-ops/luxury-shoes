'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { Star, Check, ShieldCheck, Truck, RotateCcw, ArrowLeft } from 'lucide-react'
import type { Product } from '@/lib/products'
import { useCart } from '@/context/CartContext'

const SIZES = ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12']

export default function ProductDetail({ product }: { product: Product }) {
  const [size, setSize] = useState('9')
  const [added, setAdded] = useState(false)
  const { add } = useCart()

  const handleAdd = () => {
    add(product, size)
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <Link
        href={`/${product.category}`}
        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-white/50 transition-colors hover:text-crimson-400"
      >
        <ArrowLeft className="h-4 w-4" /> Back to {product.category}
      </Link>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.image} alt={product.name} className="aspect-square w-full object-cover" />
          <span className="absolute left-5 top-5 rounded-full bg-crimson-500 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
            {product.tag}
          </span>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-crimson-400">
            {product.category}
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.25rem,5vw,3.75rem)] uppercase leading-[0.95] text-white">
            {product.name}
          </h1>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(product.rating) ? 'fill-crimson-400 text-crimson-400' : 'text-white/20'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-white/50">
              {product.rating} · {product.reviews.toLocaleString()} reviews
            </span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-5xl text-white">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xl text-white/30 line-through">${product.originalPrice}</span>
            )}
          </div>

          <p className="mt-6 max-w-md text-white/60">{product.description}</p>

          {/* Colors */}
          <div className="mt-8">
            <span className="text-xs font-medium uppercase tracking-wider text-white/40">Colourway</span>
            <div className="mt-2 flex gap-2">
              {product.colors.map((c, i) => (
                <span key={i} className="h-8 w-8 rounded-full border-2 border-white/20" style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mt-6">
            <span className="text-xs font-medium uppercase tracking-wider text-white/40">Select size (US)</span>
            <div className="mt-2 grid grid-cols-5 gap-2 sm:grid-cols-6">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`rounded-lg py-2.5 text-sm font-semibold transition-all ${
                    size === s ? 'bg-crimson-500 text-white' : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAdd}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-white py-4 font-display text-sm uppercase tracking-widest text-black transition-all hover:bg-crimson-500 hover:text-white"
          >
            {added ? (
              <>
                <Check className="h-4 w-4" /> Added to bag
              </>
            ) : (
              'Add to bag'
            )}
          </button>

          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6 text-center">
            {[
              { Icon: ShieldCheck, label: '100% authentic' },
              { Icon: Truck, label: 'Free shipping' },
              { Icon: RotateCcw, label: '60-day returns' },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <Icon className="h-5 w-5 text-crimson-400" strokeWidth={1.5} />
                <span className="text-[11px] uppercase tracking-wide text-white/45">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
