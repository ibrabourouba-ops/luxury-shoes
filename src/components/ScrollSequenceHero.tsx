'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  MotionValue,
} from 'motion/react'

/* ------------------------------------------------------------------ *
 * Scroll-scrubbed image-sequence hero.
 * The user's 6s / 24fps clip was pre-decoded to 144 WebP frames
 * (public/hero/frame-001.webp …). We draw the frame that matches the
 * scroll position onto a <canvas>. No <video> seeking => zero stutter.
 * ------------------------------------------------------------------ */

const FRAME_COUNT = 144
const FRAME_W = 1280
const FRAME_H = 720
const framePath = (i: number) => `/hero/frame-${String(i + 1).padStart(3, '0')}.webp`

const STATS = [
  { value: '1985', label: 'First flight' },
  { value: '23', label: 'Titles of style' },
  { value: '∞', label: 'Icon status' },
]

function LaunchRail({ progress }: { progress: MotionValue<number> }) {
  const fill = useTransform(progress, [0, 1], ['0%', '100%'])
  const tickY = useTransform(progress, [0, 1], ['0%', '100%'])
  const label = useTransform(progress, (v) =>
    v > 0.92 ? 'LIFTOFF' : `T-${Math.max(0, Math.round((1 - v) * 10))}`,
  )
  return (
    <div className="pointer-events-none absolute left-6 top-1/2 z-30 hidden -translate-y-1/2 md:left-10 md:flex md:flex-col md:items-center md:gap-4">
      <span className="rotate-180 text-[10px] font-semibold uppercase tracking-[0.4em] text-white/40 [writing-mode:vertical-rl]">
        Launch sequence
      </span>
      <div className="relative h-40 w-px bg-white/15">
        <motion.div style={{ height: fill }} className="absolute left-0 top-0 w-px bg-crimson-400" />
        <motion.div
          style={{ top: tickY }}
          className="absolute left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson-400 shadow-[0_0_12px_2px_rgba(207,10,44,0.8)]"
        />
      </div>
      <motion.span className="font-display text-xs tracking-widest text-crimson-400">{label}</motion.span>
    </div>
  )
}

