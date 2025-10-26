import React from 'react'
import BackgroundFX from './components/BackgroundFX'
import HeroScene from './components/HeroScene'
import FloatingUI from './components/FloatingUI'
import Tagline from './components/Tagline'

export default function App() {
  return (
    <div className="min-h-screen w-full bg-[radial-gradient(75%_100%_at_50%_0%,#0b1b2a_0%,#060b12_35%,#04070c_100%)] text-white overflow-hidden">
      <div className="relative mx-auto w-full max-w-[1920px] aspect-[16/9]">
        <BackgroundFX />
        <HeroScene />
        <FloatingUI />
        <Tagline />
      </div>
    </div>
  )
}
