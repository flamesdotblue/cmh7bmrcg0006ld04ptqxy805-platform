import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function HeroScene() {
  return (
    <div className="absolute inset-0">
      <NeuralCanvas />
      <SilhouetteOverlay />
    </div>
  )
}

function NeuralCanvas() {
  const canvasRef = useRef(null)
  const raf = useRef(null)
  const nodesRef = useRef([])
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
      const cols = 24
      const rows = 12
      const spacingX = width / (cols + 1)
      const spacingY = height / (rows + 1)
      const nodes = []
      for (let y = 1; y <= rows; y++) {
        for (let x = 1; x <= cols; x++) {
          const px = spacingX * x + (Math.random() - 0.5) * 20
          const py = spacingY * y + (Math.random() - 0.5) * 20
          nodes.push({
            x: px,
            y: py,
            ox: px,
            oy: py,
            t: Math.random() * 1000,
            hue: 190 + (x / cols) * 60 + (y / rows) * 20,
          })
        }
      }
      nodesRef.current = nodes
    }

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height)

      // soft glow backdrop
      const lg = ctx.createLinearGradient(0, 0, width, height)
      lg.addColorStop(0, 'rgba(0, 229, 255, 0.05)')
      lg.addColorStop(1, 'rgba(158, 123, 255, 0.05)')
      ctx.fillStyle = lg
      ctx.fillRect(0, 0, width, height)

      // animate node positions (organic hand-drawn-like drift)
      for (const n of nodesRef.current) {
        n.t += 0.005
        const ax = Math.sin(n.t * 1.3) * 12
        const ay = Math.cos(n.t * 1.1) * 12
        n.x = n.ox + ax
        n.y = n.oy + ay
      }

      // draw connections with parallax emphasis
      ctx.lineWidth = 1.25
      for (let i = 0; i < nodesRef.current.length; i++) {
        const a = nodesRef.current[i]
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const b = nodesRef.current[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < 180 * 180) {
            const alpha = 0.08 * (1 - Math.sqrt(d2) / 180)
            ctx.strokeStyle = `hsla(${(a.hue + b.hue) * 0.5}, 80%, 60%, ${alpha})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            // subtle bezier for grace
            const cx = (a.x + b.x) / 2 + Math.sin(time * 0.0006 + i) * 10
            const cy = (a.y + b.y) / 2 + Math.cos(time * 0.0007 + j) * 10
            ctx.quadraticCurveTo(cx, cy, b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // nodes themselves
      for (const n of nodesRef.current) {
        ctx.fillStyle = `hsla(${n.hue}, 90%, 65%, 0.9)`
        ctx.shadowColor = `hsla(${n.hue}, 90%, 65%, 0.8)`
        ctx.shadowBlur = 8
        ctx.beginPath()
        ctx.arc(n.x, n.y, 2.2, 0, Math.PI * 2)
        ctx.fill()
      }

      raf.current = requestAnimationFrame(draw)
    }

    const ro = new ResizeObserver(() => { resize(); init() })
    ro.observe(canvas)
    resize(); init(); draw(0)
    return () => { cancelAnimationFrame(raf.current); ro.disconnect() }
  }, [DPR])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70"/>
}

function SilhouetteOverlay() {
  return (
    <div className="absolute inset-0">
      <motion.svg
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] max-w-[1400px]"
        viewBox="0 0 1400 450"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1.2 }}
        aria-hidden
      >
        <defs>
          <linearGradient id="silGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#00E5FF"/>
            <stop offset="50%" stopColor="#9E7BFF"/>
            <stop offset="100%" stopColor="#FFB088"/>
          </linearGradient>
          <filter id="silGlow">
            <feGaussianBlur stdDeviation="2" result="b"/>
            <feMerge>
              <feMergeNode in="b"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {silhouettePaths.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="url(#silGrad)"
            strokeWidth={2}
            filter="url(#silGlow)"
            strokeLinecap="round"
            style={{ mixBlendMode: 'screen' }}
            initial={{ pathLength: 0, opacity: 0.0 }}
            animate={{ pathLength: 1, opacity: [0.2, 0.8, 0.6] }}
            transition={{ duration: 2 + i * 0.6, ease: 'easeInOut' }}
          />
        ))}
      </motion.svg>
    </div>
  )
}

const silhouettePaths = [
  // abstract human outlines (group of learners)
  'M100 420 C130 360, 160 330, 210 330 C260 330, 290 360, 320 420',
  'M210 330 C210 300, 230 270, 260 270 C290 270, 310 300, 310 330',
  'M380 420 C410 360, 460 340, 520 345 C580 350, 620 380, 650 420',
  'M520 345 C520 305, 545 270, 585 270 C625 270, 645 305, 645 345',
  'M740 420 C770 360, 820 340, 880 345 C940 350, 980 380, 1010 420',
  'M880 345 C880 305, 905 270, 945 270 C985 270, 1005 305, 1005 345',
  'M1080 420 C1110 360, 1140 330, 1190 330 C1240 330, 1270 360, 1300 420',
  'M1190 330 C1190 300, 1210 270, 1240 270 C1270 270, 1290 300, 1290 330'
]
