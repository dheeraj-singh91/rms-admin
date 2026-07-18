import { PrimeReactProvider } from 'primereact/api';
import type { ReactNode } from 'react';

// Require CSS here or in next.js _app/layout
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './typography.css';
import './theme.css';

export interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <PrimeReactProvider value={{ ripple: true }}>
      {children}
    </PrimeReactProvider>
  );
};
