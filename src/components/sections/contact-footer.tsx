import { KilnWordmarkFooter } from "@/components/ui/kiln-wordmark-footer"

const phonePrimary = "+919445623111"
const email = "rathnasuthakar@gmail.com"

function ContactFooter() {
  return (
    <KilnWordmarkFooter
      brand="Rathna Enterprises"
      wordmark="Rathna"
      motto={["Need something", "for your home?", "Talk to Rathna."]}
      address={[
        "103, Hospital Road",
        "Anand Nagar, Maduranthakam",
        "Tamil Nadu 603306",
      ]}
      contactLinks={[
        { label: "+91 94456 23111", href: `tel:${phonePrimary}` },
        { label: "+91 94432 53111", href: "tel:+919443253111" },
        { label: "044 2755 3111", href: "tel:+914427553111" },
        { label: email, href: `mailto:${email}` },
      ]}
      navigation={[
        [
          { label: "Home", href: "#home" },
          { label: "Why Rathna", href: "#why-rathna" },
          { label: "About", href: "#about" },
        ],
        [
          { label: "Products", href: "#products" },
          { label: "Brands", href: "#brands" },
          { label: "Blogs", href: "#blogs" },
        ],
        [
          { label: "Branches", href: "#branches" },
          { label: "Contact", href: "#contact" },
        ],
      ]}
      actionLinks={[
        { label: "Call the store", href: `tel:${phonePrimary}` },
        { label: "Email us", href: `mailto:${email}` },
        {
          label: "Get directions",
          href: "https://www.google.com/maps/search/?api=1&query=Rathna+Enterprises+103+Hospital+Road+Maduranthakam+Tamil+Nadu+603306",
        },
      ]}
      year={new Date().getFullYear()}
      registry="Family-run since 1981 — Maduranthakam"
      defaultTile={0}
      className="mt-24 rounded-t-[30px] sm:mt-32 sm:rounded-t-[44px]"
    />
  )
}

export { ContactFooter }
