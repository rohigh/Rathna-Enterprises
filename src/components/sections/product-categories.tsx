import { useMemo, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import {
  AirVent,
  ArrowRight,
  BedDouble,
  ChevronDown,
  Clock3,
  CookingPot,
  Gift,
  Home,
  Luggage,
  Refrigerator,
  Scissors,
  Smartphone,
  Sparkles,
  Tv,
  Utensils,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

type CategoryGroup =
  | "Electronics"
  | "Appliances"
  | "Furniture"
  | "Household"
  | "Lifestyle"

type ProductCategory = {
  id: string
  title: string
  cardLine: string
  description: string
  includes: string[]
  group: CategoryGroup
  Icon: LucideIcon
  featured?: "blue" | "gold"
}

const filters: Array<"All" | CategoryGroup> = [
  "All",
  "Electronics",
  "Appliances",
  "Furniture",
  "Household",
  "Lifestyle",
]

const categories: ProductCategory[] = [
  {
    id: "tvs-home-entertainment",
    title: "TVs & home entertainment",
    cardLine: "LED and smart TVs in every size, plus speakers and home theatres.",
    description:
      "See the picture quality in store and choose the right screen size for your hall and budget.",
    includes: ["LED TVs", "smart TVs", "speakers", "home theatres"],
    group: "Electronics",
    Icon: Tv,
    featured: "blue",
  },
  {
    id: "cooling",
    title: "ACs, fans & air coolers",
    cardLine: "Comfort for every room through a Tamil Nadu summer.",
    description:
      "Tell us your room size and we will help you compare capacities, inverter options and electricity use.",
    includes: [
      "split ACs",
      "window ACs",
      "air coolers",
      "ceiling fans",
      "tower fans",
      "ventilation fans",
    ],
    group: "Appliances",
    Icon: AirVent,
  },
  {
    id: "large-appliances",
    title: "Large appliances & water",
    cardLine: "Fridges, washing machines, water heaters and RO purifiers.",
    description:
      "Compare sizes and types for your household, with warranty terms clearly explained before you buy.",
    includes: [
      "refrigerators",
      "washing machines",
      "water heaters",
      "RO water purifiers",
    ],
    group: "Appliances",
    Icon: Refrigerator,
  },
  {
    id: "kitchen-appliances",
    title: "Kitchen appliances & gadgets",
    cardLine: "Grinders, mixies, stoves, chimneys and useful everyday gadgets.",
    description:
      "From the wet grinder that began our story to today's time-saving kitchen appliances, it is all under one roof.",
    includes: [
      "wet grinders",
      "mixer grinders",
      "gas stoves",
      "induction cooktops",
      "pressure cookers",
      "kitchen chimneys",
      "chapati presses",
    ],
    group: "Appliances",
    Icon: CookingPot,
  },
  {
    id: "mobiles",
    title: "Mobiles, smartwatches & accessories",
    cardLine: "New smartphones and smartwatches, with the accessories to match.",
    description:
      "Compare new models within your budget without travelling to Chennai for the latest launch.",
    includes: [
      "smartphones",
      "smartwatches",
      "chargers",
      "phone covers",
      "earphones",
    ],
    group: "Electronics",
    Icon: Smartphone,
  },
  {
    id: "watches-clocks",
    title: "Watches & wall clocks",
    cardLine: "Wristwatches for every age and wall clocks for every room.",
    description:
      "Choose something practical for home or a thoughtful gift for a wedding or house-warming.",
    includes: ["men's watches", "women's watches", "children's watches", "wall clocks"],
    group: "Lifestyle",
    Icon: Clock3,
  },
  {
    id: "sewing-machines",
    title: "Sewing & tailoring machines",
    cardLine: "Machines for home stitching, tailoring shops and small businesses.",
    description:
      "We will help you choose between domestic, manual and powered machines based on how much you stitch.",
    includes: ["domestic sewing machines", "manual machines", "power machines", "tailoring machines"],
    group: "Furniture",
    Icon: Scissors,
  },
  {
    id: "furniture",
    title: "Furniture & mattresses",
    cardLine: "Beds, wardrobes, sofas, tables, mattresses and pooja cupboards.",
    description:
      "See and touch every piece before choosing it for a new home, a single room or a workspace.",
    includes: [
      "bed frames",
      "mattresses",
      "bureaus",
      "wardrobes",
      "sofas",
      "office tables",
      "study tables",
      "pooja cupboards",
      "plastic chairs",
    ],
    group: "Furniture",
    Icon: BedDouble,
  },
  {
    id: "kitchenware",
    title: "Kitchenware, steel & brass",
    cardLine: "Daily-use kitchenware and popular wedding and seer gifts.",
    description:
      "Stock a kitchen with practical pieces for everyday cooking, serving, gifting and storage.",
    includes: [
      "steel plates",
      "steel containers",
      "brass items",
      "glassware",
      "hotboxes",
      "plastic containers",
    ],
    group: "Household",
    Icon: Utensils,
  },
  {
    id: "cleaning-essentials",
    title: "Cleaning & household essentials",
    cardLine: "The everyday things that keep a home running smoothly.",
    description:
      "Pick up household basics alongside larger purchases instead of making another stop.",
    includes: [
      "brooms",
      "mops",
      "buckets",
      "drying racks",
      "handwash",
      "bathroom cleaners",
    ],
    group: "Household",
    Icon: Sparkles,
  },
  {
    id: "travel",
    title: "Bags, travel & umbrellas",
    cardLine: "Travel essentials and everyday bags for the whole family.",
    description:
      "Find useful sizes and styles for trips, wedding journeys, work and daily errands.",
    includes: ["suitcases", "travel bags", "handbags", "umbrellas"],
    group: "Lifestyle",
    Icon: Luggage,
  },
  {
    id: "gifts-wedding-pooja",
    title: "Gifts, wedding & pooja essentials",
    cardLine: "Useful gifts and complete sets for life's important occasions.",
    description:
      "Bring your list for a wedding, seer, house-warming or festival and choose everything together.",
    includes: [
      "wedding essentials",
      "gift items",
      "greeting cards",
      "pooja items",
    ],
    group: "Lifestyle",
    Icon: Gift,
  },
  {
    id: "new-home-sets",
    title: "New home sets",
    cardLine: "Everything a new couple needs, chosen together, on one clear bill.",
    description:
      "Share your list and budget, then build a practical set for the new home from across Rathna's categories.",
    includes: [
      "bed",
      "wardrobe",
      "TV",
      "refrigerator",
      "grinder",
      "kitchenware",
      "custom combinations",
    ],
    group: "Furniture",
    Icon: Home,
    featured: "gold",
  },
]

function CategoryCard({
  category,
  index,
  isOpen,
  onToggle,
}: {
  category: ProductCategory
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  const prefersReducedMotion = useReducedMotion()
  const isBlue = category.featured === "blue"
  const isGold = category.featured === "gold"
  const panelId = `${category.id}-details`

  return (
    <motion.article
      layout={!prefersReducedMotion}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.025, 0.16) }}
      className={cn(
        "group relative overflow-hidden rounded-[26px] border shadow-[0_12px_34px_rgba(20,35,63,0.08)] transition-[border-color,box-shadow] hover:shadow-[0_18px_44px_rgba(20,35,63,0.13)]",
        category.featured && "md:col-span-2 xl:col-span-2",
        isBlue
          ? "border-rathna-blue bg-rathna-blue text-pearl-white"
          : isGold
            ? "border-kolam-gold/55 bg-[#f5dfb6] text-deep-navy"
            : "border-rathna-blue/10 bg-pearl-white text-deep-navy hover:border-rathna-blue/25",
      )}
    >
      <category.Icon
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -bottom-8 -right-6 size-36 rotate-[-8deg] transition-transform duration-500 group-hover:rotate-0 group-hover:scale-105 sm:size-44",
          isBlue
            ? "text-pearl-white/[0.055]"
            : isGold
              ? "text-rathna-blue/[0.075]"
              : "text-rathna-blue/[0.045]",
        )}
        strokeWidth={1.1}
      />

      <button
        type="button"
        className="relative flex min-h-[260px] w-full flex-col p-6 text-left outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-kolam-gold/70 sm:p-7"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <div className="flex items-start justify-between gap-4">
          <div
            className={cn(
              "grid size-12 place-items-center rounded-2xl",
              isBlue
                ? "bg-kolam-gold text-deep-navy"
                : isGold
                  ? "bg-rathna-blue text-pearl-white"
                  : "bg-sky-tint text-rathna-blue",
            )}
          >
            <category.Icon className="size-[22px]" strokeWidth={1.8} />
          </div>
          <span
            className={cn(
              "font-display text-sm font-semibold tracking-[0.12em]",
              isBlue ? "text-pearl-white/52" : "text-rathna-blue/45",
            )}
          >
            {String(categories.findIndex((item) => item.id === category.id) + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="mt-8 max-w-2xl">
          <div
            className={cn(
              "mb-2 font-body text-xs font-bold uppercase tracking-[0.14em]",
              isBlue ? "text-kolam-gold" : "text-rathna-blue/65",
            )}
          >
            {category.group}
          </div>
          <h3 className="max-w-xl font-display text-[1.7rem] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-[1.95rem]">
            {category.title}
          </h3>
          <p
            className={cn(
              "mt-3 max-w-xl font-body text-[1.06rem] font-medium leading-[1.35]",
              isBlue ? "text-pearl-white/72" : "text-deep-navy/62",
            )}
          >
            {category.cardLine}
          </p>
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <div className="flex flex-wrap gap-1.5">
            {category.includes.slice(0, category.featured ? 4 : 3).map((item) => (
              <span
                key={item}
                className={cn(
                  "rounded-full px-2.5 py-1 font-body text-xs font-bold",
                  isBlue
                    ? "bg-pearl-white/10 text-pearl-white/72"
                    : "bg-sky-tint/80 text-rathna-blue",
                )}
              >
                {item}
              </span>
            ))}
          </div>
          <span
            className={cn(
              "grid size-10 shrink-0 place-items-center rounded-full border transition-transform duration-300",
              isBlue
                ? "border-pearl-white/18 bg-pearl-white/10"
                : "border-rathna-blue/15 bg-pearl-white/55 text-rathna-blue",
              isOpen && "rotate-180",
            )}
          >
            <ChevronDown className="size-4" />
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden"
          >
            <div
              className={cn(
                "mx-6 border-t pb-7 pt-5 sm:mx-7",
                isBlue ? "border-pearl-white/14" : "border-rathna-blue/12",
              )}
            >
              <p
                className={cn(
                  "max-w-2xl font-body text-[1.05rem] font-medium leading-[1.4]",
                  isBlue ? "text-pearl-white/76" : "text-deep-navy/70",
                )}
              >
                {category.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2" aria-label="Products included">
                {category.includes.map((item) => (
                  <span
                    key={item}
                    className={cn(
                      "rounded-full border px-3 py-1.5 font-body text-sm font-bold",
                      isBlue
                        ? "border-pearl-white/16 text-pearl-white/72"
                        : "border-rathna-blue/14 bg-pearl-white/50 text-deep-navy/70",
                    )}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <span className="sr-only">
          {category.description} Includes {category.includes.join(", ")}.
        </span>
      )}
    </motion.article>
  )
}

function ProductCategories() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All")
  const [openCategory, setOpenCategory] = useState<string>("tvs-home-entertainment")
  const prefersReducedMotion = useReducedMotion()

  const filteredCategories = useMemo(
    () =>
      activeFilter === "All"
        ? categories
        : categories.filter((category) => category.group === activeFilter),
    [activeFilter],
  )

  const setFilter = (filter: (typeof filters)[number]) => {
    setActiveFilter(filter)
    const firstMatch =
      filter === "All"
        ? categories[0]
        : categories.find((category) => category.group === filter)
    setOpenCategory(firstMatch?.id ?? "")
  }

  return (
    <section id="products" className="relative overflow-hidden bg-sky-tint/55 px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute -left-40 top-48 size-[460px] rounded-full bg-rathna-blue/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-24 size-[360px] rounded-full bg-kolam-gold/[0.11] blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="grid items-end gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-rathna-blue/15 bg-pearl-white/70 px-3.5 py-2 font-body text-sm font-bold uppercase tracking-[0.14em] text-rathna-blue">
              <span className="size-2 rounded-full bg-kolam-gold" />
              What we sell
            </div>
            <h2 className="max-w-4xl font-display text-[clamp(2.65rem,5.5vw,5.1rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-deep-navy">
              Everything your home needs, under one roof
            </h2>
          </div>

          <div className="flex items-end gap-5 lg:justify-end">
            <div className="font-display text-[clamp(4.5rem,9vw,8rem)] font-semibold leading-[0.75] tracking-[-0.07em] text-rathna-blue">
              13
            </div>
            <p className="max-w-[15rem] pb-1 font-body text-lg font-medium leading-[1.25] text-deep-navy/66">
              categories for every room, routine and celebration.
            </p>
          </div>
        </motion.div>

        <div className="hide-scrollbar -mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:mt-12 lg:px-0">
          {filters.map((filter) => {
            const isActive = activeFilter === filter
            const count =
              filter === "All"
                ? categories.length
                : categories.filter((category) => category.group === filter).length

            return (
              <button
                key={filter}
                type="button"
                aria-pressed={isActive}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 font-body text-base font-bold outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-rathna-blue/25",
                  isActive
                    ? "border-deep-navy bg-deep-navy text-pearl-white"
                    : "border-rathna-blue/15 bg-pearl-white/75 text-rathna-blue hover:border-rathna-blue/35 hover:bg-pearl-white",
                )}
                onClick={() => setFilter(filter)}
              >
                {filter}
                <span
                  className={cn(
                    "grid min-w-6 place-items-center rounded-full px-1.5 py-0.5 text-xs",
                    isActive ? "bg-pearl-white/12" : "bg-sky-tint",
                  )}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        <motion.div
          layout={!prefersReducedMotion}
          className="mt-6 grid grid-cols-1 gap-4 [grid-auto-flow:dense] md:grid-cols-2 xl:grid-cols-3"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredCategories.map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                index={index}
                isOpen={openCategory === category.id}
                onToggle={() =>
                  setOpenCategory((current) => (current === category.id ? "" : category.id))
                }
              />
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-6 flex flex-col items-start justify-between gap-5 rounded-[26px] border border-rathna-blue/12 bg-pearl-white/75 p-6 backdrop-blur-sm sm:flex-row sm:items-center sm:p-7">
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-[-0.025em] text-deep-navy">
              Do not see it here? Ask us.
            </h3>
            <p className="mt-1 font-body text-lg font-medium text-deep-navy/64">
              If a home needs it, we probably have it—or we will help you find it.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-kolam-gold px-5 py-3 font-body text-base font-bold text-deep-navy shadow-[0_5px_0_#14233f] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-rathna-blue/25"
          >
            Ask Rathna <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

export { ProductCategories }
