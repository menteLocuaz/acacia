// src/components/molecules/Btnsave/Btnsave.tsx
import styled, { css } from "styled-components";
import { type ReactNode }    from "react";
import { Icono } from "../atomos/Icono";

// ── Tipos ─────────────────────────────────────────────────────────────────────
type BtnVariant = "primary" | "success" | "danger" | "warning" | "ghost" | "outline";
type BtnSize    = "sm" | "md" | "lg";

interface BtnsaveProps {
  titulo:     string;
  funcion?:   () => void;
  icono?:     ReactNode;
  bgcolor?:   string;
  variant?:   BtnVariant;
  size?:      BtnSize;
  url?:       string;
  disabled?:  boolean;
  loading?:   boolean;
  fullWidth?: boolean;
  type?:      "button" | "submit" | "reset";
}

// ── Variantes ─────────────────────────────────────────────────────────────────
const variantMap: Record<BtnVariant, ReturnType<typeof css>> = {
  primary: css`
    background:   ${({ theme }) => theme.color.primary};
    color:        #fff;
    border-color: ${({ theme }) => theme.color.primary};
    &:hover:not(:disabled) { background: ${({ theme }) => theme.color.primaryHover}; }
  `,
  success: css`
    background:   ${({ theme }) => theme.color.success};
    color:        #fff;
    border-color: ${({ theme }) => theme.color.success};
    &:hover:not(:disabled) { background: #16a34a; }
  `,
  danger: css`
    background:   ${({ theme }) => theme.color.danger};
    color:        #fff;
    border-color: ${({ theme }) => theme.color.danger};
    &:hover:not(:disabled) { background: #dc2626; }
  `,
  warning: css`
    background:   ${({ theme }) => theme.color.warning};
    color:        #000;
    border-color: ${({ theme }) => theme.color.warning};
    &:hover:not(:disabled) { background: #d97706; }
  `,
  ghost: css`
    background:   transparent;
    color:        ${({ theme }) => theme.text.primary};
    border-color: ${({ theme }) => theme.border.color};
    &:hover:not(:disabled) { background: ${({ theme }) => theme.bg.hover}; }
  `,
  outline: css`
    background:   transparent;
    color:        ${({ theme }) => theme.color.primary};
    border-color: ${({ theme }) => theme.color.primary};
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.color.primary};
      color:      #fff;
    }
  `,
};

// ── Tamaños ───────────────────────────────────────────────────────────────────
const sizeMap: Record<BtnSize, ReturnType<typeof css>> = {
  sm: css`
    padding:   0.35em 0.85em;
    font-size: ${({ theme }) => theme.font.sm};
    gap:       6px;
  `,
  md: css`
    padding:   0.55em 1.2em;
    font-size: ${({ theme }) => theme.font.md};
    gap:       8px;
  `,
  lg: css`
    padding:   0.75em 1.6em;
    font-size: ${({ theme }) => theme.font.lg};
    gap:       10px;
  `,
};

// ── Spinner ───────────────────────────────────────────────────────────────────
const Spinner = styled.span`
  width:        1em;
  height:       1em;
  border:       2px solid rgba(255,255,255,0.3);
  border-top-color: currentColor;
  border-radius: 50%;
  flex-shrink:  0;
  animation:    btn-spin 0.6s linear infinite;

  @keyframes btn-spin { to { transform: rotate(360deg); } }
`;

// ── Container ─────────────────────────────────────────────────────────────────
const Container = styled.button<{
  $variant:   BtnVariant;
  $size:      BtnSize;
  $bgcolor?:  string;
  $fullWidth: boolean;
}>`
  display:         inline-flex;
  align-items:     center;
  justify-content: center;
  border:          2px solid transparent;
  border-radius:   ${({ theme }) => theme.border.radius.md};
  font-family:     ${({ theme }) => theme.font.family.sans};
  font-weight:     ${({ theme }) => theme.font.weight.semibold};
  cursor:          pointer;
  white-space:     nowrap;
  text-decoration: none;
  width:           ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  transition:      ${({ theme }) => theme.transition.fast};
  box-shadow:      ${({ theme }) => theme.shadow.sm};
  outline:         none;
  user-select:     none;

  /* Tamaño */
  ${({ $size }) => sizeMap[$size]}

  /* Variante — bgcolor manual tiene prioridad */
  ${({ $variant, $bgcolor }) =>
    $bgcolor
      ? css`
          background:   ${$bgcolor};
          color:        #000;
          border-color: rgba(0,0,0,0.15);
          &:hover:not(:disabled) { filter: brightness(1.08); }
        `
      : variantMap[$variant]}

  /* Focus */
  &:focus-visible {
    outline:        2px solid ${({ theme }) => theme.color.primary};
    outline-offset: 3px;
  }

  /* Hover lift */
  &:hover:not(:disabled) {
    transform:  translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadow.md};
  }

  /* Active press */
  &:active:not(:disabled) {
    transform:  translateY(1px);
    box-shadow: ${({ theme }) => theme.shadow.sm};
  }

  /* Disabled */
  &:disabled {
    opacity:        0.5;
    cursor:         not-allowed;
    pointer-events: none;
  }
`;

// ── Componente ────────────────────────────────────────────────────────────────
export function Btnsave({
  titulo,
  funcion,
  icono,
  bgcolor,
  variant   = "primary",
  size      = "md",
  url,
  disabled  = false,
  loading   = false,
  fullWidth = false,
  type      = "button",
}: BtnsaveProps) {
  const handleClick = () => {
    if (disabled || loading) return;
    funcion?.();
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Container
      type={type}
      $variant={variant}
      $size={size}
      $bgcolor={bgcolor}
      $fullWidth={fullWidth}
      disabled={disabled || loading}
      onClick={handleClick}
      aria-busy={loading}
      aria-label={titulo}
    >
      {loading ? (
        <Spinner aria-hidden="true" />
      ) : (
        icono && (
          <Icono size={size === "lg" ? "lg" : size === "sm" ? "sm" : "md"}>
            {icono}
          </Icono>
        )
      )}
      <span>{titulo}</span>
    </Container>
  );
}