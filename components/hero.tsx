"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the heading characters
      const chars = gsap.utils.toArray(".char")
      gsap.fromTo(
        chars,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.03,
          duration: 1,
          ease: "power4.out",
          delay: 0.5,
        },
      )

      // Parallax effect on scroll
      gsap.to(".parallax", {
        y: "-30%",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })

      // Image reveal animation
      gsap.fromTo(
        imageRef.current,
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.5,
          ease: "power3.out",
          delay: 0.8,
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="section relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0a] px-4 pt-20 md:px-8"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/0 via-[#0a0a0a]/50 to-[#0a0a0a]" />
        <div className="grid h-full w-full grid-cols-8 opacity-20">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="border-r border-white/10" />
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:gap-20">
        <div className="flex flex-col justify-center">
          <motion.p
            className="mb-4 font-grotesque text-lg font-medium text-[#f7ab0a]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Hello, I'm
          </motion.p>
          <h1 ref={headingRef} className="mb-6 font-grotesque text-5xl font-bold leading-tight text-white md:text-7xl">
            {/* {"Harsh Vardhan Gaur".split("").map((char, index) => (
              <span key={index} className="char inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))} */}
            <div className="mb-2">
              {"Harsh Vardhan".split("").map((char, index) => (
                <span key={`first-${index}`} className="char inline-block">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
            <div>
              {"Gaur".split("").map((char, index) => (
                <span key={`second-${index}`} className="char inline-block">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
          </h1>
          <motion.p
            className="mb-8 max-w-lg text-lg text-white/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            A Software Engineer with expertise in Java, Angular, and full-stack development. Creating innovative solutions
            with a passion for clean code and elegant design.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <a
              href="#contact"
              className="hover-target group relative inline-flex items-center overflow-hidden rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
            >
              <span className="relative z-10">Get in touch</span>
              <span className="absolute inset-0 -z-10 h-full w-full translate-y-full bg-gradient-to-r from-[#f7ab0a] to-[#f7ab0a]/80 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100" />
            </a>
            <a
              href="#projects"
              className="hover-target group relative inline-flex items-center overflow-hidden rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
            >
              <span className="relative z-10">View projects</span>
              <span className="absolute inset-0 -z-10 h-full w-full translate-y-full bg-gradient-to-r from-[#f7ab0a]/80 to-[#f7ab0a]/60 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100" />
            </a>
          </motion.div>
        </div>

        <div className="flex items-center justify-center">
          <div
            ref={imageRef}
            className="relative h-[400px] w-[300px] overflow-hidden rounded-xl md:h-[500px] md:w-[400px]"
          >
            <Image src="/profile.jpeg" alt="Harsh Vardhan Gaur" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-60" />
          </div>
        </div>
      </div>

      <div className="parallax absolute bottom-0 left-0 right-0 z-10 flex justify-center pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col items-center"
        >
          <span className="mb-2 text-sm text-white/50">Scroll down</span>
          <div className="h-16 w-0.5 overflow-hidden bg-white/20">
            <div className="h-full w-full animate-scroll-down bg-white" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
