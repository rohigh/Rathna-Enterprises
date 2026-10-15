import { motion, useReducedMotion } from "framer-motion"
import {
  ArrowRight,
  Clock3,
  MapPin,
  Navigation,
  PackageCheck,
  Phone,
  Route,
  ShieldCheck,
} from "lucide-react"

import { Button } from "@/components/ui/button"

const phonePrimary = "+919445623111"
const mainDirections =
  "https://www.google.com/maps/search/?api=1&query=Rathna+Enterprises+103+Hospital+Road+Maduranthakam+Tamil+Nadu+603306"

const branchSupport = [
  { label: "Product comparisons", Icon: PackageCheck },
  { label: "Warranty guidance", Icon: ShieldCheck },
  { label: "Local directions", Icon: Route },
]

function RouteMap() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="relative min-h-[370px] overflow-hidden rounded-[28px] bg-deep-navy text-pearl-white sm:min-h-[460px] lg:h-full lg:min-h-[600px] lg:rounded-[34px]">
      <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle,rgba(220,230,245,0.5)_1px,transparent_1.4px)] [background-size:28px_28px]" />
      <div className="absolute -left-24 -top-28 size-80 rounded-full border-[58px] border-rathna-blue/35" />
      <div className="absolute -bottom-36 -right-32 size-[430px] rounded-full border-[76px] border-kolam-gold/20" />

      <div className="relative z-10 flex h-full min-h-[370px] flex-col p-6 sm:min-h-[460px] sm:p-9 lg:min-h-[600px] lg:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="font-body text-xs font-bold uppercase tracking-[0.18em] text-kolam-gold sm:text-sm">
              Madurantakam
            </div>
            <div className="mt-1 font-display text-xl font-semibold tracking-[-0.025em] sm:text-2xl">
              Two stops, one Rathna family
            </div>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-pearl-white/15 bg-pearl-white/10 px-3 py-2 font-body text-xs font-bold uppercase tracking-[0.1em] backdrop-blur-sm sm:text-sm">
            <Clock3 className="size-4 text-kolam-gold" />
            Open daily
          </div>
        </div>

        <div className="relative my-auto h-[230px] sm:h-[285px] lg:h-[360px]">
          <svg
            aria-hidden="true"
            viewBox="0 0 640 340"
            className="absolute inset-0 size-full overflow-visible"
            fill="none"
          >
            <path
              d="M46 278C118 210 150 249 218 194C281 142 268 92 349 89C431 86 432 174 510 153C554 141 575 102 608 55"
              stroke="rgba(220,230,245,0.2)"
              strokeWidth="18"
              strokeLinecap="round"
            />
            <motion.path
              d="M46 278C118 210 150 249 218 194C281 142 268 92 349 89C431 86 432 174 510 153C554 141 575 102 608 55"
              stroke="#E5A63A"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="9 13"
              initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: prefersReducedMotion ? 0 : 1.4, ease: "easeInOut" }}
            />
          </svg>

          <motion.div
            className="absolute bottom-[9%] left-[3%]"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.7, y: 12 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            <div className="relative grid size-16 place-items-center rounded-full border-[6px] border-deep-navy bg-kolam-gold font-display text-xl font-bold text-deep-navy shadow-[0_14px_35px_rgba(0,0,0,0.28)] sm:size-20 sm:text-2xl">
              01
              <span className="absolute -bottom-7 whitespace-nowrap rounded-full bg-pearl-white px-3 py-1 font-body text-[0.65rem] font-bold uppercase tracking-[0.12em] text-deep-navy sm:text-xs">
                Main showroom
              </span>
            </div>
          </motion.div>

          <motion.div
            className="absolute right-[1%] top-[1%]"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.7, y: 12 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.65, duration: 0.5 }}
          >
            <div className="relative grid size-16 place-items-center rounded-full border-[6px] border-deep-navy bg-rathna-blue font-display text-xl font-bold text-pearl-white shadow-[0_14px_35px_rgba(0,0,0,0.28)] sm:size-20 sm:text-2xl">
              02
              <span className="absolute -bottom-7 whitespace-nowrap rounded-full bg-pearl-white px-3 py-1 font-body text-[0.65rem] font-bold uppercase tracking-[0.12em] text-deep-navy sm:text-xs">
                Madurantakam
              </span>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {branchSupport.map(({ label, Icon }) => (
            <div
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-pearl-white/12 bg-pearl-white/[0.08] px-3 py-2 font-body text-xs font-bold text-pearl-white/78 backdrop-blur-sm sm:text-sm"
            >
              <Icon className="size-4 text-kolam-gold" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function VisitBranches() {
  return (
    <section
      id="branches"
      className="relative overflow-hidden bg-pearl-white px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="pointer-events-none absolute -left-40 top-24 size-[440px] rounded-full bg-rathna-blue/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -right-36 bottom-16 size-[380px] rounded-full bg-kolam-gold/[0.09] blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-rathna-blue/15 bg-sky-tint/55 px-3.5 py-2 font-body text-sm font-bold uppercase tracking-[0.14em] text-rathna-blue">
              <MapPin className="size-4 text-kolam-gold" />
              Visit our branches
            </div>
            <h2 className="max-w-[720px] font-display text-[clamp(2.7rem,5.6vw,5.2rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-deep-navy">
              Two branches. One familiar welcome.
            </h2>
          </div>
          <p className="max-w-xl font-body text-xl font-medium leading-relaxed text-deep-navy/66 sm:text-2xl lg:justify-self-end">
            Visit us in Madurantakam to compare products in person, ask questions and choose with help from people who know the range.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-[1.12fr_0.88fr]">
          <RouteMap />

          <div className="grid gap-5">
            <article className="group relative overflow-hidden rounded-[28px] border border-rathna-blue/12 bg-sky-tint/55 p-6 sm:p-8 lg:rounded-[34px] lg:p-9">
              <div className="absolute right-5 top-3 font-display text-[6.5rem] font-semibold leading-none tracking-[-0.08em] text-rathna-blue/[0.07] sm:text-[8rem]">
                01
              </div>
              <div className="relative">
                <div className="font-body text-xs font-bold uppercase tracking-[0.18em] text-rathna-blue sm:text-sm">
                  Main showroom
                </div>
                <h3 className="mt-3 max-w-md font-display text-3xl font-semibold tracking-[-0.035em] text-deep-navy sm:text-4xl">
                  Hospital Road
                </h3>
                <p className="mt-5 max-w-md font-body text-lg font-medium leading-relaxed text-deep-navy/68 sm:text-xl">
                  103, Hospital Road, Anand Nagar, Madurantakam, Tamil Nadu 603306
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button asChild size="lg">
                    <a href={mainDirections} target="_blank" rel="noreferrer">
                      Get directions <Navigation />
                    </a>
                  </Button>
                  <a
                    href={`tel:${phonePrimary}`}
                    className="inline-flex items-center gap-2 rounded-full border border-rathna-blue/18 bg-pearl-white/80 px-5 py-3 font-body text-base font-bold text-rathna-blue transition-colors hover:bg-rathna-blue hover:text-pearl-white focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-rathna-blue/25"
                  >
                    Call branch <Phone className="size-4" />
                  </a>
                </div>
              </div>
            </article>

            <article className="group relative overflow-hidden rounded-[28px] bg-rathna-blue p-6 text-pearl-white shadow-[0_22px_55px_rgba(30,79,163,0.2)] sm:p-8 lg:rounded-[34px] lg:p-9">
              <div className="absolute right-5 top-3 font-display text-[6.5rem] font-semibold leading-none tracking-[-0.08em] text-pearl-white/[0.07] sm:text-[8rem]">
                02
              </div>
              <div className="relative">
                <div className="font-body text-xs font-bold uppercase tracking-[0.18em] text-kolam-gold sm:text-sm">
                  Second branch
                </div>
                <h3 className="mt-3 max-w-md font-display text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                  Madurantakam
                </h3>
                <p className="mt-5 max-w-md font-body text-lg font-medium leading-relaxed text-pearl-white/72 sm:text-xl">
                  Call our team for the quickest route and to check which branch has the product you want in stock.
                </p>

                <Button asChild size="lg" className="mt-7">
                  <a href={`tel:${phonePrimary}`}>
                    Ask for directions <ArrowRight />
                  </a>
                </Button>
              </div>
            </article>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 rounded-[22px] border border-rathna-blue/10 bg-pearl-white/75 px-5 py-4 font-body text-sm font-semibold text-deep-navy/58 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-base">
          <span>Stock and brand availability can vary between branches.</span>
          <a href={`tel:${phonePrimary}`} className="inline-flex items-center gap-2 font-bold text-rathna-blue hover:underline">
            Call before you travel <Phone className="size-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

export { VisitBranches }
