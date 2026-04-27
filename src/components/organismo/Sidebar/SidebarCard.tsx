// src/components/molecules/SidebarCard/SidebarCard.tsx
import styled, { keyframes } from "styled-components";
import { type ReactNode } from "react";
import { Btnsave } from "../../moleculas/Btnsave";
import { Icono } from "../../atomos/Icono";

// ── Tipos ─────────────────────────────────────────────────────────────────────
interface SidebarCardProps {
  titulo?: string;
  subtitulo?: string;
  icono?: ReactNode;
  btnTitulo?: string;
  btnBgcolor?: string;
  btnVariant?: "primary" | "success" | "danger" | "warning" | "ghost" | "outline";
  onAction?: () => void;
  loading?: boolean;
  accentColor?: string;
}

// ── Animaciones ───────────────────────────────────────────────────────────────
const floatAnim = keyframes`
  0%, 100% { transform: translate(50%, 0px);   }
  50%       { transform: translate(50%, -5px);  }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0);   }
`;

const pulseCircle = keyframes`
  0%, 100% { transform: scale(1);    opacity: 0.6; }
  50%       { transform: scale(1.08); opacity: 0.9; }
`;

// ── Styled ────────────────────────────────────────────────────────────────────
const Container = styled.div<{ $accent?: string }>`
  width:      100%;
  padding:    1rem;
  margin-top: 28px;
  text-align: center;
  position:   relative;
  animation:  ${fadeIn} 0.4s ease;

  /* ── Ícono flotante ── */
  .icon-wrapper {
    position:   absolute;
    top:        -14px;
    right:      50%;
    transform:  translate(50%);
    z-index:    10;
    animation:  ${floatAnim} 3s ease-in-out infinite;

    .icon-bubble {
      width:            52px;
      height:           52px;
      border-radius:    50%;
      background:       ${({ theme, $accent }) => $accent ?? theme.color.carousel};
      display:          flex;
      align-items:      center;
      justify-content:  center;
      box-shadow:       0 4px 16px rgba(0,0,0,0.25),
                        0 0 0 4px ${({ theme }) => theme.bg.base};
      font-size:        1.6rem;
      color:            #fff;
      transition:       ${({ theme }) => theme.transition.normal};

      &:hover { transform: scale(1.1); }
    }
  }

  /* ── Card ── */
  .card-content {
    position:      relative;
    padding:       2rem 1rem 1.2rem;
    background:    ${({ theme, $accent }) => $accent ?? theme.color.carousel};
    border-radius: ${({ theme }) => theme.border.radius.lg};
    overflow:      hidden;
    box-shadow:    ${({ theme }) => theme.shadow.md};
    transition:    ${({ theme }) => theme.transition.normal};

    &:hover {
      box-shadow: ${({ theme }) => theme.shadow.lg};
      transform:  translateY(-2px);
    }

    /* Círculos decorativos */
    .circle {
      position:      absolute;
      background:    rgba(255,255,255,0.15);
      border-radius: 50%;
      animation:     ${pulseCircle} 4s ease-in-out infinite;
    }
    .circle-1 {
      width:  110px;
      height: 110px;
      top:    -45px;
      left:   -45px;
      animation-delay: 0s;
    }
    .circle-2 {
      width:  140px;
      height: 140px;
      bottom: -75px;
      right:  -65px;
      animation-delay: 1s;
    }
    .circle-3 {
      width:  60px;
      height: 60px;
      top:    10px;
      right:  10px;
      opacity: 0.08;
      animation-delay: 2s;
    }

    /* Texto */
    .card-title {
      font-size:   1.05rem;
      font-weight: ${({ theme }) => theme.font.weight.bold};
      color:       #fff;
      margin:      0.6rem 0 0.25rem;
      position:    relative;
      z-index:     1;
      text-shadow: 0 1px 4px rgba(0,0,0,0.2);
    }

    .card-subtitle {
      font-size:   ${({ theme }) => theme.font.sm};
      color:       rgba(255,255,255,0.75);
      margin:      0 0 1rem;
      position:    relative;
      z-index:     1;
    }

    /* Botón */
    .btn-wrapper {
      position: relative;
      z-index:  1;
    }
  }
`;

// ── Componente ────────────────────────────────────────────────────────────────
export function SidebarCard({
  titulo = "Cerrar sesión",
  subtitulo = "¿Deseas salir del sistema?",
  icono,
  btnTitulo = "Cerrar sesión",
  btnBgcolor,
  btnVariant = "ghost",
  onAction,
  loading = false,
  accentColor,
}: SidebarCardProps) {
  return (
    <Container $accent={accentColor}>

      {/* Ícono flotante */}
      <div className="icon-wrapper">
        <div className="icon-bubble">
          {icono
            ? <Icono size="lg">{icono}</Icono>
            : <span>👤</span>
          }
        </div>
      </div>

      {/* Card */}
      <div className="card-content">
        <div className="circle circle-1" />
        <div className="circle circle-2" />
        <div className="circle circle-3" />

        <h3 className="card-title">{titulo}</h3>
        {subtitulo && <p className="card-subtitle">{subtitulo}</p>}

        <div className="btn-wrapper">
          <Btnsave
            titulo={btnTitulo}
            bgcolor={btnBgcolor}
            variant={btnVariant}
            funcion={onAction}
            loading={loading}
            fullWidth
            size="sm"
          />
        </div>
      </div>

    </Container>
  );
}