import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-obsidian-950 px-6 text-center">
      <p className="font-display text-[24vw] leading-none text-outline">404</p>
      <h1 className="mt-2 font-display text-3xl uppercase tracking-tight text-white">Off the map</h1>
      <p className="mt-3 max-w-sm text-white/50">
        This drop doesn&apos;t exist — or it sold out and left no trace. Let&apos;s get you back to the launch.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-white px-10 py-4 font-display text-sm uppercase tracking-widest text-black transition-all hover:bg-crimson-500 hover:text-white"
      >
        Back home
      </Link>
    </main>
  )
}
