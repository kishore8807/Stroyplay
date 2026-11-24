const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function Play({ size = 20, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...rest}>
      <path d="M8 5.4v13.2L19 12 8 5.4Z" fill="currentColor" />
    </svg>
  )
}

export function Info({ size = 20, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...rest}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </svg>
  )
}

export function Search({ size = 20, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...rest}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" />
    </svg>
  )
}

export function Plus({ size = 20, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...rest}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function Check({ size = 20, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...rest}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  )
}

export function Star({ size = 20, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...rest}>
      <path
        d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function Menu({ size = 22, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...rest}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

export function Close({ size = 20, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...rest}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

export function ChevronLeft({ size = 20, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...rest}>
      <path d="m15 5-7 7 7 7" />
    </svg>
  )
}

export function ChevronRight({ size = 20, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...rest}>
      <path d="m9 5 7 7-7 7" />
    </svg>
  )
}

export function Bookmark({ size = 20, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...rest}>
      <path d="M6 4h12v17l-6-4-6 4V4Z" />
    </svg>
  )
}
