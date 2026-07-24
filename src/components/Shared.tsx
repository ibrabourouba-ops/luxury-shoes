'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { Star, ShieldCheck, Truck, RotateCcw, Headphones, ArrowUpRight } from 'lucide-react'
import type { Product } from '@/lib/products'
import { PRODUCTS, CATEGORIES } from '@/lib/products'
import { useCart } from '@/context/CartContext'

// Re-export so older imports (nikeProducts) keep resolving.
export { nikeProducts } from '@/lib/products'

const SIZES = ['7', '8', '9', '10', '11', '12']

/* ------------------------------ Product Card ------------------------------ */
export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const [size, setSize] = useState('9')
  const { add } = useCart()

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent transition-colors duration-500 hover:border-crimson-500/60"
    >
      <Link href={`/product/${product.slug}`} className="relative block h-72 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/10 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-crimson-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
          {product.tag}
        </span>
        <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
          <Star className="h-3 w-3 fill-crimson-400 text-crimson-400" />
          {product.rating}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <Link href={`/product/${product.slug}`}>
            <h3 className="text-lg font-bold leading-tight text-white transition-colors group-hover:text-crimson-400">
              {product.name}
            </h3>
          </Link>
          <p className="mt-1 text-xs uppercase tracking-wider text-white/40">
            {product.reviews.toLocaleString()} reviews
          </p>
        </div>

        <div className="flex gap-2">
          {product.colors.map((c, i) => (
            <span
              key={i}
              className="h-5 w-5 rounded-full border border-white/20"
              style={{ backgroundColor: c }}
              aria-hidden
            />
          ))}
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-medium uppercase tracking-wider text-white/40">Select size</span>
          <div className="flex flex-wrap gap-1.5">
            {SIZES.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                  size === s
                    ? 'bg-crimson-500 text-white'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            {product.originalPrice && (
              <span className="mr-2 text-sm text-white/30 line-through">${product.originalPrice}</span>
            )}
            <span className="font-display text-3xl text-white">${product.price}</span>
          </div>
          <button
            onClick={() => add(product, size)}
            className="rounded-full bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-crimson-500 hover:text-white"
          >
            Add
          </button>
        </div>
      </div>
    </motion.article>
  )
}

/* ---------------------------- Section heading ----------------------------- */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'center' | 'left'
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}
    >
      {eyebrow && (
        <p
          className={`mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-crimson-400 ${
            align === 'center' ? 'justify-center' : ''
          }`}
        >
          <span className="h-px w-8 bg-crimson-400" /> {eyebrow}
        </p>
      )}
      <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] uppercase leading-[0.9] text-white">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-lg text-white/50">{subtitle}</p>}
    </motion.div>
  )
}

