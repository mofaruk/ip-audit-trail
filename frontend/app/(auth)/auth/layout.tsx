import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "../../globals.css";
import { Toaster } from "@/components/ui/toaster";
import SessionChecker from "@/components/session-checker";


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AuditTrail',
  description: 'IP Audit Tool',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-[100vh] flex items-center justify-center relative p-5 md:p-0">
          {children}
        </div>
        <Toaster/>
        <SessionChecker />
      </body>
    </html>
  );
}
