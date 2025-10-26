import React, { useEffect, useRef } from 'react'
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion'

export default function BackgroundFX() {
  const gradientRef = useRef(null)
  const controls = useAnimation()

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useTransform(my, [-1, 1], [8, -8])
  const rotateY = useTransform(mx, [-1, 1], [-8, 8])

  useEffect(() => {
    const handler = (e) => {
      const rect = gradientRef.current?.getBoundingClientRect()
      if (!rect) return
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      mx.set(x * 2 - 1)
      my.set(y * 2 - 1)
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [mx, my])

  useEffect(() => {
    controls.start({
      background:
        [
          'radial-gradient(1200px 800px at 20% 20%, rgba(28,140,255,0.18), transparent 60%), radial-gradient(900px 900px at 80% 60%, rgba(170,120,255,0.14), transparent 60%), radial-gradient(700px 500px at 50% 90%, rgba(255,160,120,0.08), transparent 60%)',
          'radial-gradient(1200px 800px at 30% 25%, rgba(28,190,255,0.18), transparent 60%), radial-gradient(900px 900px at 70% 55%, rgba(140,100,255,0.16), transparent 60%), radial-gradient(700px 500px at 45% 85%, rgba(255,180,140,0.10), transparent 60%)',
          'radial-gradient(1200px 800px at 25% 30%, rgba(28,160,255,0.18), transparent 60%), radial-gradient(900px 900px at 75% 65%, rgba(160,120,255,0.16), transparent 60%), radial-gradient(700px 500px at 55% 80%, rgba(255,170,120,0.10), transparent 60%)'
        ],
      transition: { duration: 12, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
    })
  }, [controls])

  return (
    <motion.div
      ref={gradientRef}
      className="absolute inset-0"
      style={{ perspective: 800, rotateX, rotateY }}
    >
      <motion.div
        className="absolute inset-0"
        animate={controls}
      />

      <Particles />

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1920 1080" aria-hidden>
        <defs>
          <linearGradient id="energy" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.0" />
            <stop offset="30%" stopColor="#00E5FF" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#9E7BFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FFB088" stopOpacity="0.0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.path
            key={i}
            d={makeCurvyPath(i)}
            fill="none"
            stroke="url(#energy)"
            strokeWidth="2"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0.5 }}
            animate={{ pathLength: 1, opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </svg>
    </motion.div>
  )
}

function makeCurvyPath(i) {
  const y = 150 + i * 140
  const variance = (i % 2 === 0) ? 120 : -120
  return `M 0 ${y} C 480 ${y + variance}, 960 ${y - variance}, 1440 ${y + variance} S 1920 ${y}, 1920 ${y}`
}

function Particles() {
  const canvasRef = useRef(null)
  const raf = useRef(null)
  const particlesRef = useRef([])
  const DPR = Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio : 1)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    let width = canvas.clientWidth
    let height = canvas.clientHeight

    const resize = () => {
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.floor(width * DPR)
      canvas.height = Math.floor(height * DPR)
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }

    const init = () => {
      particlesRef.current = Array.from({ length: 220 }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.3,
        hue: 190 + Math.random() * 80,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // soft background vignette
      const g = ctx.createRadialGradient(width * 0.5, height * 0.5, 100, width * 0.5, height * 0.5, Math.max(width, height) * 0.7)
      g.addColorStop(0, 'rgba(0,0,0,0)')
      g.addColorStop(1, 'rgba(0,0,0,0.25)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, width, height)

      // connect nearby particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i]
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const q = particlesRef.current[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const d2 = dx * dx + dy * dy
          if (d2 < 130 * 130) {
            const alpha = 0.08 * (1 - Math.sqrt(d2) / 130)
            ctx.strokeStyle = `hsla(${(p.hue + q.hue) * 0.5}, 90%, 60%, ${alpha})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        }
      }

      // draw particles
      for (const p of particlesRef.current) {
        ctx.fillStyle = `hsla(${p.hue}, 90%, 70%, 0.9)`
        ctx.shadowColor = `hsla(${p.hue}, 90%, 70%, 0.6)`
        ctx.shadowBlur = 6
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
        p.x += p.vx
        p.y += p.vy
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height + 10
        if (p.y > height + 10) p.y = -10
      }

      raf.current = requestAnimationFrame(draw)
    }

    resize()
    init()
    draw()

    const ro = new ResizeObserver(() => {
      resize()
    })
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(raf.current)
      ro.disconnect()
    }
  }, [DPR])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"/>
}
