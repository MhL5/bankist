import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Discord bot logger v212",
  description: "discord bot logger",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