function Embers() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {Array.from({ length: 16 }).map((_, i) => (
        <span
          key={i}
          className="absolute block rounded-full bg-crimson-400/60"
          style={{
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            left: `${(i * 61) % 100}%`,
            bottom: '-10px',
            animation: `ember ${9 + (i % 6)}s linear ${i * 0.7}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

export default function ScrollSequenceHero() {
  const ref = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const currentFrame = useRef(-1)
  const rafRef = useRef<number | null>(null)
  const [ready, setReady] = useState(false)
  const [loaded, setLoaded] = useState(0)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 32, restDelta: 0.001 })

  // ---- draw helper (cover-fit, DPR-aware) ----
  const draw = (index: number) => {
    const canvas = canvasRef.current
    const img = imagesRef.current[index]
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const cw = canvas.width
    const ch = canvas.height
    const scale = Math.max(cw / FRAME_W, ch / FRAME_H)
    const dw = FRAME_W * scale
    const dh = FRAME_H * scale
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
  }

  const resize = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.floor(canvas.clientWidth * dpr)
    canvas.height = Math.floor(canvas.clientHeight * dpr)
    // redraw last frame after resize
    draw(currentFrame.current < 0 ? 0 : currentFrame.current)
  }

  // ---- preload frames ----
  useEffect(() => {
    let cancelled = false
    let count = 0
    const imgs: HTMLImageElement[] = new Array(FRAME_COUNT)
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image()
      img.decoding = 'async'
      img.src = framePath(i)
      img.onload = () => {
        if (cancelled) return
        count++
        setLoaded(count)
        if (i === 0) {
          resize()
          draw(0)
          currentFrame.current = 0
          setReady(true)
        }
      }
      imgs[i] = img
    }
    imagesRef.current = imgs
    window.addEventListener('resize', resize)
    return () => {
      cancelled = true
      window.removeEventListener('resize', resize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ---- scrub on scroll ----
  useMotionValueEvent(p, 'change', (v) => {
    const target = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(v * (FRAME_COUNT - 1))))
    if (target === currentFrame.current) return
    currentFrame.current = target
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => draw(target))
  })

  // ---- overlay transforms ----
  const aOpacity = useTransform(p, [0, 0.05, 0.28, 0.36], [0, 1, 1, 0])
  const aY = useTransform(p, [0, 0.36], [0, -60])
  const bOpacity = useTransform(p, [0.38, 0.46, 0.62, 0.7], [0, 1, 1, 0])
  const bY = useTransform(p, [0.38, 0.7], [50, -50])
  const cOpacity = useTransform(p, [0.78, 0.88, 1], [0, 1, 1])
  const cScale = useTransform(p, [0.78, 1], [0.7, 1])
  const darken = useTransform(p, [0.7, 0.92], [0, 0.55])
  const darkenBg = useTransform(darken, (o) => `rgba(5,5,6,${o})`)
  const cueOpacity = useTransform(p, [0, 0.06], [1, 0])

  return (
    <section ref={ref} className="relative h-[360vh] bg-obsidian-950">
      <div className="grain sticky top-0 h-screen w-full overflow-hidden">
        {/* Base + frame canvas */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_60%_35%,#160406_0%,#050506_65%)]" />
        <canvas ref={canvasRef} className="absolute inset-0 z-[5] h-full w-full" />

        {/* Loading shimmer until first frame is ready */}
        {!ready && (
          <div className="absolute inset-0 z-[6] flex items-center justify-center bg-obsidian-950">
            <div className="flex flex-col items-center gap-4">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/15 border-t-crimson-500" />
              <span className="text-xs uppercase tracking-[0.4em] text-white/40">Loading the drop</span>
            </div>
          </div>
        )}

        {/* Vignette + edge fades */}
        <div className="pointer-events-none absolute inset-0 z-[15] bg-[radial-gradient(ellipse_90%_70%_at_60%_45%,transparent_35%,rgba(5,5,6,0.7)_100%)]" />
        <div className="pointer-events-none absolute inset-0 z-[15] bg-gradient-to-r from-obsidian-950 via-obsidian-950/20 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-48 bg-gradient-to-t from-obsidian-950 to-transparent" />
        <motion.div style={{ background: darkenBg }} className="pointer-events-none absolute inset-0 z-[16]" />

        <Embers />
        <LaunchRail progress={p} />

        {/* ---------- Text stage ---------- */}
        <div className="absolute inset-0 z-30 flex flex-col justify-center px-8 md:px-24">
          {/* Phase A */}
          <motion.div style={{ opacity: aOpacity, y: aY }} className="max-w-3xl">
            <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-crimson-400">
              <span className="h-px w-10 bg-crimson-400" /> Nike · Launch 2026
            </p>
            <h1 className="font-display text-[clamp(3.5rem,11vw,10rem)] uppercase leading-[0.86] text-white">
              Defy the
              <br />
              <span className="ember-text">ordinary</span>
            </h1>
            <p className="mt-6 max-w-md text-base text-white/60 md:text-lg">
              Scroll to run the launch sequence — frame by frame, all the way to liftoff.
            </p>
          </motion.div>

          {/* Phase B */}
          <motion.div style={{ opacity: bOpacity, y: bY }} className="absolute inset-x-8 max-w-3xl md:inset-x-24">
            <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] uppercase leading-[0.9] text-white">
              Engineered
              <br />
              for <span className="ember-text">legends</span>
            </h2>
            <div className="mt-10 flex gap-10 md:gap-16">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-4xl text-white md:text-6xl">{s.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.25em] text-white/45">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Phase C — NIKE finale */}
          <motion.div
            style={{ opacity: cOpacity, scale: cScale }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center"
          >
            <h2
              className="font-display text-[clamp(5rem,26vw,22rem)] uppercase leading-[0.8] text-white"
              style={{
                backgroundImage: 'linear-gradient(135deg,#ffffff 0%,#ff5c73 40%,#cf0a2c 75%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 12px 60px rgba(207,10,44,0.5))',
              }}
            >
              NIKE
            </h2>
            <p className="-mt-2 text-sm font-semibold uppercase tracking-[0.6em] text-white/70 md:text-base">
              Just Do It
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/new"
                className="rounded-full bg-white px-10 py-4 font-display text-sm uppercase tracking-widest text-black transition-all hover:bg-crimson-500 hover:text-white"
              >
                Shop the drop
              </Link>
              <a
                href="#collection"
                className="rounded-full border border-white/30 px-10 py-4 font-display text-sm uppercase tracking-widest text-white transition-all hover:border-white hover:bg-white/10"
              >
                Explore collection
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/40">Scroll</span>
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/25 p-1">
            <motion.span
              className="h-2 w-1 rounded-full bg-crimson-400"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
        </motion.div>
      </div>
    </section>
  )
}
