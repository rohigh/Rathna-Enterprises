import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, BookOpen, CalendarDays, Clock3 } from "lucide-react"

import {
  type BlogPost,
  getLatestPosts,
  isSanityConfigured,
} from "@/lib/sanity"

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
})

function formatDate(value?: string) {
  if (!value) return "Fresh from Rathna"

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? "Fresh from Rathna" : dateFormatter.format(date)
}

function StoryArtwork({ post, index }: { post: BlogPost; index: number }) {
  if (post.imageUrl) {
    return (
      <img
        src={post.imageUrl}
        alt={post.imageAlt || ""}
        className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
        loading="lazy"
      />
    )
  }

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 ${
        index === 0
          ? "bg-[radial-gradient(circle_at_75%_20%,rgba(229,166,58,0.62),transparent_24%),linear-gradient(145deg,#1e4fa3,#14233f)]"
          : "bg-[radial-gradient(circle_at_20%_20%,rgba(220,230,245,0.82),transparent_28%),linear-gradient(145deg,#1e4fa3,#14233f)]"
      }`}
    >
      <div className="absolute -bottom-16 -right-10 size-52 rounded-full border-[38px] border-pearl-white/10" />
      <div className="absolute right-7 top-7 grid size-16 place-items-center rounded-full border border-pearl-white/20 bg-pearl-white/10 text-kolam-gold backdrop-blur-sm">
        <BookOpen className="size-7" />
      </div>
    </div>
  )
}

function StoryCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      className={index === 0 ? "md:col-span-2 lg:col-span-1 lg:row-span-2" : ""}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <a
        href={`/blog/${post.slug}`}
        className={`group relative flex h-full min-h-[390px] overflow-hidden rounded-[30px] border border-rathna-blue/10 shadow-[0_22px_60px_rgba(20,35,63,0.12)] focus-visible:outline-none focus-visible:ring-[4px] focus-visible:ring-kolam-gold/55 ${
          index === 0 ? "lg:min-h-[610px]" : "lg:min-h-[292px]"
        }`}
      >
        <StoryArtwork post={post} index={index} />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/52 to-transparent" />

        <div className="relative mt-auto w-full p-6 text-pearl-white sm:p-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-body text-sm font-bold text-pearl-white/70">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-4 text-kolam-gold" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="size-4 text-kolam-gold" />
              {post.readingTime || 4} min read
            </span>
          </div>

          <div className="mt-3 font-body text-xs font-bold uppercase tracking-[0.16em] text-kolam-gold">
            {post.category || "Rathna guide"}
          </div>
          <h3 className="mt-2 max-w-2xl font-display text-3xl font-semibold leading-[1.03] tracking-[-0.04em] sm:text-4xl">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="mt-3 max-w-2xl font-body text-lg font-medium leading-relaxed text-pearl-white/72">
              {post.excerpt}
            </p>
          )}
          <span className="mt-5 inline-flex items-center gap-2 font-body text-base font-bold text-pearl-white">
            Read story
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </a>
    </motion.article>
  )
}

function EmptyStories() {
  return (
    <div className="relative overflow-hidden rounded-[30px] bg-deep-navy p-7 text-pearl-white shadow-[0_24px_70px_rgba(20,35,63,0.16)] sm:p-10 lg:p-14">
      <div className="absolute -right-20 -top-24 size-72 rounded-full border-[54px] border-rathna-blue/45" />
      <div className="absolute -bottom-24 right-36 size-52 rounded-full border-[44px] border-kolam-gold/20" />
      <div className="relative max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-pearl-white/15 bg-pearl-white/10 px-3.5 py-2 font-body text-sm font-bold text-kolam-gold">
          <BookOpen className="size-4" />
          Editorial desk opening soon
        </div>
        <h3 className="mt-5 font-display text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
          Helpful buying guides and product care stories are on the way.
        </h3>
        <p className="mt-4 max-w-2xl font-body text-xl font-medium leading-relaxed text-pearl-white/66">
          The Rathna team will publish practical advice, new arrivals and store updates here.
        </p>
      </div>
    </div>
  )
}

function Blogs() {
  const prefersReducedMotion = useReducedMotion()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(isSanityConfigured)

  useEffect(() => {
    if (!isSanityConfigured) return

    let isMounted = true

    getLatestPosts()
      .then((result) => {
        if (isMounted) setPosts(result)
      })
      .catch(() => {
        if (isMounted) setPosts([])
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section id="blogs" className="relative overflow-hidden bg-sky-tint/38 px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="pointer-events-none absolute -left-32 top-20 size-[420px] rounded-full bg-rathna-blue/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-8 size-[360px] rounded-full bg-kolam-gold/[0.12] blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-rathna-blue/15 bg-pearl-white/70 px-3.5 py-2 font-body text-sm font-bold uppercase tracking-[0.14em] text-rathna-blue">
              <BookOpen className="size-4 text-kolam-gold" />
              Latest from Rathna
            </div>
            <h2 className="max-w-4xl font-display text-[clamp(2.7rem,5.6vw,5.2rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-deep-navy">
              Better choices start with better advice.
            </h2>
          </div>
          <p className="max-w-xl font-body text-xl font-medium leading-relaxed text-deep-navy/66 sm:text-2xl lg:justify-self-end">
            Practical guides, product care tips and stories from a family-run store that has helped homes choose since 1981.
          </p>
        </motion.div>

        <div className="mt-12 sm:mt-16">
          {isLoading ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((item) => (
                <div
                  key={item}
                  className="min-h-[390px] animate-pulse rounded-[30px] bg-rathna-blue/10 lg:min-h-[420px]"
                />
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-[1.12fr_0.88fr]">
              {posts.map((post, index) => (
                <StoryCard key={post._id} post={post} index={index} />
              ))}
            </div>
          ) : (
            <EmptyStories />
          )}
        </div>
      </div>
    </section>
  )
}

export { Blogs }
