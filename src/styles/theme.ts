// src/styles/theme.ts

// ── Tipos ─────────────────────────────────────────────────────────────────────
export interface AppTheme {
  // Meta
  mode: 'light' | 'dark';

  // Fondos
  bg: {
    base:    string;
    alpha:   string;
    surface: string;
    card:    string;
    total:   string;
    sidebar: string;
    input:   string;
    hover:   string;
    overlay: string;
  };

  // Texto
  text: {
    primary:   string;
    secondary: string;
    muted:     string;
    inverse:   string;
    heading:   string;
    subtitle:  string;
  };

  // Colores semánticos
  color: {
    primary:   string;
    primaryHover: string;
    accent:    string;
    accentAlt: string;
    success:   string;
    warning:   string;
    danger:    string;
    info:      string;
    carousel:  string;
    scroll:    string;
  };

  // Rgba helpers
  rgba: {
    body:        string;
    text:        string;
    animated:    string;
  };

  // Tipografía
  font: {
    xs:     string;
    sm:     string;
    md:     string;
    base:   string;
    lg:     string;
    xl:     string;
    xxl:    string;
    xxxl:   string;
    button: string;
    family: {
      sans:  string;
      mono:  string;
    };
    weight: {
      light:   number;
      regular: number;
      medium:  number;
      semibold: number;
      bold:    number;
    };
    lineHeight: {
      tight:  number;
      normal: number;
      loose:  number;
    };
  };

  // Espaciado
  spacing: {
    xs:  string;
    sm:  string;
    md:  string;
    lg:  string;
    xl:  string;
    xxl: string;
  };

  // Bordes
  border: {
    radius: {
      sm:   string;
      md:   string;
      lg:   string;
      xl:   string;
      full: string;
    };
    color:  string;
    width:  string;
  };

  // Sombras
  shadow: {
    sm:  string;
    md:  string;
    lg:  string;
    xl:  string;
    card: string;
  };

  // Transiciones
  transition: {
    fast:   string;
    normal: string;
    slow:   string;
  };

  // Layout
  layout: {
    navHeight:    string;
    sidebarWidth: string;
    maxWidth:     string;
  };

  // Toggle / animaciones
  toggle: {
    color:     string;
    translate: string;
  };

  // Misceláneos
  misc: {
    logoRotate:  string;
    sliderOffset: string;
    iconSize:    string;
  };
}

// ── Tokens compartidos ────────────────────────────────────────────────────────
const shared = {
  font: {
    xs:     '0.75rem',
    sm:     '0.875rem',
    md:     '1rem',
    base:   '16px',
    lg:     '1.25rem',
    xl:     '2rem',
    xxl:    '3rem',
    xxxl:   '4rem',
    button: '0.875rem',
    family: {
      sans: "'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
    },
    weight: {
      light:    300,
      regular:  400,
      medium:   500,
      semibold: 600,
      bold:     700,
    },
    lineHeight: {
      tight:  1.25,
      normal: 1.5,
      loose:  1.75,
    },
  },
  spacing: {
    xs:  '4px',
    sm:  '8px',
    md:  '16px',
    lg:  '24px',
    xl:  '32px',
    xxl: '48px',
  },
  border: {
    radius: {
      sm:   '4px',
      md:   '8px',
      lg:   '12px',
      xl:   '16px',
      full: '9999px',
    },
    width: '1px',
  },
  transition: {
    fast:   'all 0.12s ease',
    normal: 'all 0.25s ease',
    slow:   'all 0.4s ease',
  },
  layout: {
    navHeight:    '5rem',
    sidebarWidth: '260px',
    maxWidth:     '1200px',
  },
  misc: {
    sliderOffset: '0.3em',
    iconSize:     '1.4em',
  },
  color: {
    primary:      'rgb(52, 131, 235)',
    primaryHover: 'rgb(37, 99, 210)',
    accent:       '#f76f3a',
    accentAlt:    '#f7b272',
    success:      '#22c55e',
    warning:      '#f59e0b',
    danger:       '#ef4444',
    info:         '#06b6d4',
    carousel:     '#9955ff',
  },
} as const;

// ── Tema Light ────────────────────────────────────────────────────────────────
export const Light: AppTheme = {
  mode: 'light',

  bg: {
    base:    '#ffffff',
    alpha:   '#f2f2f2',
    surface: 'rgb(245,245,245)',
    card:    '#ffffff',
    total:   '#EDF3FB',
    sidebar: '#eeeeee',
    input:   '#f9f9f9',
    hover:   '#f0f0f0',
    overlay: 'rgba(0,0,0,0.4)',
  },

  text: {
    primary:  '#202020',
    secondary: '#4a4a4a',
    muted:    '#7a7a7a',
    inverse:  '#ffffff',
    heading:  '#363637',
    subtitle: '#2c2c2c',
  },

  color: {
    ...shared.color,
    scroll: '#cac9ca',
  },

  rgba: {
    body:     '255, 255, 255',
    text:     '32, 32, 32',
    animated: 'rgba(102, 102, 102, 0.2)',
  },

  font:       shared.font,
  spacing:    shared.spacing,
  transition: shared.transition,
  layout:     shared.layout,
  misc: {
    ...shared.misc,
    logoRotate: '360deg',
  },

  border: {
    ...shared.border,
    color: '#e4e4e4',
  },

  shadow: {
    sm:   '0 1px 3px rgba(0,0,0,0.08)',
    md:   '0 4px 12px rgba(0,0,0,0.10)',
    lg:   '0 8px 24px rgba(0,0,0,0.12)',
    xl:   '0 16px 48px rgba(0,0,0,0.15)',
    card: '0 2px 8px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)',
  },

  toggle: {
    color:     '#F9743B',
    translate: '-12px',
  },
};

// ── Tema Dark ─────────────────────────────────────────────────────────────────
export const Dark: AppTheme = {
  mode: 'dark',

  bg: {
    base:    '#202020',
    alpha:   'rgba(0,0,0,0.3)',
    surface: 'rgb(30,30,30)',
    card:    '#171717',
    total:   '#1C1C1E',
    sidebar: '#21252B',
    input:   '#2C2C2E',
    hover:   '#2a2a2a',
    overlay: 'rgba(0,0,0,0.65)',
  },

  text: {
    primary:  '#ffffff',
    secondary: '#b0b0b0',
    muted:    '#6b6b6b',
    inverse:  '#202020',
    heading:  '#8C9298',
    subtitle: '#b7b7b7',
  },

  color: {
    ...shared.color,
    scroll: '#434343',
  },

  rgba: {
    body:     '32, 32, 32',
    text:     '255, 255, 255',
    animated: 'rgba(198, 198, 198, 0.2)',
  },

  font:       shared.font,
  spacing:    shared.spacing,
  transition: shared.transition,
  layout:     shared.layout,
  misc: {
    ...shared.misc,
    logoRotate: '-360deg',
  },

  border: {
    ...shared.border,
    color: '#3a3a3a',
  },

  shadow: {
    sm:   '0 1px 3px rgba(0,0,0,0.3)',
    md:   '0 4px 12px rgba(0,0,0,0.4)',
    lg:   '0 8px 24px rgba(0,0,0,0.5)',
    xl:   '0 16px 48px rgba(0,0,0,0.6)',
    card: '0 2px 8px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)',
  },

  toggle: {
    color:     'rgb(52, 131, 235)',
    translate: '26px',
  },
};