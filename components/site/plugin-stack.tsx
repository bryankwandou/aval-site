"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

/**
 * Sticky stacked walkthrough of the three components, patterned on
 * skiper-ui's StickyCard_001 scroll mechanics with product panels instead of
 * images.
 */

const plugins = [
  {
    name: "nonce-vault-init",
    tier: "T1",
    tool: "nonce_vault_init",
    blurb:
      "One-time setup. Builds the unsigned transaction that opens your durable nonce vault — the waiting room every later payment sits in. The address is derived from your own wallet, so a second keypair never exists.",
    snippet: [
      ["$", "agent → nonce_vault_init { authority: \"4Nd1..vRW5\" }"],
      ["→", "vault 9WzD..AWWM · rent 0.0014 SOL · reclaimable"],
      ["→", "sign once; everything after this is durable"],
    ],
  },
  {
    name: "durable-tx-build",
    tier: "T1",
    tool: "durable_tx_build",
    blurb:
      "The flagship. SOL and SPL transfers anchored to the vault instead of a dying blockhash. Mint allowlist and per-transaction caps live in your config and are enforced in code — a persuasive model changes nothing.",
    snippet: [
      ["$", "agent → durable_tx_build { 25 USDC → 7xKX..gAsU }"],
      ["→", "unsigned tx built · expires: never"],
      ["✕", "999999 USDC → refused: exceeds per-transaction cap"],
    ],
  },
  {
    name: "approval-recheck",
    tier: "T0",
    tool: "approval_recheck",
    blurb:
      "The other half of the promise. At signing time it decodes the pending bytes — never the chat — re-fetches the chain, and answers plainly: is this still exactly what you think it is? READY, CONSUMED, DRIFTED, or BROKEN.",
    snippet: [
      ["$", "you → approval_recheck { transaction_base64 }"],
      ["→", "READY · nonce fresh · balances hold"],
      ["→", "a signature authorizes exactly the listed actions"],
    ],
  },
];

function Panel({
  i,
  total,
  progress,
  plugin,
}: {
  i: number;
  total: number;
  progress: MotionValue<number>;
  plugin: (typeof plugins)[number];
}) {
  const targetScale = 1 - (total - i - 1) * 0.06;
  const scale = useTransform(progress, [i / total, 1], [1, targetScale]);

  return (
    <div className="sticky top-0 flex h-screen items-center justify-center px-6">
      <motion.div
        style={{ scale, top: `${i * 26 - 20}px` }}
        className="relative w-full max-w-3xl origin-top rounded-3xl border border-line bg-surface p-8 shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
      >
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-accent">0{i + 1}</span>
            <h3 className="font-display text-2xl font-semibold tracking-tight">
              {plugin.name}
            </h3>
          </div>
          <span className="rounded-full border border-accent/40 px-3 py-1 font-mono text-xs text-accent">
            {plugin.tier}
          </span>
        </div>
        <p className="mb-6 max-w-xl leading-relaxed text-muted">{plugin.blurb}</p>
        <div className="rounded-2xl border border-line bg-background p-5 font-mono text-[13px] leading-loose">
          {plugin.snippet.map(([mark, line], li) => (
            <div key={li} className="flex gap-3">
              <span
                className={
                  mark === "✕"
                    ? "text-danger"
                    : mark === "$"
                      ? "text-muted"
                      : "text-ok"
                }
              >
                {mark}
              </span>
              <span className={mark === "✕" ? "text-danger/90" : "text-foreground/90"}>
                {line}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function PluginStack() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section id="plugins" className="relative">
      <div className="mx-auto max-w-6xl px-6 pt-24">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-muted">
          Three components, one rail
        </p>
        <h2 className="font-display max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Small tools with sharp edges, not one tool that does everything.
        </h2>
      </div>
      <div ref={container} className="relative pb-[20vh]">
        {plugins.map((p, i) => (
          <Panel key={p.name} i={i} total={plugins.length} progress={scrollYProgress} plugin={p} />
        ))}
      </div>
    </section>
  );
}
