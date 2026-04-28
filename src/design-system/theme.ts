export const theme = {
  colors: {
    background: '#f4efe9',
    backgroundSoft: '#fbf7f2',
    surface: '#fffaf5',
    surfaceElevated: '#ffffff',
    border: '#e7ddd3',
    borderStrong: '#d7c7b9',
    text: '#171312',
    textMuted: '#6f645c',
    textSoft: '#8e8278',
    primary: '#2457d6',
    primaryHover: '#1e49b3',
    primarySoft: '#dfe8ff',
    accent: '#d86a52',
    accentSoft: '#f9dfd8',
    success: '#2f8f5b',
    warning: '#c58a1b',
    danger: '#cb4b4b',
    overlay: 'rgba(17, 12, 10, 0.48)',
  },
  radii: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    round: '999px',
  },
  spacing: {
    xxs: '4px',
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  shadow: {
    soft: '0 10px 30px rgba(23, 19, 18, 0.08)',
    medium: '0 16px 40px rgba(23, 19, 18, 0.12)',
    inset: 'inset 0 1px 0 rgba(255, 255, 255, 0.7)',
  },
  typography: {
    fontFamily:
      "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif",
    title: 'clamp(2rem, 5vw, 4.25rem)',
    heading: 'clamp(1.5rem, 2.5vw, 2rem)',
    body: '16px',
    small: '14px',
  },
  layout: {
    contentWidth: '768px',
    mobilePadding: '16px',
  },
  motion: {
    fast: '150ms ease',
    base: '220ms ease',
    slow: '320ms ease',
  },
} as const;

export type AppTheme = typeof theme;
