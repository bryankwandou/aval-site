import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "Aval — the co-sign rail for autonomous agents",
  description:
    "ZeroClaw agents build Solana payments that wait for a human signature without expiring. Durable nonces underneath, a chain-side recheck at approval time, zero keys anywhere.",
  metadataBase: new URL("https://aval-rail.vercel.app"),
  openGraph: {
    title: "Aval — the co-sign rail for autonomous agents",
    description:
      "The agent proposes. You co-sign whenever you get to it. The transaction keeps.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}
