// src/App.tsx
import styled, { ThemeProvider } from "styled-components";
import { createContext, useState, useCallback, useContext } from "react";
import { AppRouter }  from "./routers/AppRouter";
import { Light, Dark, Sidebar, mq, MenuHambur } from "./index";

// ── Constantes ────────────────────────────────────────────────────────────────
const SIDEBAR_COLLAPSED = "65px";
const SIDEBAR_EXPANDED  = "220px";

// ── Contextos ─────────────────────────────────────────────────────────────────

// Tema
interface ThemeContextType {
  theme:    "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
  toggle:   () => void;
}
export const ThemeContext = createContext<ThemeContextType | null>(null);
export const useThemeCtx = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeCtx must be used inside ThemeContext.Provider");
  return ctx;
};

// Sidebar
interface SidebarContextType {
  isOpen:  boolean;
  toggle:  () => void;
  close:   () => void;
}
export const SidebarContext = createContext<SidebarContextType | null>(null);
export const useSidebarCtx = () => {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebarCtx must be used inside SidebarContext.Provider");
  return ctx;
};

// ── App ───────────────────────────────────────────────────────────────────────
function App() {
  const [theme,       setTheme]       = useState<"light" | "dark">("dark");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleTheme   = useCallback(() => setTheme(t => t === "dark" ? "light" : "dark"), []);
  const toggleSidebar = useCallback(() => setSidebarOpen(o => !o), []);
  const closeSidebar  = useCallback(() => setSidebarOpen(false), []);

  const themeStyle = theme === "light" ? Light : Dark;

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle: toggleTheme }}>
      <SidebarContext.Provider value={{ isOpen: sidebarOpen, toggle: toggleSidebar, close: closeSidebar }}>
        <ThemeProvider theme={themeStyle}>

          <Layout $isopen={sidebarOpen}>

            {/* ── Sidebar (tablet+) ── */}
            <SidebarArea>
              <Sidebar state={sidebarOpen} setState={setSidebarOpen} />
            </SidebarArea>

            {/* ── Menú hamburguesa (móvil) ── */}
            <MobileMenuSection>
              <MenuHambur />
            </MobileMenuSection>

            {/* ── Overlay móvil ── */}
            {sidebarOpen && <MobileOverlay onClick={closeSidebar} />}

            {/* ── Contenido principal ── */}
            <Main>
              <AppRouter />
            </Main>

          </Layout>

        </ThemeProvider>
      </SidebarContext.Provider>
    </ThemeContext.Provider>
  );
}

// ── Styled ────────────────────────────────────────────────────────────────────

const Layout = styled.div<{ $isopen: boolean }>`
  display:          grid;
  min-height:       100dvh;
  background-color: ${({ theme }) => theme.bg.total};
  grid-template-columns: 1fr;
  grid-template-rows:    auto 1fr;
  transition:            grid-template-columns 0.25s ease;

  /* Tablet+ */
  ${mq("tablet")} {
    grid-template-columns: ${({ $isopen }) =>
      $isopen ? SIDEBAR_EXPANDED : SIDEBAR_COLLAPSED} 1fr;
    grid-template-rows: 1fr;
  }
`;

const SidebarArea = styled.aside`
  display: none;

  ${mq("tablet")} {
    display:  block;
    position: relative;
  }
`;

const MobileMenuSection = styled.section`
  display: block;

  ${mq("tablet")} { display: none; }
`;

const MobileOverlay = styled.div`
  position:        fixed;
  inset:           0;
  background:      rgba(0,0,0,0.45);
  backdrop-filter: blur(3px);
  z-index:         99;

  ${mq("tablet")} { display: none; }
`;

const Main = styled.main`
  grid-column:    1;
  width:          100%;
  min-height:     100dvh;
  padding:        ${({ theme }) => theme.spacing.md};
  padding-top:    ${({ theme }) => `calc(${theme.spacing.md} + 56px)`};
  overflow-x:     hidden;
  transition:     padding 0.25s ease;
  background:     ${({ theme }) => theme.bg.total};
  color:          ${({ theme }) => theme.text.primary};

  ${mq("tablet")} {
    grid-column: 2;
    padding:     ${({ theme }) => theme.spacing.lg};
    padding-top: ${({ theme }) => theme.spacing.lg};
  }

  ${mq("desktop")} {
    padding: ${({ theme }) => theme.spacing.xl};
  }
`;

export default App;