import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Dashboard — Hosting.com",
  description:
    "Manage your domains, hosting, emails, and billing from your hosting.com dashboard. Place new orders, search domains, and get 24/7 support.",
  openGraph: {
    title: "Dashboard — Hosting.com",
    description:
      "Manage your domains, hosting, emails, and billing from your hosting.com dashboard.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className={inter.className}>
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

