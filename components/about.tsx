"use client"

import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Animate the heading line
      gsap.fromTo(
        ".heading-line",
        { width: 0 },
        {
          width: "100%",
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      )

      // Animate the text blocks
      gsap.fromTo(
        ".text-block",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section ref={sectionRef} id="about" className="section relative bg-[#0a0a0a] px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <h2 className="relative mb-4 inline-block font-grotesque text-4xl font-bold text-white md:text-5xl">
            About Me
            <span className="heading-line absolute -bottom-2 left-0 h-1 bg-[#f7ab0a]" />
          </h2>
          <p className="text-block max-w-2xl text-lg text-white/70 font-mono">
          A wannabe Software Engineer.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <motion.div
              className="text-block space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.p variants={itemVariants} className="text-white/80">
                I did my B.E. in Electronics and Communications (yeah, i know) and I currently write my codes over at BT Group as an SWE Intern. cool stuff.
              </motion.p>
              <motion.p variants={itemVariants} className="text-white/80">
                I like working on new projects. I'd rather have people look at my horrible code than look at others'. I have excellent (lol) knowledge of Java, Spring boot and Angular. And I have a good eye for design so that helps.
              </motion.p>
              <motion.p variants={itemVariants} className="text-white/80">
                I am a music and movies enthusiast too. and sports kinda altho I suck at most of them, except swimming and football.
              </motion.p>
            </motion.div>
          </div>

          <div>
            <motion.div
              className="grid grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.div
                variants={itemVariants}
                className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <h3 className="mb-2 font-grotesque text-xl font-bold text-white">Education</h3>
                <p className="text-white/70">B.E. in Electronics and Communications</p>
                <p className="text-white/70">CGPA: 8.2/10</p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <h3 className="mb-2 font-grotesque text-xl font-bold text-white">Experience</h3>
                <p className="text-white/70">Software Engineer Intern</p>
                <p className="text-white/70">Creative and Design Head</p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <h3 className="mb-2 font-grotesque text-xl font-bold text-white">Languages</h3>
                <p className="text-white/70">Java, TypeScript</p>
                <p className="text-white/70">Python, JavaScript</p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <h3 className="mb-2 font-grotesque text-xl font-bold text-white">Frameworks</h3>
                <p className="text-white/70">Spring Boot, Angular</p>
                <p className="text-white/70">React, Next.js</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
