import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, ShieldCheck } from "lucide-react"

import { BrandNetwork } from "@/components/ui/brand-network"

const featuredBrands = [
  "Sony",
  "Samsung",
  "LG",
  "Panasonic",
  "Bosch",
  "Hitachi",
  "Onida",
  "vivo",
  "OPPO",
  "Xiaomi",
]

function PartnerBrands() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="brands" className="relative overflow-hidden bg-pearl-white px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute -right-40 top-20 size-[430px] rounded-full bg-kolam-gold/[0.09] blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="grid items-end gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-rathna-blue/15 bg-sky-tint/55 px-3.5 py-2 font-body text-sm font-bold uppercase tracking-[0.14em] text-rathna-blue">
              <span className="size-2 rounded-full bg-kolam-gold" />
              Partnered brands
            </div>
            <h2 className="max-w-4xl font-display text-[clamp(2.65rem,5.5vw,5.1rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-deep-navy">
              Brands you trust, from a store you trust
            </h2>
          </div>

          <p className="max-w-xl font-body text-xl font-medium leading-[1.45] text-deep-navy/70 lg:pb-1 lg:text-[1.35rem]">
            Explore familiar names across TVs, cooling, home appliances and
            mobiles—from Sony, Samsung and LG to Onida, vivo and more.
          </p>
        </motion.div>

        <div className="mt-12 overflow-hidden rounded-[30px] border border-rathna-blue/10 bg-pearl-white shadow-[0_25px_70px_rgba(20,35,63,0.12)] sm:mt-16 lg:rounded-[38px]">
          <BrandNetwork />

          <div className="grid gap-6 border-t border-rathna-blue/10 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
            <div>
              <div className="flex items-center gap-2 font-body text-sm font-bold uppercase tracking-[0.14em] text-rathna-blue">
                <ShieldCheck className="size-4 text-kolam-gold" />
                Featured brand names
              </div>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2.5">
                {featuredBrands.map((brand) => (
                  <span
                    key={brand}
                    className="font-display text-xl font-semibold tracking-[-0.025em] text-deep-navy sm:text-2xl"
                  >
                    {brand}
                  </span>
                ))}
              </div>
              <p className="mt-3 font-body text-base font-medium text-deep-navy/55">
                Brand and model availability can vary by branch. Ask us for current stock.
              </p>
            </div>

            <a
              href="#contact"
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-kolam-gold px-5 py-3 font-body text-base font-bold text-deep-navy shadow-[0_5px_0_#14233f] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-rathna-blue/25"
            >
              Ask about a brand <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export { PartnerBrands }
