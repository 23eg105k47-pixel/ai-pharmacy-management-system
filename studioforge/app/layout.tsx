import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StudioForge",
  description: "AI SaaS app builder for salon operations"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
