import React from 'react'
import { motion } from 'framer-motion'

export default function Tagline() {
  return (
    <div className="absolute inset-0 flex items-center">
      <div className="px-8 md:px-16 lg:px-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-white/5 px-3 py-1.5 text-xs tracking-wider uppercase text-cyan-200/80 ring-1 ring-white/10">
            Cortex LXP • AI-Powered Learning Experience
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 via-violet-200 to-rose-200">
              Transforming Talent Through Continuous Learning.
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-4 text-white/80 text-base sm:text-lg max-w-3xl"
          >
            Personalized learning journeys for every role, at every level.
          </motion.p>

          <CtaButtons />
        </motion.div>
      </div>
    </div>
  )
}

function CtaButtons() {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <motion.a
        href="#"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium text-black bg-gradient-to-r from-cyan-300 to-violet-300 shadow-[0_0_30px_rgba(0,229,255,0.2)] hover:shadow-[0_0_50px_rgba(158,123,255,0.25)]"
      >
        Explore the Platform
      </motion.a>
      <motion.a
        href="#"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium text-cyan-200 border border-cyan-300/30 bg-white/5 hover:bg-white/10"
      >
        Watch Overview
      </motion.a>
    </div>
  )
}
