"use client";

import { motion } from "framer-motion";

import { AvalMark } from "@/components/site/logo";

const ease = [0.22, 1, 0.36, 1] as const;

function Headline() {
  const lines = ["The agent proposes.", "You sign on your", "own time."];
  return (
    <h1 className="font-display text-[clamp(2.6rem,7vw,5.6rem)] font-semibold leading-[1.02] tracking-tight">
      {lines.map((line, li) => (
        <span key={li} className="block overflow-hidden pb-1">
          <motion.span
            className="block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 + li * 0.12, ease }}
          >
            {li === 2 ? (
              <>
                own <span className="text-accent">time.</span>
              </>
            ) : (
              line
            )}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

export function Hero() {
  return (
    <section id="top" className="bg-grid relative overflow-hidden pb-24 pt-40">
      {/* one quiet gold wash, top right */}
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full opacity-[0.14]"
        style={{
          background:
            "radial-gradient(circle, var(--accent) 0%, transparent 62%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="mb-8 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-muted"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          Solana plugins for ZeroClaw agents
        </motion.p>

        <Headline />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.62, ease }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-muted"
        >
          A normal unsigned Solana transaction dies about ninety seconds after
          an agent builds it — usually before you have found your phone. Aval
          anchors agent payments to durable nonces so they keep for hours or
          days, then verifies them against the chain at the moment you sign.
          No key ever exists on the agent&apos;s side.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#rail"
            className="group relative overflow-hidden rounded-full bg-accent px-6 py-3 font-medium text-background"
          >
            <span className="absolute inset-0 -translate-x-full bg-accent-soft transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
            <span className="relative">Watch a payment survive the afternoon</span>
          </a>
          <a
            href="https://github.com/zeroclaw-labs/zeroclaw-plugins/pull/98"
            className="rounded-full border border-line px-6 py-3 text-muted transition-colors hover:border-accent/50 hover:text-foreground"
          >
            Read the pull request
          </a>
        </motion.div>

        {/* live seal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.1, delay: 0.9, ease }}
          className="pointer-events-none absolute right-6 top-36 hidden lg:block"
        >
          <div
            className="rounded-full p-6"
            style={{ animation: "seal-pulse 3.2s ease-in-out infinite" }}
          >
            <AvalMark className="h-36 w-36" />
          </div>
        </motion.div>

        {/* fact strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4"
        >
          {[
            ["T0 / T1", "custody tiers, nothing signed by machines"],
            ["0 keys", "held anywhere in the system, by construction"],
            ["52", "host tests, injection suite included"],
            ["3", "wasm components, one shared pure core"],
          ].map(([big, small]) => (
            <div key={big} className="bg-surface px-6 py-5">
              <div className="font-mono text-2xl text-accent">{big}</div>
              <div className="mt-1 text-xs leading-relaxed text-muted">{small}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