/* --------------------------- Category / grid ------------------------------ */
export function CategorySection({ title, products }: { title: string; products: Product[] }) {
  return (
    <section id={title.toLowerCase()} className="bg-obsidian-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="Collection" title={title} subtitle={`Premium Nike footwear for ${title.toLowerCase()}.`} />
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------- Featured collection --------------------------- */
export function FeaturedCollection() {
  const featured = PRODUCTS.filter((p) => ['men', 'basketball', 'running', 'classic'].includes(p.category)).slice(0, 8)
  return (
    <section id="collection" className="relative bg-obsidian-950 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading align="left" eyebrow="The 2026 line-up" title="The collection" />
          <Link
            href="/new"
            className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-white/70 transition-colors hover:text-crimson-400"
          >
            View everything
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------- Category rail ---------------------------- */
export function CategoryRail() {
  return (
    <section className="border-y border-white/10 bg-obsidian-950 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading align="left" eyebrow="Find your fit" title="Shop by category" />
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {CATEGORIES.map((c, i) => (
            <motion.div
              key={c.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={`/${c.key}`}
                className="group flex h-32 flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-crimson-500/60 hover:bg-white/[0.06]"
              >
                <span className="text-xs uppercase tracking-widest text-white/40">{c.blurb}</span>
                <span className="flex items-center justify-between font-display text-2xl uppercase text-white">
                  {c.name}
                  <ArrowUpRight className="h-5 w-5 text-white/30 transition-all group-hover:text-crimson-400" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------ Story panels ------------------------------ */
function StoryPanel({
  image,
  align,
  eyebrow,
  title,
  body,
  href,
  cta,
}: {
  image: string
  align: 'left' | 'right'
  eyebrow: string
  title: string
  body: string
  href: string
  cta: string
}) {
  return (
    <div className="relative h-[80vh] min-h-[520px] overflow-hidden">
      <motion.img
        src={image}
        alt=""
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className={`absolute inset-0 ${
          align === 'left'
            ? 'bg-gradient-to-r from-obsidian-950 via-obsidian-950/50 to-transparent'
            : 'bg-gradient-to-l from-obsidian-950 via-obsidian-950/50 to-transparent'
        }`}
      />
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`max-w-lg ${align === 'right' ? 'ml-auto text-right' : ''}`}
        >
          <p
            className={`mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-crimson-400 ${
              align === 'right' ? 'justify-end' : ''
            }`}
          >
            {align === 'left' && <span className="h-px w-8 bg-crimson-400" />}
            {eyebrow}
            {align === 'right' && <span className="h-px w-8 bg-crimson-400" />}
          </p>
          <h3 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] uppercase leading-[0.9] text-white">{title}</h3>
          <p className="mt-4 text-white/60">{body}</p>
          <Link
            href={href}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-all hover:border-white hover:bg-white/10"
          >
            {cta}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export function StorySection() {
  return (
    <section className="bg-obsidian-950">
      <StoryPanel
        image="/nike-court.png"
        align="left"
        eyebrow="On the hardwood"
        title="Own the court"
        body="From the tip-off to the buzzer, the basketball line is built for players who treat every game like a final."
        href="/basketball"
        cta="Shop basketball"
      />
      <StoryPanel
        image="/nike-store.png"
        align="right"
        eyebrow="The flagship"
        title="Step inside"
        body="A retail experience engineered like the shoes themselves — precise, immersive, unmistakably Nike."
        href="/lifestyle"
        cta="Shop lifestyle"
      />
    </section>
  )
}

/* -------------------------------- Marquee --------------------------------- */
export function Marquee() {
  const items = ['Just Do It', 'Air Jordan', 'Launch 2026', 'Defy The Ordinary', 'Nike']
  const row = [...items, ...items, ...items]
  return (
    <div className="overflow-hidden border-y border-white/10 bg-crimson-600 py-5">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-33.33%'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        {row.map((t, i) => (
          <span key={i} className="mx-6 font-display text-2xl uppercase tracking-wide text-white/90 md:text-3xl">
            {t} <span className="mx-6 text-white/40">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/* ------------------------------- Features --------------------------------- */
export function Features() {
  const features = [
    { Icon: ShieldCheck, title: '100% Authentic', desc: 'Every pair verified at source' },
    { Icon: Truck, title: 'Free Shipping', desc: 'On all orders over $150' },
    { Icon: RotateCcw, title: '60-Day Returns', desc: 'Changed your mind? No stress' },
    { Icon: Headphones, title: '24/7 Support', desc: 'Real people, any time zone' },
  ]
  return (
    <section className="bg-obsidian-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {features.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center"
            >
              <Icon className="mx-auto mb-4 h-8 w-8 text-crimson-400" strokeWidth={1.5} />
              <h4 className="mb-1 font-bold text-white">{title}</h4>
              <p className="text-sm text-white/50">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------ Newsletter -------------------------------- */
export function Newsletter() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  return (
    <section className="relative overflow-hidden bg-obsidian-950 py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(207,10,44,0.18),transparent_70%)]" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-[clamp(2.5rem,7vw,5rem)] uppercase leading-[0.9] text-white">
          Join the movement
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/50">
          Be first to every drop, restock, and members-only release. No noise — just heat.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (email.trim()) setDone(true)
          }}
          className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 rounded-full border border-white/15 bg-white/5 px-7 py-4 text-white placeholder-white/40 outline-none transition-colors focus:border-crimson-500"
          />
          <button
            type="submit"
            className="rounded-full bg-crimson-500 px-10 py-4 font-display text-sm uppercase tracking-widest text-white transition-all hover:bg-crimson-400"
          >
            {done ? "You're in ✓" : 'Subscribe'}
          </button>
        </form>
        {done && <p className="mt-4 text-sm text-crimson-400">Welcome to the drop list.</p>}
      </div>
    </section>
  )
}

/* -------------------------------- Footer ---------------------------------- */
export function Footer() {
  const columns = [
    { title: 'Shop', links: CATEGORIES.slice(0, 4).map((c) => ({ name: c.name, href: `/${c.key}` })) },
    { title: 'More', links: CATEGORIES.slice(4).map((c) => ({ name: c.name, href: `/${c.key}` })) },
    {
      title: 'Support',
      links: [
        { name: 'Contact', href: '#' },
        { name: 'Shipping', href: '#' },
        { name: 'Returns', href: '#' },
        { name: 'FAQs', href: '#' },
      ],
    },
  ]
  return (
    <footer className="border-t border-white/10 bg-obsidian-950 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="font-display text-4xl uppercase tracking-tight text-white">
              Nike
            </Link>
            <p className="mt-3 max-w-xs text-sm text-white/40">
              Just Do It. The Air Jordan launch of 2026 — a cinematic drop for those who defy the ordinary.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-crimson-400">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.name}>
                    <Link href={l.href} className="text-sm text-white/50 transition-colors hover:text-white">
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-xs text-white/30 md:flex-row">
          <span>© 2026 Nike, Inc. Demo project — not affiliated with Nike.</span>
          <span>Just Do It.</span>
        </div>
      </div>
    </footer>
  )
}
