import React from 'react'
import { motion } from 'framer-motion'
import { Brain, Users, Activity } from 'lucide-react'

export default function FloatingUI() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <HoloCard
        className="left-[6%] top-[18%]"
        icon={<Brain className="w-5 h-5 text-cyan-300"/>}
        title="Adaptive Pathways"
        subtitle="AI-curated content"
        stats={[{ label: 'Relevance', value: '98%' }, { label: 'Engagement', value: '4.8' }]}
        delay={0.4}
      />
      <HoloCard
        className="right-[10%] top-[28%]"
        icon={<Users className="w-5 h-5 text-violet-300"/>}
        title="Collaborative Pods"
        subtitle="Mentors + peers"
        stats={[{ label: 'Active', value: '128' }, { label: 'Sessions', value: '342' }]}
        delay={0.8}
      />
      <HoloCard
        className="left-[14%] bottom-[18%]"
        icon={<Activity className="w-5 h-5 text-rose-200"/>}
        title="Skills Intelligence"
        subtitle="Real-time proficiency"
        stats={[{ label: 'Roles', value: '64' }, { label: 'Skills', value: '1,240' }]}
        delay={1.1}
      />

      <Connections />
    </div>
  )
}

function HoloCard({ className = '', icon, title, subtitle, stats = [], delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.8, ease: 'easeOut' }}
      className={`absolute pointer-events-none ${className}`}
    >
      <motion.div
        className="backdrop-blur-xl pointer-events-auto select-none rounded-xl border border-cyan-400/20 bg-white/5 shadow-[0_0_30px_rgba(0,229,255,0.12)] ring-1 ring-white/10"
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
          boxShadow:
            '0 0 60px rgba(0, 229, 255, 0.12), inset 0 0 40px rgba(158, 123, 255, 0.06)'
        }}
      >
        <div className="p-4 w-72">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-cyan-400/10 ring-1 ring-cyan-300/30">
              {icon}
            </div>
            <div>
              <div className="text-sm uppercase tracking-widest text-cyan-200/80">Cortex LXP</div>
            </div>
          </div>
          <div className="mt-2">
            <div className="text-base font-medium text-white/90">{title}</div>
            <div className="text-sm text-white/60">{subtitle}</div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {stats.map((s, i) => (
              <div key={i} className="rounded-lg border border-white/10 bg-white/5 p-2">
                <div className="text-[10px] tracking-wide uppercase text-white/50">{s.label}</div>
                <div className="text-sm font-semibold text-white/90">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-4 pb-4">
          <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-cyan-300/20 via-violet-300/30 to-rose-200/20"/>
        </div>
      </motion.div>
    </motion.div>
  )
}

function Connections() {
  const lines = [
    { from: ["6%", "18%"], to: ["10%", "82%"], delay: 0.6 },
    { from: ["82%", "28%"], to: ["10%", "82%"], delay: 0.9 },
    { from: ["82%", "28%"], to: ["6%", "18%"], delay: 1.1 },
  ]
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="conn" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#00E5FF" stopOpacity="0" />
          <stop offset="50%" stopColor="#00E5FF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#9E7BFF" stopOpacity="0" />
        </linearGradient>
        <filter id="g">
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
      </defs>
      {lines.map((l, i) => {
        const [x1p, y1p] = l.from
        const [x2p, y2p] = l.to
        const x1 = parseFloat(x1p) / 1
        const y1 = parseFloat(y1p) / 1
        const x2 = parseFloat(x2p) / 1
        const y2 = parseFloat(y2p) / 1
        const d = `M ${x1} ${y1} Q ${(x1 + x2) / 2} ${(y1 + y2) / 2 - 8}, ${x2} ${y2}`
        return (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="url(#conn)"
            strokeWidth="0.5"
            filter="url(#g)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3.2, delay: l.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        )
      })}
    </svg>
  )
}
