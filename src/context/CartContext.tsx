'use client'
import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import type { Product } from '@/lib/products'

export type CartLine = {
  product: Product
  size: string
  qty: number
}

type CartState = {
  lines: CartLine[]
  count: number
  subtotal: number
  isOpen: boolean
  add: (product: Product, size: string) => void
  remove: (id: number, size: string) => void
  setQty: (id: number, size: string, qty: number) => void
  open: () => void
  close: () => void
  clear: () => void
}

const CartContext = createContext<CartState | null>(null)
const STORAGE_KEY = 'nike-cart-v1'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  // Restore from localStorage once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setLines(JSON.parse(raw))
    } catch {}
    setHydrated(true)
  }, [])

  // Persist after hydration.
  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {}
  }, [lines, hydrated])

  const add = useCallback((product: Product, size: string) => {
    setLines((prev) => {
      const i = prev.findIndex((l) => l.product.id === product.id && l.size === size)
      if (i >= 0) {
        const next = [...prev]
        next[i] = { ...next[i], qty: next[i].qty + 1 }
        return next
      }
      return [...prev, { product, size, qty: 1 }]
    })
    setIsOpen(true)
  }, [])

  const remove = useCallback((id: number, size: string) => {
    setLines((prev) => prev.filter((l) => !(l.product.id === id && l.size === size)))
  }, [])

  const setQty = useCallback((id: number, size: string, qty: number) => {
    setLines((prev) =>
      prev
        .map((l) => (l.product.id === id && l.size === size ? { ...l, qty } : l))
        .filter((l) => l.qty > 0),
    )
  }, [])

  const value = useMemo<CartState>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0)
    const subtotal = lines.reduce((n, l) => n + l.qty * l.product.price, 0)
    return {
      lines,
      count,
      subtotal,
      isOpen,
      add,
      remove,
      setQty,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      clear: () => setLines([]),
    }
  }, [lines, isOpen, add, remove, setQty])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
