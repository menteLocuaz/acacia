export const industrialTheme = {
  colors: {
    background: '#080a0c',
    chassis: '#12151a',
    screen: '#0d0f12',
    accent: '#00f5ff',
    warning: '#f59e0b',
    success: '#00ff9d',
    text: '#e2e8f0',
    textMuted: '#4a5568',
    border: '#1e242e',
  },
  animations: {
    pulse: '1.5s infinite',
    dataStream: '2s infinite linear',
    blink: '1s infinite',
  }
};

export const freshTheme = {
  colors: {
    background: '#f8fafc',
    surface: '#ffffff',
    text: '#0f172a',
    textMuted: '#64748b',
    accent: '#2563eb',
    success: '#10b981',
    danger: '#ef4444',
    border: '#e2e8f0',
    paper: '#f1f5f9',
  },
  shadows: {
    standard: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  }
};

export type IndustrialTheme = typeof industrialTheme;
export type FreshTheme = typeof freshTheme;

// Default theme for the app (can be switched)
export const theme = {
  industrial: industrialTheme,
  fresh: freshTheme,
};
