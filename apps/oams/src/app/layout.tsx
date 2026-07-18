import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { ThemeProvider } from '@repo/theme';

export const metadata: Metadata = {
  title: 'OAMS Portal',
  description: 'OAMS administrative portal',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider>
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
