"use client"

import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { LucideCode, LucideUsers } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  useEffect(() => {
    if (!sectionRef.current || !timelineRef.current) return

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

      // Animate the timeline line
      gsap.fromTo(
        ".timeline-line",
        { height: 0 },
        {
          height: "100%",
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
          },
        },
      )

      // Animate the timeline items
      gsap.fromTo(
        ".timeline-item",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.3,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timelineRef.current,
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

  const experiences = [
    {
      title: "Software Engineer Intern",
      company: "BT Group",
      period: "Jan 2025 - Present",
      description:
        "Developing and optimizing full-stack applications using Java (Spring Boot), Angular, PostgreSQL and neo4j, enhancing workflow management tools for enterprise use.",
      icon: <LucideCode className="h-6 w-6 text-[#f7ab0a]" />,
      highlights: [
        "Designing and implementing REST APIs, conducted unit and integration testing using JUnit and Mockito",
        "Spearheading the development of the SIMPLIFY Order Tracker under the SRIMS initiative",
        "Ensuring code quality through rigorous validation",
      ],
    },
    {
      title: "Creative and Design Head",
      company: "Google Developer Student Clubs",
      period: "July 2023 - Jan 2025",
      description:
        "Leading a team of 8 highly motivated individuals as the Creative and Design Head overseeing a community of over 200 students, mentoring members in design and development tools and data structures and algorithms (DSA).",
      icon: <LucideUsers className="h-6 w-6 text-[#f7ab0a]" />,
      highlights: [
        "Single-handedly led an event on social media and a treasure hunt, resulting in over 100 sign-ups in less than a week",
        "Successfully organized and conducted over 10 seminars on design and development",
        "Helped more than 500 students improve their skills",
      ],
    },
  ]

  return (
    <section ref={sectionRef} id="experience" className="section relative bg-[#0a0a0a] px-6 py-24 md:px-12 md:py-32">
      <div className="absolute inset-0 z-0">
        <div className="grid h-full w-full grid-cols-1 opacity-10 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border-r border-white/10" />
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16">
          <h2 className="relative mb-4 inline-block font-grotesque text-4xl font-bold text-white md:text-5xl">
            Experience
            <span className="heading-line absolute -bottom-2 left-0 h-1 bg-[#f7ab0a]" />
          </h2>
          <p className="max-w-2xl text-lg text-white/70">
            My professional journey and the roles that have shaped my career.
          </p>
        </div>

        <div ref={timelineRef} className="relative pl-8">
          <div className="timeline-line absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-[#f7ab0a] to-[#f7ab0a]/30" />

          <motion.div
            className="space-y-16"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {experiences.map((exp, index) => (
              <motion.div key={index} className="timeline-item relative" variants={itemVariants}>
                <div className="absolute -left-12 flex h-8 w-8 items-center justify-center rounded-full border border-[#f7ab0a]/30 bg-[#0a0a0a]">
                  {exp.icon}
                </div>

                <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8">
                  <div className="mb-4 flex flex-col justify-between gap-2 md:flex-row md:items-center">
                    <div>
                      <h3 className="font-grotesque text-2xl font-bold text-white">{exp.title}</h3>
                      <p className="text-lg text-[#f7ab0a]">{exp.company}</p>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-white/70">
                      {exp.period}
                    </span>
                  </div>

                  <p className="mb-6 text-white/80">{exp.description}</p>

                  <div className="space-y-2">
                    <h4 className="font-grotesque text-lg font-semibold text-white">Key Accomplishments:</h4>
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2 text-white/70">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#f7ab0a]" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
