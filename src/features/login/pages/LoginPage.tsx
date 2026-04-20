import React, { useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

// ─── Constants & Palette ──────────────────────────────────────────────────────
const C = {
  bg: '#080a0c',
  chassis: '#12151a',
  screen: '#0d0f12',
  accent: '#00f5ff',
  warning: '#f59e0b',
  success: '#00ff9d',
  text: '#e2e8f0',
  textMuted: '#4a5568',
  border: '#1e242e',
};

// ─── Animations ───────────────────────────────────────────────────────────────
const pulse = keyframes`
  0%, 100% { opacity: 1; filter: drop-shadow(0 0 2px ${C.accent}); }
  50% { opacity: 0.5; filter: drop-shadow(0 0 5px ${C.accent}); }
`;

const dataStream = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

// ─── Global Styles ────────────────────────────────────────────────────────────
const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Outfit', sans-serif;
    background: ${C.bg};
    color: ${C.text};
    overflow: hidden;
  }
`;

// ─── Styled Components ────────────────────────────────────────────────────────
const TerminalContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: 
    linear-gradient(rgba(0, 245, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90px, rgba(0, 245, 255, 0.02) 1px, transparent 1px);
  background-size: 40px 40px;
`;

const ControlPanel = styled.div`
  background: ${C.chassis};
  border: 2px solid ${C.border};
  border-radius: 8px;
  padding: 32px;
  display: flex;
  gap: 32px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.6);
  position: relative;
  
  &::after {
    content: "ACACIA_TERMINAL_SERIAL_774-X";
    position: absolute;
    bottom: -20px;
    right: 10px;
    font-family: monospace;
    font-size: 10px;
    color: ${C.textMuted};
  }
`;

const DisplayMonitor = styled.div`
  background: ${C.screen};
  border: 1px solid #1a1e23;
  padding: 24px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 300px;
  box-shadow: inset 0 0 15px rgba(0,0,0,0.5);
`;

const StatusHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const TelemetryTag = styled.div<{ $variant?: 'warning' | 'success' }>`
  font-family: monospace;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${props => props.$variant === 'warning' ? C.warning : props.$variant === 'success' ? C.success : C.accent};
  display: flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    animation: ${pulse} 1.5s infinite;
  }
`;

const StateDisplay = styled.div`
  border-left: 2px solid ${C.textMuted};
  padding-left: 12px;
`;

const StateLabel = styled.div`
  font-size: 10px;
  color: ${C.textMuted};
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 2px;
`;

const StateValue = styled.div<{ $highlight?: boolean }>`
  font-family: monospace;
  font-size: 16px;
  color: ${props => props.$highlight ? C.warning : C.text};
  font-weight: 600;
`;

const PinGrid = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px 0;
  justify-content: center;
`;

const PinSlot = styled.div<{ $filled: boolean }>`
  width: 40px;
  height: 12px;
  background: ${props => props.$filled ? C.accent : 'rgba(255,255,255,0.05)'};
  border: 1px solid ${props => props.$filled ? C.accent : '#222'};
  box-shadow: ${props => props.$filled ? `0 0 10px ${C.accent}` : 'none'};
  transition: all 0.1s;
`;

// ─── Numpad ──────────────────────────────────────────────────────────────────
const NumpadArea = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`;

const KeyButton = styled.button`
  width: 60px;
  height: 60px;
  background: #1a1e24;
  border: 1px solid ${C.border};
  color: ${C.text};
  font-family: 'Outfit', sans-serif;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.1s;

  &:hover {
    background: #232a33;
    border-color: ${C.accent};
  }
  
  &:active {
    background: ${C.accent};
    color: ${C.bg};
    transform: scale(0.95);
  }
`;

const ActionSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const EnterButton = styled.button`
  flex: 1;
  width: 60px;
  background: ${C.success};
  color: ${C.bg};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 900;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  transition: all 0.2s;

  &:hover {
    filter: brightness(1.1);
    box-shadow: 0 0 20px rgba(0, 255, 157, 0.3);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const SystemLine = styled.div`
  height: 2px;
  background: #1a1e23;
  position: relative;
  overflow: hidden;
  margin-top: auto;

  &::after {
    content: "";
    position: absolute;
    top: 0; left: 0;
    width: 30%;
    height: 100%;
    background: linear-gradient(90deg, transparent, ${C.accent}, transparent);
    animation: ${dataStream} 2s infinite linear;
  }
`;

// ─── Main Component ───────────────────────────────────────────────────────────
const MAX_PIN = 4;

export const LoginPage = () => {
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleKey = (key: string) => {
    if (key === 'C') {
      setPin('');
      return;
    }
    if (pin.length < MAX_PIN) {
      setPin(prev => prev + key);
    }
  };

  const handleAuth = () => {
    if (pin.length === MAX_PIN) {
      setLoading(true);
      setTimeout(() => navigate('/orders'), 800);
    }
  };

  return (
    <>
      <GlobalStyle />
      <TerminalContainer>
        
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-1px' }}>
            Acacia<span style={{ color: C.accent }}>Point</span>
          </h1>
          <div style={{ fontSize: '12px', color: C.textMuted, letterSpacing: '4px', textTransform: 'uppercase' }}>
            Retail Interface v2.4
          </div>
        </div>

        <ControlPanel>
          <DisplayMonitor>
            <StatusHeader>
              <TelemetryTag>Node_Active</TelemetryTag>
              <TelemetryTag $variant="warning">Auth_Required</TelemetryTag>
            </StatusHeader>

            <StateDisplay>
              <StateLabel>Operador Actual</StateLabel>
              <StateValue>ID_CAJERO_01</StateValue>
            </StateDisplay>

            <StateDisplay>
              <StateLabel>Estado de Estación</StateLabel>
              <StateValue $highlight>FONDO_POR_CONFIRMAR</StateValue>
            </StateDisplay>

            <PinGrid>
              {Array.from({ length: MAX_PIN }).map((_, i) => (
                <PinSlot key={i} $filled={i < pin.length} />
              ))}
            </PinGrid>

            <div style={{ fontFamily: 'monospace', fontSize: '10px', color: C.textMuted }}>
              [SYSTEM] Awaiting identity verification...<br/>
              [SYSTEM] Register: TERM-04A
            </div>

            <SystemLine />
          </DisplayMonitor>

          <NumpadArea>
            {['7', '8', '9', '4', '5', '6', '1', '2', '3', 'C', '0'].map(k => (
              <KeyButton key={k} onClick={() => handleKey(k)}>
                {k}
              </KeyButton>
            ))}
          </NumpadArea>

          <ActionSide>
            <EnterButton onClick={handleAuth} disabled={pin.length < MAX_PIN || loading}>
              {loading ? (
                <Icon icon="svg-spinners:90-ring-with-bg" fontSize={24} />
              ) : (
                <>
                  <Icon icon="mdi:key-variant" fontSize={24} />
                  ABRIR<br/>CAJA
                </>
              )}
            </EnterButton>
            <KeyButton onClick={() => setPin(prev => prev.slice(0, -1))} style={{ width: 60, height: 60 }}>
              <Icon icon="mdi:backspace" />
            </KeyButton>
          </ActionSide>
        </ControlPanel>

        <div style={{ marginTop: 40, color: C.textMuted, fontSize: '11px', textAlign: 'center' }}>
          DISTRIBUTED BY ACACIA RETAIL SYSTEMS<br/>
          CONFIDENTIAL POS INTERFACE // GUATEMALA
        </div>
      </TerminalContainer>
    </>
  );
};

export default LoginPage;
