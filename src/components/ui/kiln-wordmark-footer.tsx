import * as React from "react"

type FooterLink = {
  label: string
  href: string
}

type Tile = {
  discX: string
  discY: string
  discSize: string
  slabLeft: string
  slabWidth: string
}

const tiles: Tile[] = [
  { discX: "38.5%", discY: "50%", discSize: "83%", slabLeft: "75.5%", slabWidth: "24.5%" },
  { discX: "61.5%", discY: "50%", discSize: "83%", slabLeft: "0%", slabWidth: "24.5%" },
  { discX: "50%", discY: "104%", discSize: "100%", slabLeft: "50%", slabWidth: "0%" },
  { discX: "100%", discY: "0%", discSize: "120%", slabLeft: "0%", slabWidth: "30%" },
]

type KilnWordmarkFooterProps = {
  brand: string
  wordmark: string
  motto: string[]
  address: string[]
  contactLinks: FooterLink[]
  navigation: FooterLink[][]
  actionLinks: FooterLink[]
  year: number
  registry: string
  surface?: string
  deep?: string
  ink?: string
  paper?: string
  defaultTile?: number
  className?: string
}

const styles = `
  .kwf{--kwf-px:0px;--kwf-py:0px;position:relative;isolation:isolate;overflow:hidden;scroll-margin-top:7rem;color:var(--kwf-ink);background:var(--kwf-deep);font-family:"Darker Grotesque",sans-serif;-webkit-font-smoothing:antialiased;text-transform:uppercase}
  .kwf a{color:inherit;text-decoration:none}
  .kwf button{font:inherit;color:inherit;background:none;border:0;padding:0;margin:0;cursor:pointer}
  .kwf p,.kwf ul,.kwf h2,.kwf h3{margin:0;padding:0}
  .kwf ul{list-style:none}
  .kwf-tile{position:absolute;inset:0;z-index:-1;overflow:hidden;pointer-events:none}
  .kwf-disc{position:absolute;left:var(--kwf-disc-x);top:var(--kwf-disc-y);width:var(--kwf-disc-size);aspect-ratio:1;border-radius:50%;background:var(--kwf-surface);transform:translate(calc(-50% + var(--kwf-px)),calc(-50% + var(--kwf-py)));transition:left .85s cubic-bezier(.2,.8,.2,1),top .85s cubic-bezier(.2,.8,.2,1),width .85s cubic-bezier(.2,.8,.2,1),transform .18s ease-out}
  .kwf-slab{position:absolute;inset-block:0;left:var(--kwf-slab-left);width:var(--kwf-slab-width);background:var(--kwf-surface);transition:left .85s cubic-bezier(.2,.8,.2,1),width .85s cubic-bezier(.2,.8,.2,1)}
  .kwf-in{position:relative;padding:clamp(104px,7vw,124px) clamp(22px,2.2vw,40px) clamp(22px,2.2vw,40px)}
  .kwf-top{display:flex;justify-content:space-between;align-items:flex-start;gap:2rem;min-height:clamp(250px,27vw,490px)}
  .kwf-motto{max-width:11ch;font-family:"Outfit",sans-serif;font-size:clamp(2rem,4vw,4.7rem);font-weight:600;line-height:.91;letter-spacing:-.045em}
  .kwf-motto span{display:block}
  .kwf-key{position:relative;flex:none;width:clamp(42px,3.6vw,62px);height:clamp(76px,7vw,112px);border-radius:12px;background:var(--kwf-ink);color:var(--kwf-paper);overflow:hidden;display:grid;place-items:center;transition:transform .35s cubic-bezier(.2,.8,.2,1),border-radius .35s}
  .kwf-key:hover{transform:translateY(-4px);border-radius:999px}
  .kwf-key:active{transform:translateY(1px) scale(.96)}
  .kwf-key svg{width:62%;height:auto;display:block;overflow:visible}
  .kwf-key:hover svg,.kwf-key:focus-visible svg{animation:kwf-shoot .7s cubic-bezier(.6,0,.2,1)}
  .kwf-key:focus-visible,.kwf-link:focus-visible{outline:2px solid var(--kwf-ink);outline-offset:4px}
  @keyframes kwf-shoot{0%{transform:none}45%{transform:translateY(-160%)}46%{transform:translateY(160%)}100%{transform:none}}
  .kwf-row{display:grid;grid-template-columns:1.15fr 1.45fr .8fr;gap:clamp(1.5rem,4vw,5rem);font-size:clamp(.9rem,1.2vw,1.15rem);font-weight:600;line-height:1.15;letter-spacing:.01em}
  .kwf-col h3{font-size:.78em;font-weight:700;letter-spacing:.16em;margin-bottom:1.35rem;opacity:.72}
  .kwf-addr-lines{display:grid;gap:.15rem;margin-bottom:1.2rem}
  .kwf-contact-links{display:flex;flex-direction:column;align-items:flex-start;gap:.12rem}
  .kwf-cols{display:flex;gap:.4rem clamp(1.2rem,2.5vw,3.6rem);flex-wrap:wrap}
  .kwf-cols ul{display:flex;min-width:7rem;flex-direction:column;align-items:flex-start}
  .kwf-link{position:relative;display:inline-block;padding:0 .12em;margin:0 -.12em;z-index:0;transition:color .25s}
  .kwf-link::before{content:"";position:absolute;inset:-.04em 0;background:var(--kwf-ink);transform:scaleX(0);transform-origin:right;transition:transform .35s cubic-bezier(.7,0,.2,1);z-index:-1}
  .kwf-link:hover,.kwf-link:focus-visible{color:var(--kwf-surface)}
  .kwf-link:hover::before,.kwf-link:focus-visible::before{transform:scaleX(1);transform-origin:left}
  .kwf-word{display:flex;align-items:flex-end;width:100%;margin-top:clamp(3rem,5vw,6rem);overflow:hidden;font-family:"Outfit",sans-serif;font-size:clamp(6.6rem,19.4vw,23rem);font-weight:800;line-height:.69;letter-spacing:-.085em;text-transform:lowercase;white-space:nowrap;cursor:default}
  .kwf-letter{display:inline-block;transform:translateY(118%);transform-origin:50% 100%;transition:transform 1s cubic-bezier(.16,.9,.18,1),font-weight .25s ease;transition-delay:var(--kwf-delay)}
  .kwf-shown .kwf-letter{transform:translateY(0)}
  .kwf-letter:hover{transform:translateY(0) scaleY(1.09);font-weight:900}
  .kwf-fade{opacity:0;transform:translateY(12px);transition:opacity .8s ease,transform .8s cubic-bezier(.2,.8,.2,1);transition-delay:var(--kwf-delay)}
  .kwf-shown .kwf-fade{opacity:1;transform:none}
  .kwf-bar{margin-top:clamp(1.25rem,2vw,2rem);border:1px solid currentColor;border-radius:16px;padding:.7rem 1.1rem;display:flex;align-items:center;gap:1.5rem;font-size:clamp(.72rem,.9vw,.9rem);font-weight:700;letter-spacing:.04em}
  .kwf-copy{font-family:"Outfit",sans-serif;font-size:clamp(1rem,1.55vw,1.5rem);letter-spacing:-.02em;white-space:nowrap}
  .kwf-reg{flex:1;min-width:0}
  .kwf-rights{white-space:nowrap}
  @media (max-width:760px){
    .kwf-in{padding:96px 18px 18px}
    .kwf-top{min-height:58vw}
    .kwf-motto{font-size:clamp(2rem,10vw,3.1rem)}
    .kwf-row{grid-template-columns:1fr 1fr;gap:2.25rem 1.25rem;font-size:.95rem}
    .kwf-nav{grid-column:1/-1;grid-row:2}
    .kwf-col h3{margin-bottom:.8rem}
    .kwf-cols{gap:.3rem 1.5rem}
    .kwf-cols ul{min-width:6.3rem}
    .kwf-word{margin-top:3rem;font-size:29vw;line-height:.72}
    .kwf-bar{flex-wrap:wrap;gap:.35rem 1rem;padding:.75rem .9rem;margin-top:1rem;font-size:.7rem}
    .kwf-reg{flex-basis:100%;order:3}
  }
  @media (max-width:430px){
    .kwf-row{grid-template-columns:1fr;gap:2rem}
    .kwf-nav{grid-column:auto;grid-row:auto}
    .kwf-action{grid-column:auto}
    .kwf-word{font-size:28vw}
  }
  @media (prefers-reduced-motion:reduce){
    .kwf-disc,.kwf-slab,.kwf-letter,.kwf-fade,.kwf-key,.kwf-link,.kwf-link::before{transition:none!important;animation:none!important}
    .kwf-letter,.kwf-fade{transform:none;opacity:1}
  }
`

