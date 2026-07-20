"use client";

import { motion } from "framer-motion";

import { TextRoll } from "@/components/ui/skiper58";
import { AvalWordmark } from "@/components/site/logo";

const links = [
  { label: "Rail", href: "#rail" },
  { label: "Plugins", href: "#plugins" },
  { label: "Guardrails", href: "#guardrails" },
  { label: "Pull request", href: "https://github.com/zeroclaw-labs/zeroclaw-plugins/pull/98" },
];

export function Nav() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className="absolute inset-0 border-b border-line/60"
        style={{
          background: "color-mix(in oklab, var(--background) 78%, transparent)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      />
      <nav className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" aria-label="Aval home">
          <AvalWordmark />
        </a>
        <div className="hidden items-center gap-8 text-sm text-muted sm:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-foreground">
              <TextRoll className="py-1">{l.label}</TextRoll>
            </a>
          ))}
        </div>
        <a
          href="https://github.com/bryankwandou/zeroclaw-plugins/tree/aval-suite/plugins"
          className="group relative overflow-hidden rounded-full border border-accent/40 px-4 py-1.5 text-sm text-accent transition-colors hover:text-background"
        >
          <span className="absolute inset-0 -translate-y-full bg-accent transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
          <span className="relative">Get the plugins</span>
        </a>
      </nav>
    </motion.header>
  );
}
