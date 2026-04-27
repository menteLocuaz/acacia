// src/styles/breakpoints.ts

// ── Tamaños base ──────────────────────────────────────────────────────────────
const sizes = {
  xs:      '375px',   // móviles pequeños (iPhone SE)
  mobile:  '576px',   // móviles estándar
  tablet:  '768px',   // tablets portrait
  laptop:  '992px',   // laptops / tablets landscape
  desktop: '1200px',  // desktops
  wide:    '1440px',  // pantallas anchas
  ultra:   '1920px',  // 4K / ultra wide
} as const;

type SizeKey = keyof typeof sizes;

// ── Min-width (mobile first) ──────────────────────────────────────────────────
export const Device = {
  xs:      `(min-width: ${sizes.xs})`,
  mobile:  `(min-width: ${sizes.mobile})`,
  tablet:  `(min-width: ${sizes.tablet})`,
  laptop:  `(min-width: ${sizes.laptop})`,
  desktop: `(min-width: ${sizes.desktop})`,
  wide:    `(min-width: ${sizes.wide})`,
  ultra:   `(min-width: ${sizes.ultra})`,
} as const;

// ── Max-width (desktop first) ─────────────────────────────────────────────────
export const DeviceMax = {
  xs:      `(max-width: ${sizes.xs})`,
  mobile:  `(max-width: ${sizes.mobile})`,
  tablet:  `(max-width: ${sizes.tablet})`,
  laptop:  `(max-width: ${sizes.laptop})`,
  desktop: `(max-width: ${sizes.desktop})`,
  wide:    `(max-width: ${sizes.wide})`,
  ultra:   `(max-width: ${sizes.ultra})`,
} as const;

// ── Rangos exactos (between) ──────────────────────────────────────────────────
export const DeviceRange = {
  mobileOnly:  `(min-width: ${sizes.xs}) and (max-width: ${sizes.mobile})`,
  tabletOnly:  `(min-width: ${sizes.mobile}) and (max-width: ${sizes.tablet})`,
  laptopOnly:  `(min-width: ${sizes.tablet}) and (max-width: ${sizes.laptop})`,
  desktopOnly: `(min-width: ${sizes.laptop}) and (max-width: ${sizes.desktop})`,
  wideOnly:    `(min-width: ${sizes.desktop}) and (max-width: ${sizes.wide})`,
} as const;

// ── Helper: media query dinámica ──────────────────────────────────────────────
export const mq = (breakpoint: SizeKey) =>
  `@media (min-width: ${sizes[breakpoint]})`;

export const mqMax = (breakpoint: SizeKey) =>
  `@media (max-width: ${sizes[breakpoint]})`;

export const mqBetween = (min: SizeKey, max: SizeKey) =>
  `@media (min-width: ${sizes[min]}) and (max-width: ${sizes[max]})`;

// ── Helper: orientación ───────────────────────────────────────────────────────
export const Orientation = {
  portrait:  '(orientation: portrait)',
  landscape: '(orientation: landscape)',
} as const;

// ── Helper: preferencias del sistema ─────────────────────────────────────────
export const Preference = {
  darkMode:       '(prefers-color-scheme: dark)',
  lightMode:      '(prefers-color-scheme: light)',
  reducedMotion:  '(prefers-reduced-motion: reduce)',
  highContrast:   '(prefers-contrast: high)',
} as const;