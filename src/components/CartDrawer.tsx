'use client'
import { AnimatePresence, motion } from 'motion/react'
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function CartDrawer() {
  const { lines, isOpen, close, setQty, remove, subtotal, count } = useCart()
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 15
  const total = subtotal + shipping

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm"
          />
          <motion.aside
            key="panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 40 }}
            className="fixed right-0 top-0 z-[100] flex h-full w-full max-w-md flex-col border-l border-white/10 bg-obsidian-950/95 backdrop-blur-xl"
            role="dialog"
            aria-label="Shopping bag"
          >
            <header className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-crimson-400" />
                <h2 className="font-display text-sm font-bold uppercase tracking-[0.25em] text-white">
                  Your Bag {count > 0 && <span className="text-white/40">({count})</span>}
                </h2>
              </div>
              <button
                onClick={close}
                aria-label="Close bag"
                className="rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <ShoppingBag className="h-12 w-12 text-white/20" />
                  <p className="text-white/50">Your bag is empty.</p>
                  <button
                    onClick={close}
                    className="text-sm font-semibold uppercase tracking-widest text-crimson-400 hover:text-white"
                  >
                    Keep shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-5">
                  {lines.map((l) => (
                    <li key={`${l.product.id}-${l.size}`} className="flex gap-4">
                      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-white/5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={l.product.image} alt={l.product.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-semibold leading-tight text-white">{l.product.name}</h3>
                          <button
                            onClick={() => remove(l.product.id, l.size)}
                            aria-label={`Remove ${l.product.name}`}
                            className="text-white/40 transition-colors hover:text-crimson-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="mt-0.5 text-xs uppercase tracking-wider text-white/40">Size US {l.size}</p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-3 rounded-full border border-white/15 px-2 py-1">
                            <button
                              onClick={() => setQty(l.product.id, l.size, l.qty - 1)}
                              aria-label="Decrease quantity"
                              className="text-white/70 hover:text-white"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-4 text-center text-sm font-semibold text-white">{l.qty}</span>
                            <button
                              onClick={() => setQty(l.product.id, l.size, l.qty + 1)}
                              aria-label="Increase quantity"
                              className="text-white/70 hover:text-white"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="font-display font-bold text-white">${l.product.price * l.qty}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <footer className="border-t border-white/10 px-6 py-5">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-white/60">
                    <span>Subtotal</span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                  </div>
                  <div className="flex justify-between pt-2 text-base font-bold text-white">
                    <span>Total</span>
                    <span className="text-crimson-400">${total}</span>
                  </div>
                </div>
                <button
                  onClick={() => alert('Checkout is a demo — no payment is processed.')}
                  className="mt-5 w-full rounded-full bg-white py-4 font-display text-sm font-bold uppercase tracking-widest text-black transition-all hover:bg-crimson-500 hover:text-white"
                >
                  Checkout
                </button>
                <p className="mt-3 text-center text-[11px] text-white/30">
                  Free shipping on orders over $150
                </p>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
