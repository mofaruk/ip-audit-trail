import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "../../globals.css";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getAuthUser } from "@/app/actions/auth-actions";
import { AlertCircle } from "lucide-react";


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AuditTrail',
  description: 'IP Audit Tool',
};

export default async function LogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getAuthUser();

  return (
    <>
      {
        user?.roles?.includes('admin') ? children :
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>401 Unauthorized access</AlertTitle>
            <AlertDescription>
              You are not allowed to see this page
            </AlertDescription>
          </Alert>
      }
    </>
  );
}
