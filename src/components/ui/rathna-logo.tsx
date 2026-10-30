import type { HTMLAttributes } from "react"

import logoImage from "../../../img/Rathna Enterprises.png"

type RathnaLogoProps = HTMLAttributes<HTMLSpanElement> & {
  decorative?: boolean
}

function RathnaLogo({
  className = "",
  decorative = false,
  ...props
}: RathnaLogoProps) {
  return (
    <span
      {...props}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : "Rathna Enterprises — Sign of Trust, since 1981"}
      className={`relative inline-block aspect-[451/529] shrink-0 overflow-hidden ${className}`}
    >
      <img
        src={logoImage}
        alt=""
        draggable={false}
        className="pointer-events-none absolute left-1/2 top-1/2 w-[426%] max-w-none -translate-x-1/2 -translate-y-1/2 select-none"
      />
    </span>
  )
}

export { RathnaLogo }
