import { Suspense, useEffect, useRef, useState, type ReactNode } from "react"

type DeferredSectionProps = {
  children: ReactNode
  id: string
  minHeight: string
}

function HashAnchorStabilizer({ id }: { id: string }) {
  useEffect(() => {
    if (window.location.hash !== `#${id}`) return

    let frame = 0
    const alignTarget = () => {
      if (window.location.hash !== `#${id}`) return
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ block: "start" })
      })
    }

    alignTarget()

    if (typeof ResizeObserver !== "function") {
      const timer = window.setTimeout(alignTarget, 600)
      return () => {
        window.cancelAnimationFrame(frame)
        window.clearTimeout(timer)
      }
    }

    const observer = new ResizeObserver(alignTarget)
    observer.observe(document.body)
    const stopTimer = window.setTimeout(() => observer.disconnect(), 3000)

    return () => {
      observer.disconnect()
      window.clearTimeout(stopTimer)
      window.cancelAnimationFrame(frame)
    }
  }, [id])

  return null
}

function DeferredSection({ children, id, minHeight }: DeferredSectionProps) {
  const slotRef = useRef<HTMLDivElement | null>(null)
  const [shouldRender, setShouldRender] = useState(
    () => window.location.hash === `#${id}`,
  )

  useEffect(() => {
    if (shouldRender) return

    const slot = slotRef.current
    if (!slot) return

    const revealForHash = () => {
      if (window.location.hash === `#${id}`) setShouldRender(true)
    }

    if (typeof IntersectionObserver !== "function") {
      setShouldRender(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true)
          observer.disconnect()
        }
      },
      { rootMargin: "900px 0px" },
    )

    observer.observe(slot)
    window.addEventListener("hashchange", revealForHash)

    return () => {
      observer.disconnect()
      window.removeEventListener("hashchange", revealForHash)
    }
  }, [id, shouldRender])

  const placeholder = (
    <div
      aria-hidden="true"
      className="deferred-placeholder"
      style={{ minHeight }}
    />
  )

  return (
    <div
      ref={slotRef}
      id={shouldRender ? undefined : id}
      aria-hidden={shouldRender ? undefined : true}
      className="deferred-content"
      style={shouldRender ? undefined : { minHeight }}
    >
      {shouldRender ? (
        <Suspense fallback={placeholder}>
          {children}
          <HashAnchorStabilizer id={id} />
        </Suspense>
      ) : null}
    </div>
  )
}

export { DeferredSection }
