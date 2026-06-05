import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Web Next — Turborepo Boilerplate",
  description: "Next.js app in the Turborepo boilerplate",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
