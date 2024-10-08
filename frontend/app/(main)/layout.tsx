import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "../globals.css";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
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
        <Navbar />

        <div className="flex">
            <div className="hidden md:block h-[100vh] w-[300px]">
              <Sidebar />
            </div>
            <div className="p-5 w-full md:w-[1140px]">
              {children}
            </div>
        </div>

        <Toaster/>
        <SessionChecker />
      </body>
    </html>
  );
}
