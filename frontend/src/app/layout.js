import { Inter } from 'next/font/google';
import { Toaster, toast } from 'sonner';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'imgtextextract',
  description: 'This is a web app which is used to extract text from images',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