function LinkItem({ link }: { link: FooterLink }) {
  const external = link.href.startsWith("http")

  return (
    <a
      className="kwf-link"
      href={link.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {link.label}
    </a>
  )
}

function KilnWordmarkFooter({
  brand,
  wordmark,
  motto,
  address,
  contactLinks,
  navigation,
  actionLinks,
  year,
  registry,
  surface = "#1e4fa3",
  deep = "#14233f",
  ink = "#f7f5f0",
  paper = "#1e4fa3",
  defaultTile = 0,
  className = "",
}: KilnWordmarkFooterProps) {
  const rootRef = React.useRef<HTMLElement>(null)
  const [shown, setShown] = React.useState(false)
  const [tileIndex, setTileIndex] = React.useState(
    ((Math.trunc(defaultTile) % tiles.length) + tiles.length) % tiles.length,
  )
  const tile = tiles[tileIndex]

  React.useEffect(() => {
    const element = rootRef.current
    if (!element) return

    if (typeof IntersectionObserver !== "function") {
      setShown(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 26
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 34
    event.currentTarget.style.setProperty("--kwf-px", `${x}px`)
    event.currentTarget.style.setProperty("--kwf-py", `${y}px`)
  }

  const handlePointerLeave = (event: React.PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--kwf-px", "0px")
    event.currentTarget.style.setProperty("--kwf-py", "0px")
  }

  const handlePanelClick = (event: React.MouseEvent<HTMLElement>) => {
    if ((event.target as Element).closest("a,button")) return
    if (window.getSelection()?.toString()) return
    setTileIndex((index) => (index + 1) % tiles.length)
  }

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    })
  }

  const variables = {
    "--kwf-surface": surface,
    "--kwf-deep": deep,
    "--kwf-ink": ink,
    "--kwf-paper": paper,
    "--kwf-disc-x": tile.discX,
    "--kwf-disc-y": tile.discY,
    "--kwf-disc-size": tile.discSize,
    "--kwf-slab-left": tile.slabLeft,
    "--kwf-slab-width": tile.slabWidth,
  } as React.CSSProperties

  let delay = 0
  const reveal = () => ({ "--kwf-delay": `${(delay += 55)}ms` }) as React.CSSProperties

  return (
    <footer
      id="contact"
      ref={rootRef}
      className={`kwf${shown ? " kwf-shown" : ""}${className ? ` ${className}` : ""}`}
      style={variables}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handlePanelClick}
    >
      <style>{styles}</style>
      <div className="kwf-tile" aria-hidden="true">
        <div className="kwf-disc" />
        <div className="kwf-slab" />
      </div>

      <div className="kwf-in">
        <div className="kwf-top">
          <h2 className="kwf-motto kwf-fade" style={reveal()}>
            {motto.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <button
            type="button"
            className="kwf-key kwf-fade"
            style={reveal()}
            aria-label="Back to top"
            onClick={handleBackToTop}
          >
            <svg viewBox="0 0 24 34" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M12 33V2M2 12 12 2l10 10" />
            </svg>
          </button>
        </div>

        <div className="kwf-row">
          <div className="kwf-col kwf-fade" style={reveal()}>
            <h3>Visit &amp; contact</h3>
            <div className="kwf-addr-lines">
              {address.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <div className="kwf-contact-links">
              {contactLinks.map((link) => (
                <LinkItem key={link.label} link={link} />
              ))}
            </div>
          </div>

          <nav className="kwf-col kwf-nav kwf-fade" style={reveal()} aria-label="Footer navigation">
            <h3>Explore</h3>
            <div className="kwf-cols">
              {navigation.map((column, index) => (
                <ul key={index}>
                  {column.map((link) => (
                    <li key={link.label}>
                      <LinkItem link={link} />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </nav>

          <div className="kwf-col kwf-action kwf-fade" style={reveal()}>
            <h3>Reach us</h3>
            <div className="kwf-contact-links">
              {actionLinks.map((link) => (
                <LinkItem key={link.label} link={link} />
              ))}
            </div>
          </div>
        </div>

        <p className="kwf-word" aria-label={wordmark}>
          {[...wordmark.toLowerCase()].map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              className="kwf-letter"
              aria-hidden="true"
              style={{ "--kwf-delay": `${180 + index * 70}ms` } as React.CSSProperties}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </p>

        <div className="kwf-bar kwf-fade" style={reveal()}>
          <p className="kwf-copy">©{year} {brand}</p>
          <p className="kwf-reg">{registry}</p>
          <p className="kwf-rights">All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}

export { KilnWordmarkFooter }
export type { FooterLink, KilnWordmarkFooterProps }
