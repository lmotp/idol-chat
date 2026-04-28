import React from 'react';
import { Global, css } from '@emotion/react';
import { theme } from '@/design-system/theme';

export function GlobalStyles() {
  return (
    <Global
      styles={css`
        :root {
          color-scheme: light;
          --ds-bg: ${theme.colors.background};
          --ds-surface: ${theme.colors.surface};
          --ds-surface-elevated: ${theme.colors.surfaceElevated};
          --ds-border: ${theme.colors.border};
          --ds-border-strong: ${theme.colors.borderStrong};
          --ds-text: ${theme.colors.text};
          --ds-text-muted: ${theme.colors.textMuted};
          --ds-primary: ${theme.colors.primary};
          --ds-primary-soft: ${theme.colors.primarySoft};
          --ds-accent: ${theme.colors.accent};
          --ds-shadow: ${theme.shadow.soft};
          --ds-radius-lg: ${theme.radii.lg};
          --ds-radius-xl: ${theme.radii.xl};
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          min-height: 100%;
          background:
            radial-gradient(circle at top left, rgba(36, 87, 214, 0.08), transparent 32%),
            radial-gradient(circle at top right, rgba(216, 106, 82, 0.08), transparent 28%),
            var(--ds-bg);
        }

        body {
          min-height: 100vh;
          font-family: ${theme.typography.fontFamily};
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, rgba(244, 239, 233, 0.94) 100%),
            var(--ds-bg);
          color: var(--ds-text);
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        #root {
          min-height: 100vh;
        }

        button,
        input,
        textarea,
        select {
          font: inherit;
        }

        button {
          border: 0;
          background: transparent;
          cursor: pointer;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        img {
          display: block;
          max-width: 100%;
        }

        ul,
        ol {
          list-style: none;
        }

        ::selection {
          background: rgba(36, 87, 214, 0.18);
        }
      `}
    />
  );
}
