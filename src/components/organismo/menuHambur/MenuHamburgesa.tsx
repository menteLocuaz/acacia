// src/components/molecules/MenuHambur/MenuHambur.tsx
import { useState, type ReactNode }       from "react";
import styled, { keyframes }              from "styled-components";
import { NavLink }                        from "react-router-dom";
import { LinksArray, SecondarylinksArray } from "../../../utils/dataEstatica";
import { ToggleTema }                     from "../Sidebar/ToggleTema";
import { SidebarCard }                    from "../Sidebar/SidebarCard";
import { v }                              from "../../../styles/variables";

// ── Tipos ─────────────────────────────────────────────────────────────────────
interface LinkItem {
  icon:  ReactNode;
  label: string;
  to:    string;
}

interface NavItemProps {
  link:    LinkItem;
  onClose: () => void;
}

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
  from { opacity: 0; transform: translateX(-20px); }
  to   { opacity: 1; transform: translateX(0);     }
`;

// ── Componente principal ──────────────────────────────────────────────────────
export function MenuHambur() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = () => setIsOpen(prev => !prev);
  const handleClose  = () => setIsOpen(false);

  return (
    <Wrapper>

      {/* Botón hamburguesa */}
      <HamburgerMenu>
        <label className="hamburger" aria-label="Menú de navegación">
          <input
            type="checkbox"
            checked={isOpen}
            onChange={handleToggle}
          />
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path
              className="line line-top-bottom"
              d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
            />
            <path className="line" d="M7 16 27 16" />
          </svg>
        </label>
      </HamburgerMenu>

      {/* Overlay */}
      {isOpen && <Overlay onClick={handleClose} aria-hidden="true" />}

      {/* Panel lateral */}
      <Panel $isOpen={isOpen} role="navigation" aria-label="Sidebar">

        {/* Logo */}
        <LogoSection>
          <LogoImg>
            <img src={v.logo} alt="Logo" />
          </LogoImg>
          <LogoTitle>Caja</LogoTitle>
        </LogoSection>

        <Divider />

        {/* Links primarios */}
        <NavSection>
          {(LinksArray as LinkItem[]).map((link) => (
            <NavItem
              key={link.label}
              link={link}
              onClose={handleClose}
            />
          ))}
        </NavSection>

        <Divider />

        {/* Links secundarios */}
        <NavSection>
          {(SecondarylinksArray as LinkItem[]).map((link) => (
            <NavItem
              key={link.label}
              link={link}
              onClose={handleClose}
            />
          ))}
        </NavSection>

        <Spacer />

        {/* Toggle tema */}
        <ThemeRow>
          <ToggleTema />
          <ThemeLabel>Tema</ThemeLabel>
        </ThemeRow>

        <Divider />

        {/* Card logout */}
        <CardWrapper>
          <SidebarCard />
        </CardWrapper>

      </Panel>
    </Wrapper>
  );
}

// ── NavItem ───────────────────────────────────────────────────────────────────
function NavItem({ link, onClose }: NavItemProps) {
  return (
    <LinkWrapper>
      <NavLink
        to={link.to}
        className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
        onClick={onClose}
        end
      >
        <span className="link-icon" aria-hidden="true">{link.icon}</span>
        <span className="link-label">{link.label}</span>
      </NavLink>
    </LinkWrapper>
  );
}

// ── Styled Components ─────────────────────────────────────────────────────────
const Wrapper = styled.div`
  position: relative;
  z-index:  10;
`;

const HamburgerMenu = styled.span`
  position: fixed;
  top:      1.2rem;
  left:     1rem;
  z-index:  200;

  .hamburger { cursor: pointer; }

  .hamburger input { display: none; }

  .hamburger svg {
    height:     2.5em;
    transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .line {
    fill:            none;
    stroke:          ${({ theme }) => theme.text.primary};
    stroke-linecap:  round;
    stroke-linejoin: round;
    stroke-width:    3;
    transition:
      stroke-dasharray  600ms cubic-bezier(0.4, 0, 0.2, 1),
      stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .line-top-bottom { stroke-dasharray: 12 63; }

  .hamburger input:checked + svg { transform: rotate(-45deg); }

  .hamburger input:checked + svg .line-top-bottom {
    stroke-dasharray:  20 300;
    stroke-dashoffset: -32.42;
  }
`;

const Overlay = styled.div`
  position:        fixed;
  inset:           0;
  background:      rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(2px);
  z-index:         150;
  cursor:          pointer;
`;

const Panel = styled.nav<{ $isOpen: boolean }>`
  position:       fixed;
  top:            0;
  left:           0;
  height:         100%;
  width:          260px;
  background:     ${({ theme }) => theme.bg.base};
  border-right:   1px solid ${({ theme }) => theme.border.color};
  padding-top:    20px;
  z-index:        160;
  display:        flex;
  flex-direction: column;
  overflow-y:     auto;
  overflow-x:     hidden;
  transform:      ${({ $isOpen }) => ($isOpen ? "translateX(0)" : "translateX(-100%)")};
  transition:     transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);

  &::-webkit-scrollbar       { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb {
    background:    ${({ theme }) => theme.color.scroll};
    border-radius: 10px;
  }
`;

const LogoSection = styled.div`
  display:       flex;
  align-items:   center;
  gap:           10px;
  padding:       0 16px;
  margin-bottom: 8px;
  min-height:    56px;
`;

const LogoImg = styled.div`
  flex-shrink: 0;
  width:       36px;

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

const Divider = styled.hr`
  border:     none;
  border-top: 1px solid ${({ theme }) => theme.border.color};
  margin:     8px 12px;
`;

const NavSection = styled.div`
  display:        flex;
  flex-direction: column;
  gap:            2px;
  padding:        4px 0;
`;

const LinkWrapper = styled.div`
  margin:        2px 8px;
  border-radius: ${({ theme }) => theme.border.radius.md};
  transition:    background ${({ theme }) => theme.transition.fast};

  &:hover { background: ${({ theme }) => theme.bg.hover}; }

  .nav-link {
    display:         flex;
    align-items:     center;
    gap:             10px;
    padding:         10px 12px;
    text-decoration: none;
    color:           ${({ theme }) => theme.text.secondary};
    border-radius:   ${({ theme }) => theme.border.radius.md};
    font-size:       ${({ theme }) => theme.font.sm};
    font-weight:     ${({ theme }) => theme.font.weight.medium};
    transition:
      color      ${({ theme }) => theme.transition.fast},
      background ${({ theme }) => theme.transition.fast};
    min-height:  44px;
    position:    relative;

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

    &.active {
      color:       ${({ theme }) => theme.color.primary};
      font-weight: ${({ theme }) => theme.font.weight.semibold};
      background:  rgba(52, 131, 235, 0.1);

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

const ThemeRow = styled.div`
  display:     flex;
  align-items: center;
  gap:         10px;
  padding:     8px 16px;
`;

const ThemeLabel = styled.span`
  font-size:   ${({ theme }) => theme.font.sm};
  color:       ${({ theme }) => theme.text.muted};
  white-space: nowrap;
  animation:   ${fadeLabel} 0.2s ease;
`;

const Spacer = styled.div`flex: 1;`;

const CardWrapper = styled.div`
  padding:   0 8px 8px;
  animation: ${slideIn} 0.3s ease;
`;