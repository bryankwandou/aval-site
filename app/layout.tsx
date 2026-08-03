import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "Caixa — a shop till that lives in the owner's chat",
  description:
    "A ZeroClaw agent that charges in USDC from the shop's Telegram, confirms payment on its own, and holds refunds at a human approval gate until someone gets to it. No key exists in the deployment.",
  metadataBase: new URL("https://aval-rail.vercel.app"),
  openGraph: {
    title: "Caixa — a shop till that lives in the owner's chat",
    description:
      "Charge the table. Approve the refund after lunch. Durable nonces mean waiting costs nothing.",
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
