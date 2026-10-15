import { Navbar } from "@/components/navbar"
import { BlogArticle } from "@/components/blog/blog-article"
import { AboutStory } from "@/components/sections/about-story"
import { Blogs } from "@/components/sections/blogs"
import { ContactFooter } from "@/components/sections/contact-footer"
import { PartnerBrands } from "@/components/sections/partner-brands"
import { ProductCategories } from "@/components/sections/product-categories"
import { VisitBranches } from "@/components/sections/visit-branches"
import { WhyRathna } from "@/components/sections/why-rathna"
import { Hero } from "@/components/ui/animated-hero"

function App() {
  const blogMatch = window.location.pathname.match(/^\/blog\/([^/]+)\/?$/)
  const blogSlug = blogMatch?.[1] ? decodeURIComponent(blogMatch[1]) : null

  return (
    <>
      <Navbar />
      <main>
        {blogSlug ? (
          <BlogArticle slug={blogSlug} />
        ) : (
          <>
            <Hero />
            <WhyRathna />
            <AboutStory />
            <ProductCategories />
            <PartnerBrands />
            <Blogs />
            <VisitBranches />
          </>
        )}
      </main>
      <ContactFooter />
    </>
  )
}

export default App
