import { useId, useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { Quote } from "lucide-react"

type Milestone = {
  year: string
  title: string
  description: string
}

const milestones: Milestone[] = [
  {
    year: "1981",
    title: "The beginning",
    description:
      "A retired teacher opened a 10×10 shop. Grinders and wall clocks came first; video rentals followed as technology changed.",
  },
  {
    year: "Generation 2",
    title: "Building it up",
    description:
      "The next generation added bureaus and colour TVs, expanded into the neighbouring plots and built the store that stands today.",
  },
  {
    year: "Growing",
    title: "More for the home",
    description:
      "Furniture, sewing machines, mobiles, watches and a second branch joined the growing range for Madurantakam families.",
  },
  {
    year: "Today",
    title: "Generation 3",
    description:
      "Benjamin Sudharan leads Rathna today, with his father still close by to guide the decisions that matter most.",
  },
]

const desktopPath = `
  M 77 54
  C 132 2 244 8 297 118
  C 350 70 461 75 507 185
  C 571 124 698 136 757 271
`

const desktopPoints = [
  { x: 77, y: 54 },
  { x: 297, y: 118 },
  { x: 507, y: 185 },
  { x: 757, y: 271 },
]

const mobilePath = `
  M 34 40
  C 70 105 5 165 34 230
  C 68 295 3 355 34 420
  C 67 485 7 550 34 620
`

const mobilePoints = [
  { x: 34, y: 40 },
  { x: 34, y: 230 },
  { x: 34, y: 420 },
  { x: 34, y: 620 },
]

type StoryPathProps = {
  path: string
  points: Array<{ x: number; y: number }>
  viewBox: string
}

function StoryPath({ path, points, viewBox }: StoryPathProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })
  const prefersReducedMotion = useReducedMotion()
  const uniqueId = useId().replace(/:/g, "")
  const maskId = `story-trail-mask-${uniqueId}`
  const animationName = `story-trail-${uniqueId}`
  const animationClass = `story-trail-path-${uniqueId}`

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      {!prefersReducedMotion && (
        <style>{`
          @keyframes ${animationName} {
            from { stroke-dashoffset: 0; }
            to { stroke-dashoffset: -1; }
          }

          .${animationClass} {
            animation: ${animationName} 5.8s linear infinite;
            will-change: stroke-dashoffset;
          }
        `}</style>
      )}

      <svg
        aria-hidden="true"
        className="block size-full overflow-visible"
        viewBox={viewBox}
        preserveAspectRatio="none"
      >
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse">
            <path
              d={path}
              pathLength="1"
              fill="none"
              stroke="white"
              strokeWidth="26"
              strokeLinecap="round"
              strokeDasharray="0.3 0.7"
              className={isInView && !prefersReducedMotion ? animationClass : undefined}
              opacity={isInView ? 1 : 0}
            />
          </mask>
        </defs>

        <path
          d={path}
          fill="none"
          stroke="rgba(220,230,245,0.28)"
          strokeWidth="2"
          strokeDasharray="8 11"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />

        <path
          d={path}
          fill="none"
          stroke="#E5A63A"
          strokeWidth="2.4"
          strokeDasharray="8 11"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          mask={prefersReducedMotion ? undefined : `url(#${maskId})`}
        />

        {points.map((point, index) => (
          <g key={`${point.x}-${point.y}`}>
            <circle
              cx={point.x}
              cy={point.y}
              r="14"
              fill="rgba(229,166,58,0.14)"
            />
            <circle
              cx={point.x}
              cy={point.y}
              r="6.5"
              fill="#E5A63A"
              stroke="#F7F5F0"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
            <text
              x={point.x}
              y={point.y + 1}
              fill="#14233F"
              fontFamily="Outfit, sans-serif"
              fontSize="5.5"
              fontWeight="700"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {index + 1}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

function MilestoneCard({ milestone, index }: { milestone: Milestone; index: number }) {
  return (
    <motion.article
      className="rounded-[22px] border border-pearl-white/12 bg-pearl-white/[0.075] p-5 text-pearl-white shadow-[0_18px_45px_rgba(6,17,37,0.18)] backdrop-blur-sm lg:p-6"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="font-body text-sm font-bold uppercase tracking-[0.14em] text-kolam-gold">
        {milestone.year}
      </div>
      <h3 className="mt-2 font-display text-[1.45rem] font-semibold leading-none tracking-[-0.025em]">
        {milestone.title}
      </h3>
      <p className="mt-3 font-body text-[1rem] font-medium leading-[1.35] text-pearl-white/68">
        {milestone.description}
      </p>
    </motion.article>
  )
}

function AboutStory() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="about" className="relative overflow-hidden bg-pearl-white px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute -right-40 top-16 size-[440px] rounded-full bg-kolam-gold/[0.08] blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="grid items-end gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-rathna-blue/15 bg-sky-tint/55 px-3.5 py-2 font-body text-sm font-bold uppercase tracking-[0.14em] text-rathna-blue">
              <span className="size-2 rounded-full bg-kolam-gold" />
              Our story
            </div>
            <h2 className="max-w-4xl font-display text-[clamp(2.65rem,5.5vw,5.1rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-deep-navy">
              From a 10×10 shop to your family's store
            </h2>
          </div>

          <p className="max-w-xl font-body text-xl font-medium leading-[1.45] text-deep-navy/72 lg:pb-1 lg:text-[1.35rem]">
            Rathna Enterprises is a family-run electronics, furniture and home
            appliances store in Madurantakam. Since 1981, it has grown with the
            town for three generations.
          </p>
        </motion.div>

        <div className="relative mt-14 overflow-hidden rounded-[30px] bg-deep-navy shadow-[0_28px_80px_rgba(20,35,63,0.18)] sm:mt-16 lg:rounded-[38px]">
          <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(220,230,245,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(220,230,245,0.08)_1px,transparent_1px)] [background-size:54px_54px]" />
          <div className="absolute right-7 top-5 font-display text-[clamp(5rem,14vw,12rem)] font-semibold leading-none tracking-[-0.08em] text-pearl-white/[0.035]">
            1981
          </div>

          <div className="relative hidden min-h-[650px] md:block">
            <div className="absolute inset-x-[4%] top-10 h-[520px]">
              <StoryPath
                path={desktopPath}
                points={desktopPoints}
                viewBox="0 0 927 400"
              />
            </div>

            <div className="absolute left-[6%] top-[18%] w-[22%] max-w-[258px]">
              <MilestoneCard milestone={milestones[0]} index={0} />
            </div>
            <div className="absolute left-[29%] top-[34%] w-[22%] max-w-[258px]">
              <MilestoneCard milestone={milestones[1]} index={1} />
            </div>
            <div className="absolute left-[51%] top-[51%] w-[22%] max-w-[258px]">
              <MilestoneCard milestone={milestones[2]} index={2} />
            </div>
            <div className="absolute left-[75%] top-[68%] w-[21%] max-w-[258px]">
              <MilestoneCard milestone={milestones[3]} index={3} />
            </div>
          </div>

          <div className="relative px-5 py-8 md:hidden">
            <div className="absolute bottom-8 left-5 top-8 w-[58px]">
              <StoryPath
                path={mobilePath}
                points={mobilePoints}
                viewBox="0 0 80 660"
              />
            </div>

            <div className="relative ml-[66px] grid min-h-[700px] grid-rows-4 gap-5">
              {milestones.map((milestone, index) => (
                <div key={milestone.title} className="flex items-center">
                  <MilestoneCard milestone={milestone} index={index} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:mt-12 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            className="rounded-[26px] border border-rathna-blue/10 bg-sky-tint/55 p-7 sm:p-9"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="font-body text-sm font-bold uppercase tracking-[0.14em] text-rathna-blue">
              Bridging the gap
            </div>
            <p className="mt-4 font-display text-[clamp(1.55rem,2.7vw,2.35rem)] font-medium leading-[1.16] tracking-[-0.025em] text-deep-navy">
              From grinders and video rentals to today's smart TVs and mobiles,
              Rathna has kept bringing what is new closer to home—so families
              do not have to travel to Chennai to find it.
            </p>
          </motion.div>

          <motion.blockquote
            className="relative overflow-hidden rounded-[26px] bg-rathna-blue p-7 text-pearl-white shadow-[0_18px_50px_rgba(30,79,163,0.18)] sm:p-9"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <Quote className="absolute right-6 top-5 size-16 text-kolam-gold/22" strokeWidth={1.5} />
            <p className="relative max-w-xl font-display text-[clamp(1.55rem,2.6vw,2.25rem)] font-semibold leading-[1.12] tracking-[-0.025em]">
              “Would I sell this to my own family, at this price?”
            </p>
            <footer className="relative mt-6 font-body text-base font-bold text-pearl-white/65">
              The question behind every sale since 1981.
            </footer>
          </motion.blockquote>
        </div>
      </div>
    </section>
  )
}

export { AboutStory }
