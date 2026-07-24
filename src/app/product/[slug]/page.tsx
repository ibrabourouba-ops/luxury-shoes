import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import ProductDetail from '@/components/ProductDetail'
import { ProductCard, Footer, SectionHeading } from '@/components/Shared'
import { PRODUCTS, getProductBySlug, getRelatedProducts } from '@/lib/products'

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug)
  if (!product) return { title: 'Not found — NIKE' }
  return {
    title: `${product.name} — NIKE`,
    description: product.description,
  }
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()

  const related = getRelatedProducts(product)

  return (
    <main className="min-h-screen bg-obsidian-950 pt-20">
      <Navigation />
      <ProductDetail product={product} />

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeading align="left" eyebrow="You may also like" title="Related drops" />
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
