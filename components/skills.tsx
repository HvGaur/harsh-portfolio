"use client"

import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

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

      // Animate the skill bars
      gsap.fromTo(
        ".skill-progress",
        { width: 0 },
        {
          width: "var(--progress)",
          duration: 1.5,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".skills-container",
            start: "top 80%",
          },
        },
      )

      // Animate the skill categories
      gsap.fromTo(
        ".skill-category",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skills-container",
            start: "top 80%",
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
        staggerChildren: 0.1,
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

  const skillCategories = [
    {
      name: "Development Languages",
      skills: [
        { name: "Java", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "Python", level: 75 },
        { name: "JavaScript", level: 85 },
      ],
    },
    {
      name: "Frameworks & Libraries",
      skills: [
        { name: "Spring Boot", level: 85 },
        { name: "Angular", level: 80 },
        { name: "React", level: 75 },
        { name: "Next.js", level: 90 },
      ],
    },
    {
      name: "Tools & Technologies",
      skills: [
        { name: "Git", level: 90 },
        { name: "IntelliJ", level: 85 },
        { name: "Figma", level: 95 },
        { name: "Visual Studio", level: 90 },
      ],
    },
    {
      name: "Databases & Cloud",
      skills: [
        { name: "PostgreSQL", level: 80 },
        { name: "Neo4j", level: 70 },
        { name: "JPA", level: 85 }
      ],
    },
  ]

  return (
    <section ref={sectionRef} id="skills" className="section relative bg-[#0a0a0a] px-6 py-24 md:px-12 md:py-32">
      <div className="absolute inset-0 z-0">
        <div className="grid h-full w-full grid-cols-1 opacity-10 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border-r border-white/10" />
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16">
          <h2 className="relative mb-4 inline-block font-grotesque text-4xl font-bold text-white md:text-5xl">
            Skills
            <span className="heading-line absolute -bottom-2 left-0 h-1 bg-[#f7ab0a]" />
          </h2>
          <p className="max-w-2xl text-lg text-white/70">
            My technical expertise and proficiency in various technologies.
          </p>
        </div>

        <div className="skills-container">
          <motion.div
            className="grid gap-8 md:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                className="skill-category rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                variants={itemVariants}
              >
                <h3 className="mb-6 font-grotesque text-xl font-bold text-white">{category.name}</h3>

                <div className="space-y-6">
                  {category.skills.map((skill, i) => (
                    <div key={i}>
                      <div className="mb-2 flex justify-between">
                        <span className="font-medium text-white">{skill.name}</span>
                        <span className="text-sm text-white/70">{skill.level}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className="skill-progress h-full rounded-full bg-gradient-to-r from-[#f7ab0a] to-[#f7ab0a]/70"
                          style={{ "--progress": `${skill.level}%` } as any}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
