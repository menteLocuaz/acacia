// src/components/atoms/Icono/Icono.tsx
import styled from "styled-components";
import { type ReactNode } from "react";

// ── Tipos ─────────────────────────────────────────────────────────────────────
type IconoSize    = "xs" | "sm" | "md" | "lg" | "xl";
type IconoVariant = "default" | "primary" | "success" | "danger" | "warning" | "muted";

interface IconoProps {
  children:  ReactNode;
  size?:     IconoSize;
  variant?:  IconoVariant;
  spin?:     boolean;
  pulse?:    boolean;
  className?: string;
}

// ── Tamaños ───────────────────────────────────────────────────────────────────
const iconSizes: Record<IconoSize, string> = {
  xs: "14px",
  sm: "16px",
  md: "20px",
  lg: "24px",
  xl: "32px",
};

// ── Styled ────────────────────────────────────────────────────────────────────
const IconoWrapper = styled.span<{
  $size:    IconoSize;
  $variant: IconoVariant;
  $spin:    boolean;
  $pulse:   boolean;
}>`
  display:     inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  line-height: 1;
  font-size:   ${({ $size }) => iconSizes[$size]};
  transition:  color ${({ theme }) => theme.transition.fast};

  /* Variantes de color */
  color: ${({ $variant, theme }) => {
    switch ($variant) {
      case "primary": return theme.color.primary;
      case "success": return theme.color.success;
      case "danger":  return theme.color.danger;
      case "warning": return theme.color.warning;
      case "muted":   return theme.text.muted;
      default:        return theme.text.primary;
    }
  }};

  /* Animaciones */
  @keyframes icon-spin  { to { transform: rotate(360deg); } }
  @keyframes icon-pulse { 0%,100% { opacity:1; } 50% { opacity:.4; } }

  animation: ${({ $spin, $pulse }) =>
    $spin  ? "icon-spin  0.7s linear infinite" :
    $pulse ? "icon-pulse 1.2s ease-in-out infinite" :
    "none"};

  /* SVG / react-icons heredan el color */
  svg { width: 1em; height: 1em; }
`;

// ── Componente ────────────────────────────────────────────────────────────────
export function Icono({
  children,
  size      = "md",
  variant   = "default",
  spin      = false,
  pulse     = false,
  className,
}: IconoProps) {
  return (
    <IconoWrapper
      $size={size}
      $variant={variant}
      $spin={spin}
      $pulse={pulse}
      className={className}
      aria-hidden="true"
    >
      {children}
    </IconoWrapper>
  );
}