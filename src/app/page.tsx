import Navigation from '@/components/Navigation'
import ScrollSequenceHero from '@/components/ScrollSequenceHero'
import {
  Marquee,
  FeaturedCollection,
  CategoryRail,
  StorySection,
  Features,
  Newsletter,
  Footer,
} from '@/components/Shared'

export default function Home() {
  return (
    <main className="min-h-screen bg-obsidian-950">
      <Navigation />
      <ScrollSequenceHero />
      <Marquee />
      <FeaturedCollection />
      <CategoryRail />
      <StorySection />
      <Features />
      <Newsletter />
      <Footer />
    </main>
  )
}
