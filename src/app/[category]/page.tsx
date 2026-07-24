import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import { CategorySection, Footer } from '@/components/Shared'
import { CATEGORIES, getProductsByCategory, type CategoryKey } from '@/lib/products'

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.key }))
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const cat = CATEGORIES.find((c) => c.key === params.category)
  if (!cat) return { title: 'Not found — NIKE' }
  return {
    title: `${cat.name} — NIKE Air Jordan Launch 2026`,
    description: `${cat.blurb}. Shop premium Nike ${cat.name.toLowerCase()} footwear.`,
  }
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const meta = CATEGORIES.find((c) => c.key === params.category)
  if (!meta) notFound()

  const products = getProductsByCategory(params.category as CategoryKey)

  return (
    <main className="min-h-screen bg-obsidian-950 pt-20">
      <Navigation />
      <CategorySection title={meta.name} products={products} />
      <Footer />
    </main>
  )
}
