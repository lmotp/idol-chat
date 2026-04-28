import '@emotion/react';
import type { AppTheme } from '@/design-system/theme';

declare module '@emotion/react' {
  export interface Theme extends AppTheme {}
}
