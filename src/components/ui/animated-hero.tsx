import { useEffect, useMemo, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowDown, MessageCircle, PhoneCall } from "lucide-react"

import { Button } from "@/components/ui/button"

function KolamBloom({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 240 240"
      fill="none"
    >
      <g stroke="currentColor" strokeLinecap="round">
        <circle cx="120" cy="120" r="28" strokeWidth="2" />
        <circle cx="120" cy="120" r="68" strokeWidth="1.5" opacity=".65" />
        <path d="M120 15v210M15 120h210M45.75 45.75l148.5 148.5M194.25 45.75 45.75 194.25" strokeWidth="1.5" />
        <path d="M120 52c20 0 36 16 36 36s-16 32-36 32-36-12-36-32 16-36 36-36Zm0 136c-20 0-36-16-36-36s16-32 36-32 36 12 36 32-16 36-36 36ZM52 120c0-20 16-36 36-36s32 16 32 36-12 36-32 36-36-16-36-36Zm136 0c0 20-16 36-36 36s-32-16-32-36 12-36 32-36 36 16 36 36Z" strokeWidth="2" />
      </g>
      <g fill="currentColor">
        <circle cx="120" cy="15" r="3" />
        <circle cx="120" cy="225" r="3" />
        <circle cx="15" cy="120" r="3" />
        <circle cx="225" cy="120" r="3" />
      </g>
    </svg>
  )
}

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const titles = useMemo(
    () => [
      "since 1981.",
      "under one roof.",
      "for every home.",
      "close to home.",
    ],
    [],
  )

  useEffect(() => {
    if (prefersReducedMotion) return

    const timeoutId = window.setTimeout(() => {
      setTitleNumber((current) => (current + 1) % titles.length)
    }, 2600)

    return () => window.clearTimeout(timeoutId)
  }, [prefersReducedMotion, titleNumber, titles])

  return (
    <section
      id="home"
      className="relative isolate flex min-h-svh w-full items-center overflow-hidden bg-pearl-white px-5 pb-16 pt-32 sm:px-8 sm:pt-36 lg:pb-20 lg:pt-40"
    >
      <div className="hero-halo absolute inset-0 -z-20" />
      <div className="hero-grid absolute inset-0 -z-10 opacity-45 [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />

      <motion.div
        className="absolute -left-24 top-32 -z-10 size-64 text-rathna-blue/10 sm:-left-16 sm:size-80 lg:left-[4%] lg:top-[28%]"
        animate={prefersReducedMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 38, ease: "linear", repeat: Infinity }}
      >
        <KolamBloom className="size-full" />
      </motion.div>

      <motion.div
        className="absolute -right-24 bottom-12 -z-10 size-72 text-kolam-gold/20 sm:-right-12 sm:size-96 lg:right-[3%]"
        animate={prefersReducedMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 46, ease: "linear", repeat: Infinity }}
      >
        <KolamBloom className="size-full" />
      </motion.div>

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-rathna-blue/15 bg-sky-tint/75 px-3.5 py-2 font-body text-sm font-bold tracking-[0.04em] text-rathna-blue shadow-[0_8px_28px_rgba(30,79,163,0.08)] backdrop-blur-sm sm:text-base"
        >
          <span className="size-2 rounded-full bg-kolam-gold shadow-[0_0_0_4px_rgba(229,166,58,0.16)]" />
          வீட்டுக்கு எது வேணும்னாலும், ரத்னா தான்.
        </motion.div>

        <motion.h1
          aria-label="Your family's store, since 1981."
          className="max-w-5xl font-display text-[clamp(3.1rem,8.5vw,7rem)] font-semibold leading-[0.93] tracking-[-0.055em] text-deep-navy"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block">Your family&apos;s store,</span>
          <span
            aria-hidden="true"
            className="relative mt-2 flex h-[1.08em] w-full justify-center overflow-hidden text-rathna-blue sm:mt-3"
          >
            {titles.map((title, index) => (
              <motion.span
                key={title}
                className="absolute whitespace-nowrap font-semibold"
                initial={false}
                animate={
                  titleNumber === index
                    ? { opacity: 1, y: "0%" }
                    : {
                        opacity: 0,
                        y: titleNumber > index ? "-115%" : "115%",
                      }
                }
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 72, damping: 18 }
                }
              >
                {title}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        <motion.p
          className="mt-7 max-w-2xl font-body text-lg font-medium leading-relaxed tracking-[-0.01em] text-deep-navy/72 sm:text-xl lg:text-[1.35rem]"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
        >
          Everything your home needs, from people you know. See it, touch it,
          and choose it with a family that has served Madurantakam for three
          generations.
        </motion.p>

        <motion.div
          className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.27, duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button asChild size="lg" className="w-full sm:w-auto">
            <a href="#contact">
              Call the store <PhoneCall />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full sm:w-auto"
          >
            <a href="#contact">
              WhatsApp us <MessageCircle />
            </a>
          </Button>
        </motion.div>

        <motion.div
          className="mt-11 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-body text-sm font-bold uppercase tracking-[0.12em] text-rathna-blue/75 sm:text-base"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.42, duration: 0.7 }}
        >
          <span>Since 1981</span>
          <span className="size-1 rounded-full bg-kolam-gold" />
          <span>3 generations</span>
          <span className="size-1 rounded-full bg-kolam-gold" />
          <span>2 branches</span>
        </motion.div>
      </div>

      <motion.a
        href="#why-rathna"
        aria-label="Scroll to learn why families choose Rathna"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 font-body text-xs font-bold uppercase tracking-[0.16em] text-rathna-blue/55 md:flex"
        animate={prefersReducedMotion ? undefined : { y: [0, 5, 0] }}
        transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
      >
        Explore
        <ArrowDown className="size-4" />
      </motion.a>
    </section>
  )
}

export { Hero }
