import { Navbar } from "@/components/navbar"
import { AboutStory } from "@/components/sections/about-story"
import { ContactFooter } from "@/components/sections/contact-footer"
import { PartnerBrands } from "@/components/sections/partner-brands"
import { ProductCategories } from "@/components/sections/product-categories"
import { VisitBranches } from "@/components/sections/visit-branches"
import { WhyRathna } from "@/components/sections/why-rathna"
import { Hero } from "@/components/ui/animated-hero"

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhyRathna />
        <AboutStory />
        <ProductCategories />
        <PartnerBrands />
        <VisitBranches />
      </main>
      <ContactFooter />
    </>
  )
}

export default App
