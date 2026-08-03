"use client";

import { motion } from "framer-motion";

import { AvalMark } from "@/components/site/logo";

const ease = [0.22, 1, 0.36, 1] as const;

function Headline() {
  const lines = ["Charge the table.", "Approve the refund", "after lunch."];
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
                after <span className="text-accent">lunch.</span>
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
          A shop terminal that lives in the owner&apos;s chat
        </motion.p>

        <Headline />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.62, ease }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-muted"
        >
          Caixa runs on the shop&apos;s Telegram. The owner types a charge, the
          customer pays from their own wallet, and the agent reports the payment
          back a minute later. Refunds stop and wait for a person — and because
          they are anchored to a durable nonce instead of a blockhash that dies
          in ninety seconds, waiting until after the rush costs nothing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#refunds"
            className="group relative overflow-hidden rounded-full bg-accent px-6 py-3 font-medium text-background"
          >
            <span className="absolute inset-0 -translate-x-full bg-accent-soft transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
            <span className="relative">See a refund survive the afternoon</span>
          </a>
          <a
            href="#run"
            className="rounded-full border border-line px-6 py-3 text-muted transition-colors hover:border-accent/50 hover:text-foreground"
          >
            Set it up yourself
          </a>
        </motion.div>

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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4"
        >
          {[
            ["T0 / T1", "the agent reads and builds, it never signs"],
            ["0 keys", "held anywhere in the deployment, by construction"],
            ["36", "tests behind the refusals, injection suite included"],
            ["1 min", "from payment to confirmation in the owner's chat"],
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
