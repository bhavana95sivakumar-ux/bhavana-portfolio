import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Dr. Bhavana Sivakumar, PhD — Cardiovascular Pharmacology Researcher",
  description:
    "Postdoctoral Researcher at Indiana University Indianapolis working on cardiovascular pharmacology, mitochondrial biology, and PM2.5 cardiotoxicity.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
