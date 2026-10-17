import { useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import {
  BadgeIndianRupee,
  Boxes,
  HeartHandshake,
  History,
  LifeBuoy,
  UsersRound,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

type Reason = {
  title: string
  description: string
  Icon: LucideIcon
}

const reasons: Reason[] = [
  {
    title: "Three generations, since 1981",
    description:
      "We furnished Madurantakam homes in 1981. Today, we are furnishing their grandchildren's homes.",
    Icon: History,
  },
  {
    title: "People who know you",
    description:
      "The family is behind the counter, not a rotating sales team. We remember what your home needs.",
    Icon: UsersRound,
  },
  {
    title: "Everything under one roof",
    description:
      "TVs, appliances, furniture, mobiles, gifts and household essentials—all together, on one bill.",
    Icon: Boxes,
  },
  {
    title: "Honest advice",
    description:
      "We suggest what suits your space and budget, even when the right choice is the cheaper one.",
    Icon: HeartHandshake,
  },
  {
    title: "Clear prices, clear terms",
    description:
      "The price we quote is the price you pay, with warranty and EMI terms explained before you decide.",
    Icon: BadgeIndianRupee,
  },
  {
    title: "Here after the sale",
    description:
      "Two branches close to home and the same family for decades. You always know where to find us.",
    Icon: LifeBuoy,
  },
]

function WhyRathna() {
  const [activeIndex, setActiveIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([])
  const prefersReducedMotion = useReducedMotion()

  const selectReason = (index: number) => {
    setActiveIndex(index)

    window.requestAnimationFrame(() => {
      cardRefs.current[index]?.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "nearest",
        inline: "center",
      })
    })
  }

  return (
    <section
      id="why-rathna"
      className="relative overflow-hidden bg-sky-tint px-0 py-20 sm:py-24 lg:py-28"
    >
      <div className="absolute inset-0 opacity-45 [background-image:radial-gradient(circle_at_center,rgba(30,79,163,0.12)_1px,transparent_1.5px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="mx-auto max-w-3xl px-5 text-center sm:px-8"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-rathna-blue/15 bg-pearl-white/75 px-3.5 py-2 font-body text-sm font-bold uppercase tracking-[0.14em] text-rathna-blue backdrop-blur-sm">
            <span className="size-2 rounded-full bg-kolam-gold" />
            Why Rathna
          </div>
          <h2 className="font-display text-[clamp(2.45rem,5vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-deep-navy">
            Why Madurantakam families choose Rathna
          </h2>
          <p className="mx-auto mt-5 max-w-2xl font-body text-lg font-medium leading-relaxed text-deep-navy/70 sm:text-xl">
            For over four decades, families have trusted us with their homes.
            Here is why they keep coming back.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 sm:mt-16"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ delay: 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            ref={trackRef}
            className="hide-scrollbar flex snap-x snap-mandatory items-end gap-3 overflow-x-auto px-[max(1.25rem,calc((100vw-1180px)/2))] pb-4 sm:gap-4"
          >
            {reasons.map(({ title, description, Icon }, index) => {
              const isActive = activeIndex === index

              return (
                <article
                  key={title}
                  className={cn(
                    "group relative flex min-h-[260px] shrink-0 snap-center flex-col overflow-hidden rounded-[24px] border p-6 text-left outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-rathna-blue/25 sm:p-7",
                    isActive
                      ? "w-[78vw] max-w-[300px] border-rathna-blue bg-rathna-blue text-pearl-white shadow-[0_20px_55px_rgba(20,35,63,0.2)] min-[900px]:min-h-[294px] min-[900px]:w-[264px]"
                      : "w-[72vw] max-w-[260px] border-rathna-blue/10 bg-pearl-white/90 text-deep-navy shadow-[0_10px_30px_rgba(20,35,63,0.08)] hover:border-rathna-blue/25 hover:bg-pearl-white min-[900px]:w-[210px]",
                  )}
                >
                  <button
                    ref={(element) => {
                      cardRefs.current[index] = element
                    }}
                    type="button"
                    aria-label={`Show reason ${index + 1}: ${title}`}
                    aria-pressed={isActive}
                    className="absolute inset-0 z-20 rounded-[24px] outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-kolam-gold/75"
                    onClick={() => selectReason(index)}
                  />

                  <div
                    className={cn(
                      "pointer-events-none absolute right-5 top-5 font-display text-sm font-semibold tracking-[0.12em]",
                      isActive ? "text-pearl-white/60" : "text-rathna-blue/45",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="pointer-events-none max-w-[15rem] pr-5">
                    <h3 className="font-display text-[1.35rem] font-semibold leading-[1.08] tracking-[-0.025em]">
                      {title}
                    </h3>
                    <p
                      className={cn(
                        "mt-3 font-body text-[1.02rem] font-medium leading-[1.35]",
                        isActive ? "text-pearl-white/78" : "text-deep-navy/62",
                      )}
                    >
                      {description}
                    </p>
                  </div>

                  <div
                    className={cn(
                      "pointer-events-none mt-auto grid size-11 place-items-center rounded-xl transition-colors",
                      isActive
                        ? "bg-kolam-gold text-deep-navy"
                        : "bg-sky-tint text-rathna-blue group-hover:bg-kolam-gold/25",
                    )}
                  >
                    <Icon className="size-5" strokeWidth={1.8} />
                  </div>

                  {isActive && (
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-6 bottom-0 h-1 rounded-t-full bg-kolam-gold"
                    />
                  )}
                </article>
              )
            })}
          </div>

          <div className="relative mx-auto mt-4 grid max-w-3xl grid-cols-6 items-center gap-1 px-5 sm:mt-6 sm:gap-3 sm:px-8">
            <div className="absolute left-9 right-9 top-1/2 h-px -translate-y-1/2 bg-rathna-blue/20 sm:left-14 sm:right-14" />
            {reasons.map((reason, index) => {
              const isActive = activeIndex === index

              return (
                <button
                  key={reason.title}
                  type="button"
                  aria-label={`Show reason ${index + 1}: ${reason.title}`}
                  aria-pressed={isActive}
                  className={cn(
                    "relative z-10 mx-auto flex h-11 w-full max-w-[60px] items-center justify-center rounded-[18px] border font-display text-sm font-semibold outline-none transition-all focus-visible:ring-[3px] focus-visible:ring-rathna-blue/25",
                    isActive
                      ? "border-deep-navy bg-deep-navy text-pearl-white shadow-[0_7px_16px_rgba(20,35,63,0.18)]"
                      : "border-rathna-blue/15 bg-pearl-white text-rathna-blue hover:border-rathna-blue/35",
                  )}
                  onClick={() => selectReason(index)}
                >
                  {String(index + 1).padStart(2, "0")}
                </button>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export { WhyRathna }
