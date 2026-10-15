import { useEffect, useState, type ReactNode } from "react"
import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react"

import {
  type BlogPost,
  type PortableTextBlock,
  type PortableTextSpan,
  getPostBySlug,
  isSanityConfigured,
} from "@/lib/sanity"

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
})

function renderSpan(span: PortableTextSpan, block: PortableTextBlock) {
  let content: ReactNode = span.text

  for (const mark of span.marks || []) {
    if (mark === "strong") content = <strong>{content}</strong>
    if (mark === "em") content = <em>{content}</em>
    if (mark === "code") {
      content = (
        <code className="rounded bg-sky-tint px-1.5 py-0.5 font-mono text-[0.9em] text-deep-navy">
          {content}
        </code>
      )
    }

    const link = block.markDefs?.find((definition) => definition._key === mark)
    if (link?.href) {
      content = (
        <a
          href={link.href}
          target={link.href.startsWith("http") ? "_blank" : undefined}
          rel={link.href.startsWith("http") ? "noreferrer" : undefined}
          className="font-bold text-rathna-blue underline decoration-kolam-gold decoration-2 underline-offset-4"
        >
          {content}
        </a>
      )
    }
  }

  return <span key={span._key}>{content}</span>
}

function RichText({ blocks }: { blocks?: PortableTextBlock[] }) {
  if (!blocks?.length) return null

  return (
    <div className="space-y-6 font-body text-xl font-medium leading-[1.72] text-deep-navy/76 sm:text-[1.35rem]">
      {blocks.map((block) => {
        const content = block.children?.map((span) => renderSpan(span, block))

        if (block.listItem) {
          const Tag = block.listItem === "number" ? "ol" : "ul"
          return (
            <Tag
              key={block._key}
              className={`ml-6 ${block.listItem === "number" ? "list-decimal" : "list-disc"}`}
            >
              <li className="pl-2 marker:font-bold marker:text-kolam-gold">{content}</li>
            </Tag>
          )
        }

        if (block.style === "h2") {
          return (
            <h2
              key={block._key}
              className="pt-5 font-display text-3xl font-semibold leading-tight tracking-[-0.035em] text-deep-navy sm:text-4xl"
            >
              {content}
            </h2>
          )
        }

        if (block.style === "h3") {
          return (
            <h3
              key={block._key}
              className="pt-3 font-display text-2xl font-semibold tracking-[-0.025em] text-deep-navy sm:text-3xl"
            >
              {content}
            </h3>
          )
        }

        if (block.style === "blockquote") {
          return (
            <blockquote
              key={block._key}
              className="rounded-r-[24px] border-l-4 border-kolam-gold bg-sky-tint/60 px-6 py-5 font-display text-2xl font-medium italic leading-snug text-deep-navy sm:text-3xl"
            >
              {content}
            </blockquote>
          )
        }

        return <p key={block._key}>{content}</p>
      })}
    </div>
  )
}

function BlogArticle({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isSanityConfigured) {
      setIsLoading(false)
      return
    }

    let isMounted = true

    getPostBySlug(slug)
      .then((result) => {
        if (isMounted) setPost(result)
      })
      .catch(() => {
        if (isMounted) setPost(null)
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [slug])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-pearl-white px-5 pb-24 pt-36 sm:px-8">
        <div className="mx-auto max-w-4xl animate-pulse">
          <div className="h-5 w-36 rounded-full bg-rathna-blue/10" />
          <div className="mt-10 h-20 max-w-3xl rounded-3xl bg-rathna-blue/10" />
          <div className="mt-8 h-[430px] rounded-[34px] bg-rathna-blue/10" />
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <section className="grid min-h-[78vh] place-items-center bg-pearl-white px-5 pb-24 pt-36 text-center">
        <div className="max-w-2xl">
          <div className="font-body text-sm font-bold uppercase tracking-[0.16em] text-rathna-blue">
            Rathna stories
          </div>
          <h1 className="mt-4 font-display text-5xl font-semibold tracking-[-0.055em] text-deep-navy sm:text-7xl">
            This story isn&apos;t available yet.
          </h1>
          <p className="mx-auto mt-5 max-w-xl font-body text-xl font-medium leading-relaxed text-deep-navy/65">
            It may still be a draft, or the link may have changed. Browse the latest advice from our home page.
          </p>
          <a
            href="/#blogs"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-kolam-gold px-5 py-3 font-body text-base font-bold text-deep-navy shadow-[0_5px_0_#14233f]"
          >
            <ArrowLeft className="size-4" /> Back to stories
          </a>
        </div>
      </section>
    )
  }

  const publishedDate = post.publishedAt ? new Date(post.publishedAt) : null
  const formattedDate =
    publishedDate && !Number.isNaN(publishedDate.getTime())
      ? dateFormatter.format(publishedDate)
      : "Rathna Enterprises"

  return (
    <article className="bg-pearl-white pb-24 pt-32 sm:pb-32 sm:pt-40">
      <header className="px-5 sm:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <a
            href="/#blogs"
            className="inline-flex items-center gap-2 font-body text-base font-bold text-rathna-blue hover:underline"
          >
            <ArrowLeft className="size-4" /> Back to all stories
          </a>
          <div className="mt-8 font-body text-sm font-bold uppercase tracking-[0.18em] text-rathna-blue">
            {post.category || "Rathna guide"}
          </div>
          <h1 className="mx-auto mt-4 max-w-5xl font-display text-[clamp(3rem,7.5vw,6.4rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-deep-navy">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mx-auto mt-7 max-w-3xl font-body text-xl font-medium leading-relaxed text-deep-navy/65 sm:text-2xl">
              {post.excerpt}
            </p>
          )}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-body text-base font-bold text-deep-navy/55">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="size-4 text-kolam-gold" /> {formattedDate}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock3 className="size-4 text-kolam-gold" /> {post.readingTime || 4} min read
            </span>
            <span>By {post.author || "Rathna Team"}</span>
          </div>
        </div>
      </header>

      <div className="mx-auto mt-12 max-w-6xl px-5 sm:mt-16 sm:px-8">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[30px] bg-deep-navy shadow-[0_28px_80px_rgba(20,35,63,0.16)] sm:rounded-[40px]">
          {post.imageUrl ? (
            <img src={post.imageUrl} alt={post.imageAlt || ""} className="size-full object-cover" />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgba(229,166,58,0.65),transparent_22%),linear-gradient(145deg,#1e4fa3,#14233f)]">
              <div className="absolute -bottom-24 -right-12 size-80 rounded-full border-[62px] border-pearl-white/10" />
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-3xl px-5 sm:mt-16 sm:px-8">
        <RichText blocks={post.body} />
      </div>
    </article>
  )
}

export { BlogArticle }
