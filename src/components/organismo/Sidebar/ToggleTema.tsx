import { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../../App";

export function ToggleTema() {
  const ctx = useContext(ThemeContext);
  if (!ctx) return null;
  const isDark = ctx.theme === "dark";

  return (
    <Wrapper onClick={() => ctx.setTheme(isDark ? "light" : "dark")}>
      <span>{isDark ? "🌞" : "🌚"}</span>
    </Wrapper>
  );
}

const Wrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.4rem;
`;
