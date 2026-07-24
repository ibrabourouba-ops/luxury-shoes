'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { Search, ShoppingBag, Menu, X } from 'lucide-react'
import { CATEGORIES, PRODUCTS } from '@/lib/products'
import { useCart } from '@/context/CartContext'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const { count, open } = useCart()
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close overlays on route change.
  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
  }, [pathname])

  const results = query.trim()
    ? PRODUCTS.filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 6)
    : []

  const isActive = (href: string) => pathname === href

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'border-b border-white/10 bg-obsidian-950/80 py-3 backdrop-blur-xl' : 'bg-transparent py-6'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <Link href="/" className="font-display text-3xl uppercase tracking-tight text-white">
            Nike
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-7 lg:flex">
            <NavLink href="/" active={isActive('/')}>
              Home
            </NavLink>
            {CATEGORIES.map((c) => (
              <NavLink key={c.key} href={`/${c.key}`} active={isActive(`/${c.key}`)}>
                {c.name}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="rounded-full p-2.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={open}
              aria-label={`Open bag, ${count} items`}
              className="relative rounded-full p-2.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ShoppingBag className="h-5 w-5" />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-crimson-500 text-[10px] font-bold text-white"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
              className="rounded-full p-2.5 text-white lg:hidden"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden px-6 lg:hidden"
            >
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Link href="/" className="rounded-xl bg-white/5 px-4 py-3 text-sm font-bold text-white hover:bg-crimson-500">
                  Home
                </Link>
                {CATEGORIES.map((c) => (
                  <Link
                    key={c.key}
                    href={`/${c.key}`}
                    className="rounded-xl bg-white/5 px-4 py-3 text-sm font-bold text-white hover:bg-crimson-500"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-obsidian-950/95 backdrop-blur-xl"
          >
            <div className="mx-auto max-w-2xl px-6 pt-28">
              <div className="flex items-center gap-4 border-b border-white/20 pb-4">
                <Search className="h-6 w-6 text-crimson-400" />
                {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search sneakers…"
                  className="flex-1 bg-transparent text-2xl text-white placeholder-white/30 outline-none"
                />
                <button
                  onClick={() => {
                    setSearchOpen(false)
                    setQuery('')
                  }}
                  aria-label="Close search"
                  className="rounded-full p-2 text-white/60 hover:bg-white/10 hover:text-white"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="mt-6 space-y-2">
                {query.trim() && results.length === 0 && (
                  <p className="text-white/40">No matches for “{query}”.</p>
                )}
                {results.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.slug}`}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center gap-4 rounded-xl p-2 transition-colors hover:bg-white/5"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt="" className="h-14 w-14 rounded-lg object-cover" />
                    <div>
                      <div className="font-semibold text-white">{p.name}</div>
                      <div className="text-sm text-white/40 capitalize">{p.category} · ${p.price}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`group relative text-sm font-semibold uppercase tracking-wider transition-colors ${
        active ? 'text-crimson-400' : 'text-white hover:text-crimson-400'
      }`}
    >
      {children}
      <span
        className={`absolute -bottom-1.5 left-0 h-0.5 bg-crimson-500 transition-all duration-300 ${
          active ? 'w-full' : 'w-0 group-hover:w-full'
        }`}
      />
    </Link>
  )
}
