'use client';

import './globals.css';
import Providers from './providers';
import Navbar from '@/components/Navbar';
import { Suspense } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <Suspense>
          <Providers>
            <title>Fancy To Do</title>
            <Navbar />
            {children}
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
