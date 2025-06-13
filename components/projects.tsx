"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { LucideArrowRight, LucideDatabase, LucideShield, LucideGithub, LucideExternalLink } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })
  const [activeProject, setActiveProject] = useState(0)

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

      // Animate the project cards
      gsap.fromTo(
        ".project-card",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-container",
            start: "top 80%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const projects = [
    {
      title: "ThreatTrack",
      subtitle: "Cyber Threat Intelligence Platform",
      description:
        "Built a full-stack application that uses Neo4j to map and analyze relationships between IP addresses, malware signatures, and attack vectors. Integrated REST APIs to ingest threat feeds and visualize connections via an Angular dashboard.",
      image: "/placeholder.svg?height=600&width=800",
      tech: ["Java (Spring Boot)", "Angular", "Neo4j", "REST APIs", "JWT Auth"],
      icon: <LucideDatabase className="h-6 w-6" />,
      date: "April 2024",
    },
    {
      title: "SecureVault",
      subtitle: "Encrypted Document Management System",
      description:
        "Developed a secure document upload and storage system with role-based access control and AES-256 encryption. Backend validates user permissions and logs every access event for audit purposes.",
      image: "/placeholder.svg?height=600&width=800",
      tech: ["Java (Spring Security)", "Angular", "PostgreSQL", "JPA", "Keycloak"],
      icon: <LucideShield className="h-6 w-6" />,
      date: "September 2024",
    },
  ]

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
    <section ref={sectionRef} id="projects" className="section relative bg-[#0a0a0a] px-6 py-24 md:px-12 md:py-32">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=500')] bg-repeat opacity-5" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16">
          <h2 className="relative mb-4 inline-block font-grotesque text-4xl font-bold text-white md:text-5xl">
            Projects
            <span className="heading-line absolute -bottom-2 left-0 h-1 bg-[#f7ab0a]" />
          </h2>
          <p className="max-w-2xl text-lg text-white/70">A showcase of my technical projects and creative solutions.</p>
        </div>

        <div className="projects-container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="project-card group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <span className="mb-2 inline-block rounded-full border border-[#f7ab0a]/30 bg-[#0a0a0a]/80 px-3 py-1 text-xs text-[#f7ab0a]">
                      {project.date}
                    </span>
                    <h3 className="font-grotesque text-2xl font-bold text-white">{project.title}</h3>
                    <p className="text-white/70">{project.subtitle}</p>
                  </div>
                </div>

                <div className="p-6">
                  <p className="mb-6 text-white/80">{project.description}</p>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                      <a
                        href="#"
                        className="hover-target flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-white/30 hover:text-white"
                      >
                        <LucideGithub className="h-5 w-5" />
                      </a>
                      <a
                        href="#"
                        className="hover-target flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-white/30 hover:text-white"
                      >
                        <LucideExternalLink className="h-5 w-5" />
                      </a>
                    </div>

                    <a
                      href="#"
                      className="hover-target group flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-[#f7ab0a]"
                    >
                      View details
                      <LucideArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
