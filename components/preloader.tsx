"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the letters
      gsap.fromTo(
        ".letter",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
        },
      )

      // Animate the progress bar
      gsap.fromTo(
        ".progress-bar",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power2.inOut",
        },
      )
    }, preloaderRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={preloaderRef} className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a]">
      <div ref={textRef} className="mb-8 flex items-center justify-center">
        {["H", "E", "L", "L", "O"].map((letter, index) => (
          <span key={index} className="letter font-grotesque text-6xl font-bold text-white">
            {letter}
          </span>
        ))}
      </div>
      <div className="h-0.5 w-48 overflow-hidden bg-gray-800">
        <div className="progress-bar h-full w-full origin-left bg-white" />
      </div>
    </div>
  )
}
