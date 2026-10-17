import { lazy, Suspense } from "react"

import { DeferredSection } from "@/components/deferred-section"
import { Navbar } from "@/components/navbar"
import { WhyRathna } from "@/components/sections/why-rathna"
import { Hero } from "@/components/ui/animated-hero"

const BlogArticle = lazy(() =>
  import("@/components/blog/blog-article").then((module) => ({
    default: module.BlogArticle,
  })),
)
const AboutStory = lazy(() =>
  import("@/components/sections/about-story").then((module) => ({
    default: module.AboutStory,
  })),
)
const ProductCategories = lazy(() =>
  import("@/components/sections/product-categories").then((module) => ({
    default: module.ProductCategories,
  })),
)
const PartnerBrands = lazy(() =>
  import("@/components/sections/partner-brands").then((module) => ({
    default: module.PartnerBrands,
  })),
)
const Blogs = lazy(() =>
  import("@/components/sections/blogs").then((module) => ({
    default: module.Blogs,
  })),
)
const VisitBranches = lazy(() =>
  import("@/components/sections/visit-branches").then((module) => ({
    default: module.VisitBranches,
  })),
)
const ContactFooter = lazy(() =>
  import("@/components/sections/contact-footer").then((module) => ({
    default: module.ContactFooter,
  })),
)

function PageLoading() {
  return (
    <div
      className="min-h-svh bg-pearl-white"
      role="status"
      aria-label="Loading page"
    />
  )
}

function App() {
  const blogMatch = window.location.pathname.match(/^\/blog\/([^/]+)\/?$/)
  const blogSlug = blogMatch?.[1] ? decodeURIComponent(blogMatch[1]) : null

  return (
    <>
      <Navbar />
      <main>
        {blogSlug ? (
          <Suspense fallback={<PageLoading />}>
            <BlogArticle slug={blogSlug} />
          </Suspense>
        ) : (
          <>
            <Hero />
            <WhyRathna />
            <DeferredSection id="about" minHeight="1200px">
              <AboutStory />
            </DeferredSection>
            <DeferredSection id="products" minHeight="1500px">
              <ProductCategories />
            </DeferredSection>
            <DeferredSection id="brands" minHeight="1050px">
              <PartnerBrands />
            </DeferredSection>
            <DeferredSection id="blogs" minHeight="900px">
              <Blogs />
            </DeferredSection>
            <DeferredSection id="branches" minHeight="1050px">
              <VisitBranches />
            </DeferredSection>
          </>
        )}
      </main>
      <DeferredSection id="contact" minHeight="1000px">
        <ContactFooter />
      </DeferredSection>
    </>
  )
}

export default App
