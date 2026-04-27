// src/components/organisms/Sidebar/Sidebar.tsx
import styled, { keyframes, css } from "styled-components";
import { NavLink }                 from "react-router-dom";
import {type ReactNode }               from "react";
import { mq, DeviceMax }           from "../../../styles/breackpoints";
import { SidebarCard }             from "./SidebarCard";
import { ToggleTema }              from "./ToggleTema";
import { LinksArray, SecondarylinksArray } from "../../../index";
import { v }                       from "../../../styles/variables";

// ── Tipos ─────────────────────────────────────────────────────────────────────
interface SidebarProps {
  state:    boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LinkItem {
  icon:  ReactNode;
  label: string;
  to:    string;
}

interface StyledOpen {
  $isopen: boolean;
}

// ── Constantes ────────────────────────────────────────────────────────────────
const SIDEBAR_COLLAPSED = "65px";
const SIDEBAR_EXPANDED  = "220px";

// ── Animaciones ───────────────────────────────────────────────────────────────
const floatAnim = keyframes`
  0%   { transform: translateY(0px);  }
  50%  { transform: translateY(4px);  }
  100% { transform: translateY(-4px); }
`;

const fadeLabel = keyframes`
  from { opacity: 0; transform: translateX(-6px); }
  to   { opacity: 1; transform: translateX(0);    }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0);    }
`;

// ── Componente ────────────────────────────────────────────────────────────────
export function Sidebar({ state, setState }: SidebarProps) {
  return (
    <Main $isopen={state}>

      {/* Overlay móvil */}
      {state && <Overlay onClick={() => setState(false)} />}

      {/* Botón toggle */}
      <ToggleBtn
        $isopen={state}
        onClick={() => setState(!state)}
        aria-label={state ? "Colapsar menú" : "Expandir menú"}
        title={state ? "Colapsar" : "Expandir"}
      >
        <v.iconoflechaderecha />
      </ToggleBtn>

      {/* Sidebar */}
      <Container $isopen={state}>

        {/* Logo */}
        <LogoSection $isopen={state}>
          <LogoImg $isopen={state}>
            <img src={v.logo} alt="Logo" />
          </LogoImg>
          {state && <LogoTitle>Caja</LogoTitle>}
        </LogoSection>

        <Divider />

        {/* Links primarios */}
        <NavSection>
          {LinksArray.map((link: LinkItem) => (
            <LinkItem key={link.label} link={link} isOpen={state} />
          ))}
        </NavSection>

        <Divider />

        {/* Links secundarios */}
        <NavSection>
          {SecondarylinksArray.map((link: LinkItem) => (
            <LinkItem key={link.label} link={link} isOpen={state} />
          ))}
        </NavSection>

        <Spacer />

        {/* Toggle tema */}
        <ThemeRow $isopen={state}>
          <ToggleTema />
          {state && <ThemeLabel>Tema</ThemeLabel>}
        </ThemeRow>

        <Divider />

        {/* Card logout */}
        {state && (
          <CardWrapper>
            <SidebarCard />
          </CardWrapper>
        )}

      </Container>
    </Main>
  );
}

// ── LinkItem (sub-componente) ─────────────────────────────────────────────────
function LinkItem({ link, isOpen }: { link: LinkItem; isOpen: boolean }) {
  return (
    <LinkWrapper $isopen={isOpen} title={!isOpen ? link.label : undefined}>
      <NavLink
        to={link.to}
        className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
      >
        <span className="link-icon">{link.icon}</span>
        {isOpen && <span className="link-label">{link.label}</span>}
      </NavLink>
    </LinkWrapper>
  );
}

// ── Styled Components ─────────────────────────────────────────────────────────

const Main = styled.div<StyledOpen>`
  position: relative;
  z-index:  100;
  height:   100%;
`;

const Overlay = styled.div`
  position:   fixed;
  inset:      0;
  background: rgba(0,0,0,0.4);
  z-index:    99;
  backdrop-filter: blur(2px);

  @media ${DeviceMax.mobile} { display: block; }
  ${mq("tablet")}             { display: none;  }
`;

const ToggleBtn = styled.button<StyledOpen>`
  position:        fixed;
  top:             70px;
  left:            ${({ $isopen }) => $isopen
    ? `calc(${SIDEBAR_EXPANDED} - 16px)`
    : `calc(${SIDEBAR_COLLAPSED} - 16px)`
  };
  width:           32px;
  height:          32px;
  border-radius:   50%;
  border:          none;
  background:      ${({ theme }) => theme.bg.surface};
  box-shadow:      0 0 0 1px ${({ theme }) => theme.border.color},
                   0 2px 8px rgba(0,0,0,0.15);
  display:         flex;
  align-items:     center;
  justify-content: center;
  cursor:          pointer;
  z-index:         101;
  color:           ${({ theme }) => theme.text.primary};
  transition:      left 0.25s ease, transform 0.25s ease, background 0.2s;
  transform:       ${({ $isopen }) => $isopen ? "rotate(180deg)" : "rotate(0deg)"};

  &:hover {
    background: ${({ theme }) => theme.bg.hover};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.color.primary},
                0 2px 12px rgba(0,0,0,0.2);
  }

  &:focus-visible {
    outline:        2px solid ${({ theme }) => theme.color.primary};
    outline-offset: 2px;
  }

  svg { font-size: 14px; transition: inherit; }
`;

const Container = styled.nav<StyledOpen>`
  position:    fixed;
  top:         0;
  left:        0;
  height:      100%;
  width:       ${({ $isopen }) => $isopen ? SIDEBAR_EXPANDED : SIDEBAR_COLLAPSED};
  background:  ${({ theme }) => theme.bg.base};
  border-right: 1px solid ${({ theme }) => theme.border.color};
  padding-top: 20px;
  z-index:     100;
  display:     flex;
  flex-direction: column;
  overflow-y:  auto;
  overflow-x:  hidden;
  transition:  width 0.25s ease;
  animation:   ${slideIn} 0.3s ease;

  /* Scrollbar */
  &::-webkit-scrollbar       { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb {
    background:    ${({ theme }) => theme.color.scroll};
    border-radius: 10px;
  }

  /* Mobile: full overlay */
  @media ${DeviceMax.tablet} {
    width: ${({ $isopen }) => $isopen ? "240px" : "0px"};
    box-shadow: ${({ $isopen }) => $isopen ? "4px 0 24px rgba(0,0,0,0.3)" : "none"};
  }
`;

const LogoSection = styled.div<StyledOpen>`
  display:         flex;
  align-items:     center;
  justify-content: ${({ $isopen }) => $isopen ? "flex-start" : "center"};
  padding:         0 ${({ $isopen }) => $isopen ? "16px" : "0"};
  gap:             10px;
  margin-bottom:   8px;
  min-height:      56px;
`;

const LogoImg = styled.div<StyledOpen>`
  flex-shrink: 0;
  width:       ${({ $isopen }) => $isopen ? "32px" : "36px"};
  transition:  width 0.25s ease, transform 0.3s ease;

  &:hover { transform: scale(1.1); }

  img {
    width:     100%;
    animation: ${floatAnim} 2s ease-in-out infinite alternate;
  }
`;

const LogoTitle = styled.h2`
  font-size:   1rem;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color:       ${({ theme }) => theme.text.primary};
  white-space: nowrap;
  animation:   ${fadeLabel} 0.2s ease;
`;

const NavSection = styled.div`
  display:        flex;
  flex-direction: column;
  gap:            2px;
  padding:        4px 0;
`;

const LinkWrapper = styled.div<StyledOpen>`
  position:   relative;
  margin:     2px 8px;
  border-radius: ${({ theme }) => theme.border.radius.md};
  transition: background ${({ theme }) => theme.transition.fast};

  &:hover { background: ${({ theme }) => theme.bg.hover}; }

  /* Tooltip cuando está colapsado */
  ${({ $isopen }) => !$isopen && css`
    &:hover::after {
      content:          attr(title);
      position:         absolute;
      left:             calc(100% + 12px);
      top:              50%;
      transform:        translateY(-50%);
      background:       ${({ theme }) => theme.bg.surface};
      color:            ${({ theme }) => theme.text.primary};
      border:           1px solid ${({ theme }) => theme.border.color};
      border-radius:    6px;
      padding:          5px 10px;
      font-size:        0.78rem;
      white-space:      nowrap;
      box-shadow:       0 4px 12px rgba(0,0,0,0.15);
      pointer-events:   none;
      z-index:          200;
    }
    &:hover::before {
      content:        "";
      position:       absolute;
      left:           calc(100% + 6px);
      top:            50%;
      transform:      translateY(-50%);
      border:         5px solid transparent;
      border-right-color: ${({ theme }) => theme.border.color};
      pointer-events: none;
      z-index:        200;
    }
  `}

  .nav-link {
    display:         flex;
    align-items:     center;
    gap:             10px;
    padding:         10px ${({ $isopen }) => $isopen ? "12px" : "0"};
    justify-content: ${({ $isopen }) => $isopen ? "flex-start" : "center"};
    text-decoration: none;
    color:           ${({ theme }) => theme.text.secondary};
    border-radius:   ${({ theme }) => theme.border.radius.md};
    font-size:       ${({ theme }) => theme.font.sm};
    font-weight:     ${({ theme }) => theme.font.weight.medium};
    transition:      color ${({ theme }) => theme.transition.fast},
                     background ${({ theme }) => theme.transition.fast};
    min-height:      44px;
    position:        relative;

    .link-icon {
      display:     flex;
      align-items: center;
      flex-shrink: 0;
      font-size:   1.3rem;
      width:       24px;
    }

    .link-label {
      white-space: nowrap;
      animation:   ${fadeLabel} 0.2s ease;
    }

    /* Activo */
    &.active {
      color:       ${({ theme }) => theme.color.primary};
      font-weight: ${({ theme }) => theme.font.weight.semibold};
      background:  ${({ theme }) => `rgba(${theme.rgba.body === "255, 255, 255"
        ? "52,131,235"
        : "52,131,235"}, 0.1)`};

      &::before {
        content:       "";
        position:      absolute;
        left:          0;
        top:           20%;
        height:        60%;
        width:         3px;
        background:    ${({ theme }) => theme.color.primary};
        border-radius: 0 4px 4px 0;
      }
    }
  }
`;

const ThemeRow = styled.div<StyledOpen>`
  display:         flex;
  align-items:     center;
  justify-content: ${({ $isopen }) => $isopen ? "flex-start" : "center"};
  gap:             10px;
  padding:         8px ${({ $isopen }) => $isopen ? "16px" : "0"};
`;

const ThemeLabel = styled.span`
  font-size:   ${({ theme }) => theme.font.sm};
  color:       ${({ theme }) => theme.text.muted};
  white-space: nowrap;
  animation:   ${fadeLabel} 0.2s ease;
`;

const CardWrapper = styled.div`
  padding:   0 8px 8px;
  animation: ${slideIn} 0.3s ease;
`;

const Spacer = styled.div`flex: 1;`;

const Divider = styled.hr`
  border:     none;
  border-top: 1px solid ${({ theme }) => theme.border.color};
  margin:     8px 12px;
`;