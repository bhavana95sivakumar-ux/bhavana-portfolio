import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { MotionPreferences } from "@/components/motion-preferences";

export const metadata: Metadata = {
  title: "Dr. Bhavana Sivakumar — Cardiovascular Pharmacology Researcher",
  description:
    "Postdoctoral Researcher at Indiana University Indianapolis working on cardiovascular pharmacology, mitochondrial biology, and PM2.5 cardiotoxicity.",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased dark" suppressHydrationWarning>
      <body className="min-h-full bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-[200] focus-visible:rounded-md focus-visible:bg-background focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-medium focus-visible:ring-2 focus-visible:ring-[var(--heart)]"
        >
          Skip to Content
        </a>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false} disableTransitionOnChange>
          <MotionPreferences>{children}</MotionPreferences>
        </ThemeProvider>
      </body>
    </html>
  );
}
