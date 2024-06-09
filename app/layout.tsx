import type { Metadata } from "next";
import { Figtree, Inter, Vazirmatn } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";

const font = Vazirmatn({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify farsi",
  description: "Listen to music Farsi!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={font.className}>
        <SupabaseProvider>
          <Sidebar>
            {children}
            </Sidebar>
        </SupabaseProvider>
      </body>
    </html>
  );
}
