import { useId } from "react"
import { motion, useReducedMotion } from "framer-motion"
import {
  siBosch,
  siHitachi,
  siLg,
  siOppo,
  siPanasonic,
  siSamsung,
  siSony,
  siVivo,
  siXiaomi,
  type SimpleIcon,
} from "simple-icons"

type BrandItem = {
  id: string
  name: string
  range: string
  x: number
  y: number
  path: string
  delay: number
  icon?: SimpleIcon
  color: string
}

const brands: BrandItem[] = [
  {
    id: "sony",
    name: "Sony",
    range: "Entertainment",
    x: 76,
    y: 66,
    path: "M 266 190 V 84 Q 266 66 248 66 H 76",
    delay: 0.04,
    icon: siSony,
    color: "#14233F",
  },
  {
    id: "samsung",
    name: "Samsung",
    range: "Electronics & appliances",
    x: 211,
    y: 66,
    path: "M 276 190 V 84 Q 276 66 258 66 H 211",
    delay: 0.1,
    icon: siSamsung,
    color: "#1428A0",
  },
  {
    id: "lg",
    name: "LG",
    range: "Electronics & appliances",
    x: 353,
    y: 66,
    path: "M 288 190 V 84 Q 288 66 306 66 H 353",
    delay: 0.16,
    icon: siLg,
    color: "#A50034",
  },
  {
    id: "panasonic",
    name: "Panasonic",
    range: "Home appliances",
    x: 488,
    y: 66,
    path: "M 298 190 V 84 Q 298 66 316 66 H 488",
    delay: 0.22,
    icon: siPanasonic,
    color: "#0049AB",
  },
  {
    id: "bosch",
    name: "Bosch",
    range: "Home appliances",
    x: 74,
    y: 205,
    path: "M 260 205 H 74",
    delay: 0.28,
    icon: siBosch,
    color: "#EA0016",
  },
  {
    id: "hitachi",
    name: "Hitachi",
    range: "Cooling & appliances",
    x: 490,
    y: 205,
    path: "M 304 205 H 490",
    delay: 0.34,
    icon: siHitachi,
    color: "#E60027",
  },
  {
    id: "vivo",
    name: "vivo",
    range: "Mobiles",
    x: 76,
    y: 344,
    path: "M 266 220 V 326 Q 266 344 248 344 H 76",
    delay: 0.4,
    icon: siVivo,
    color: "#415FFF",
  },
  {
    id: "oppo",
    name: "OPPO",
    range: "Mobiles",
    x: 211,
    y: 344,
    path: "M 276 220 V 326 Q 276 344 258 344 H 211",
    delay: 0.46,
    icon: siOppo,
    color: "#2D683D",
  },
  {
    id: "xiaomi",
    name: "Xiaomi",
    range: "Mobiles",
    x: 353,
    y: 344,
    path: "M 288 220 V 326 Q 288 344 306 344 H 353",
    delay: 0.52,
    icon: siXiaomi,
    color: "#FF6900",
  },
  {
    id: "onida",
    name: "Onida",
    range: "TVs & appliances",
    x: 488,
    y: 344,
    path: "M 298 220 V 326 Q 298 344 316 344 H 488",
    delay: 0.58,
    color: "#EA2129",
  },
]

function BrandLogo({ brand }: { brand: BrandItem }) {
  if (!brand.icon) {
    return (
      <span
        className="font-display text-sm font-black uppercase tracking-[-0.03em] sm:text-lg lg:text-xl xl:text-[1.35rem]"
        style={{ color: brand.color }}
      >
        {brand.name}
      </span>
    )
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-8 sm:size-10 lg:size-12 xl:size-14"
      style={{ color: brand.color }}
      fill="currentColor"
    >
      <path d={brand.icon.path} />
    </svg>
  )
}

