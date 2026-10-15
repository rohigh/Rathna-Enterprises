export type PortableTextSpan = {
  _key: string
  _type: "span"
  marks?: string[]
  text: string
}

export type PortableTextBlock = {
  _key: string
  _type: "block"
  children?: PortableTextSpan[]
  level?: number
  listItem?: "bullet" | "number"
  markDefs?: Array<{
    _key: string
    _type: string
    href?: string
  }>
  style?: "normal" | "h2" | "h3" | "blockquote"
}

export type BlogPost = {
  _id: string
  author?: string
  body?: PortableTextBlock[]
  category?: string
  excerpt?: string
  imageAlt?: string
  imageUrl?: string
  publishedAt?: string
  readingTime?: number
  slug: string
  title: string
}

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID?.trim() || "moxg2req"
const dataset = import.meta.env.VITE_SANITY_DATASET?.trim() || "production"
const apiVersion = "2025-02-19"

export const isSanityConfigured = Boolean(projectId)

async function querySanity<T>(query: string): Promise<T> {
  if (!projectId) {
    throw new Error("Sanity is not configured")
  }

  const url = new URL(
    `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}`,
  )
  url.searchParams.set("query", query)

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Sanity request failed with ${response.status}`)
  }

  const payload = (await response.json()) as { result: T }
  return payload.result
}

const previewFields = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  author,
  publishedAt,
  readingTime,
  "imageUrl": mainImage.asset->url,
  "imageAlt": mainImage.alt
`

export function getLatestPosts() {
  return querySanity<BlogPost[]>(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...3] {${previewFields}}`,
  )
}

export function getPostBySlug(slug: string) {
  const safeSlug = JSON.stringify(slug)

  return querySanity<BlogPost | null>(
    `*[_type == "post" && slug.current == ${safeSlug}][0] {${previewFields}, body}`,
  )
}
