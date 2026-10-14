import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const links = [
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Brands", href: "#brands" },
  { label: "Blogs", href: "#blogs" },
  { label: "Branches", href: "#branches" },
]

function BrandMark() {
  return (
    <span className="grid size-[30px] shrink-0 place-items-center rounded-full bg-rathna-blue text-kolam-gold">
      <svg
        aria-hidden="true"
        className="size-5 overflow-visible"
        viewBox="0 0 32 32"
        fill="none"
      >
        <path
          d="M16 2.75v26.5M2.75 16h26.5M6.63 6.63l18.74 18.74M25.37 6.63 6.63 25.37"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
        <circle
          cx="16"
          cy="16"
          r="5.25"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    </span>
  )
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 28)
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false)
    }
    const handleResize = () => {
      if (window.innerWidth > 880) setIsOpen(false)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-3.5 sm:px-6 min-[881px]:px-10 min-[881px]:pt-[22px]">
      <motion.nav
        aria-label="Primary navigation"
        layout
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className={cn(
          "pointer-events-auto mx-auto w-full overflow-hidden border border-deep-navy/10 bg-pearl-white/95 text-deep-navy shadow-[0_10px_40px_rgba(20,35,63,0.09)] backdrop-blur-xl transition-[max-width,box-shadow] duration-300",
          "max-w-[430px] rounded-[22px] min-[881px]:max-w-[1100px] min-[881px]:rounded-full",
          isScrolled &&
            "max-w-[400px] shadow-[0_8px_28px_rgba(20,35,63,0.13)] min-[881px]:max-w-[970px]",
          isOpen && "shadow-[0_16px_48px_rgba(20,35,63,0.16)]",
        )}
      >
        <div className="flex min-h-16 items-center justify-between gap-5 px-2.5 py-2.5 pl-4 min-[881px]:min-h-[66px] min-[881px]:px-3 min-[881px]:pl-[22px]">
          <a
            href="#home"
            aria-label="Rathna Enterprises home"
            className="inline-flex shrink-0 items-center gap-2.5 font-display text-[1rem] font-bold leading-none tracking-[-0.025em] text-rathna-blue sm:text-[1.12rem]"
            onClick={() => setIsOpen(false)}
          >
            <BrandMark />
            <span>
              Rathna <span className="font-medium">Enterprises</span>
            </span>
          </a>

          <div className="hidden items-center justify-center gap-4 min-[881px]:flex lg:gap-7">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link relative py-2 font-body text-[1.02rem] font-semibold leading-none"
              >
                {link.label}
              </a>
            ))}
          </div>

          <Button asChild className="hidden min-[881px]:inline-flex">
            <a href="#contact">
              Contact us <ArrowRight />
            </a>
          </Button>

          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            className="grid size-11 shrink-0 place-items-center rounded-full bg-rathna-blue text-pearl-white outline-none transition-colors hover:bg-deep-navy focus-visible:ring-[3px] focus-visible:ring-rathna-blue/30 min-[881px]:hidden"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden min-[881px]:hidden"
            >
              <div className="flex flex-col px-4 pb-5">
                {links.map((link, index) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex items-baseline gap-3 border-b border-deep-navy/10 py-3 font-display text-[1.6rem] font-semibold leading-none tracking-[-0.025em]"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="min-w-5 font-body text-xs font-bold text-rathna-blue">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </a>
                ))}
                <Button asChild className="mt-5 self-start">
                  <a href="#contact" onClick={() => setIsOpen(false)}>
                    Contact us <ArrowRight />
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  )
}

export { Navbar }
