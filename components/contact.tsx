"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { LucideMail, LucideLinkedin, LucideGithub } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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

      // Animate the contact form and info
      gsap.fromTo(
        ".contact-content > div",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.3,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-content",
            start: "top 80%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({ name: "", email: "", message: "" })

      // Reset submission status after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 3000)
    }, 1500)
  }

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
    <section ref={sectionRef} id="contact" className="section relative bg-[#0a0a0a] px-6 py-24 md:px-12 md:py-32">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16">
          <h2 className="relative mb-4 inline-block font-grotesque text-4xl font-bold text-white md:text-5xl">
            Get In Touch
            <span className="heading-line absolute -bottom-2 left-0 h-1 bg-[#f7ab0a]" />
          </h2>
          <p className="max-w-2xl text-lg text-white/70">
            Have a project in mind or want to collaborate? Feel free to reach out.
          </p>
        </div>

        <div className="contact-content grid gap-12 md:grid-cols-2">
          <div>
            <motion.div
              className="space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.div variants={itemVariants}>
                <h3 className="mb-4 font-grotesque text-2xl font-bold text-white">Contact Information</h3>
                <p className="text-white/70">
                  Feel free to reach out through any of the following channels. I'm always open to discussing new
                  projects, creative ideas, or opportunities to be part of your vision.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5">
                  <LucideMail className="h-5 w-5 text-[#f7ab0a]" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white/50">Email</h4>
                  <a
                    href="mailto:harshvardhangaur11@gmail.com"
                    className="hover-target text-lg font-medium text-white hover:text-[#f7ab0a]"
                  >
                    harshvardhangaur11@gmail.com
                  </a>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5">
                  <LucideLinkedin className="h-5 w-5 text-[#f7ab0a]" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white/50">LinkedIn</h4>
                  <a
                    href="https://linkedin.com/in/harshvardhangaur11"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover-target text-lg font-medium text-white hover:text-[#f7ab0a]"
                  >
                    linkedin.com/in/harshvardhangaur11
                  </a>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5">
                  <LucideGithub className="h-5 w-5 text-[#f7ab0a]" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white/50">GitHub</h4>
                  <a
                    href="https://github.com/hvgaur"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover-target text-lg font-medium text-white hover:text-[#f7ab0a]"
                  >
                    github.com/hvgaur
                  </a>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="mb-4 font-grotesque text-2xl font-bold text-white">Location</h3>
                <p className="text-white/70">Bengaluru, Karnataka, India</p>
              </motion.div>
            </motion.div>
          </div>

          <div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8">
              <h3 className="mb-6 font-grotesque text-2xl font-bold text-white">Send Me a Message</h3>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-white/70">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="hover-target w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-colors focus:border-[#f7ab0a]/50"
                    placeholder="Your name"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/70">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="hover-target w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-colors focus:border-[#f7ab0a]/50"
                    placeholder="Your email"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-white/70">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="hover-target w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-colors focus:border-[#f7ab0a]/50"
                    placeholder="Your message"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="hover-target group relative inline-flex w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-[#f7ab0a] to-[#f7ab0a]/80 px-6 py-3 text-center font-medium text-white shadow-lg transition-all hover:from-[#f7ab0a]/90 hover:to-[#f7ab0a]/70 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Sending..." : isSubmitted ? "Message Sent!" : "Send Message"}
                  <span className="absolute inset-0 -z-10 h-full w-full translate-y-full bg-black/10 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100" />
                </button>
              </form>

              {isSubmitted && (
                <div className="mt-4 rounded-lg bg-green-500/10 p-4 text-center text-green-500">
                  Thank you for your message! I'll get back to you soon.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
