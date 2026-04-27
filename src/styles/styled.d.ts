// src/styles/styled.d.ts  ← augment DefaultTheme
import 'styled-components';
import type { AppTheme } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}