function RathnaMark() {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-rathna-blue/14 bg-pearl-white px-4 py-3 shadow-[0_14px_35px_rgba(20,35,63,0.14)] sm:gap-4 sm:px-5 sm:py-4 lg:gap-5 lg:px-6 lg:py-5">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-rathna-blue text-kolam-gold sm:size-12 lg:size-14">
        <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" className="size-7 sm:size-8 lg:size-9">
          <path
            d="M16 2.75v26.5M2.75 16h26.5M6.63 6.63l18.74 18.74M25.37 6.63 6.63 25.37"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.8"
          />
          <circle cx="16" cy="16" r="5.25" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      </span>
      <span className="font-display text-base font-bold leading-none tracking-[-0.025em] text-rathna-blue sm:text-xl lg:text-2xl">
        Rathna
      </span>
    </div>
  )
}

function AnimatedConnection({
  brand,
  containerId,
}: {
  brand: BrandItem
  containerId: string
}) {
  const prefersReducedMotion = useReducedMotion()
  const gradientId = `${containerId}-${brand.id}`

  return (
    <>
      <path
        d={brand.path}
        stroke="rgba(30,79,163,0.18)"
        strokeWidth="1.8"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
      <motion.path
        d={brand.path}
        stroke={`url(#${gradientId})`}
        strokeWidth="2.8"
        fill="none"
        strokeDasharray="42 158"
        initial={{ strokeDashoffset: 200 }}
        animate={prefersReducedMotion ? { strokeDashoffset: 0 } : { strokeDashoffset: -200 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : {
                duration: 4.2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: brand.delay,
              }
        }
        vectorEffect="non-scaling-stroke"
      />
      <defs>
        <linearGradient id={gradientId} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E5A63A" stopOpacity="0" />
          <stop offset="50%" stopColor="#E5A63A" stopOpacity="1" />
          <stop offset="100%" stopColor="#E5A63A" stopOpacity="0" />
        </linearGradient>
      </defs>
    </>
  )
}

function BrandNetwork() {
  const containerId = useId().replace(/:/g, "")
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="relative aspect-[564/440] w-full overflow-hidden rounded-[28px] bg-sky-tint/55 sm:aspect-[564/410] lg:rounded-[34px]">
      <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(circle,rgba(30,79,163,0.23)_1px,transparent_1.3px)] [background-size:28px_28px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(247,245,240,0)_20%,rgba(247,245,240,0.72)_100%)]" />

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full"
        viewBox="0 0 564 410"
        preserveAspectRatio="none"
        fill="none"
      >
        {brands.map((brand) => (
          <AnimatedConnection key={brand.id} brand={brand} containerId={containerId} />
        ))}
      </svg>

      <motion.div
        className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.88 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <RathnaMark />
        {!prefersReducedMotion && (
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 -z-10 rounded-2xl border-2 border-rathna-blue/15"
            animate={{ scale: [1, 1.22, 1], opacity: [0.35, 0, 0.35] }}
            transition={{ duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        )}
      </motion.div>

      {brands.map((brand) => (
        <motion.div
          key={brand.id}
          role="img"
          aria-label={`${brand.name} logo`}
          style={{
            left: `${(brand.x / 564) * 100}%`,
            top: `${(brand.y / 410) * 100}%`,
          }}
          className="absolute z-10 flex h-14 w-[68px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-xl border border-rathna-blue/12 bg-pearl-white/95 px-1.5 text-center shadow-[0_9px_24px_rgba(20,35,63,0.1)] backdrop-blur-sm sm:h-[74px] sm:w-24 sm:rounded-2xl sm:px-2 lg:h-[88px] lg:w-[116px] lg:rounded-[22px] xl:h-[98px] xl:w-[132px]"
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ delay: brand.delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <BrandLogo brand={brand} />
        </motion.div>
      ))}

      <span className="sr-only">
        Brands shown: {brands.map((brand) => `${brand.name}, ${brand.range}`).join("; ")}.
      </span>
    </div>
  )
}

export { BrandNetwork }
