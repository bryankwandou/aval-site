"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

type Line = {
  who: "owner" | "agent" | "chain";
  text: string;
  at: string;
};

const conversation: Line[] = [
  { who: "owner", at: "13:04", text: "charge table 4, 25 USDC" },
  {
    who: "agent",
    at: "13:04",
    text: "Table 4 — 25 USDC. Scan to pay. ref 8Kq2…4mB",
  },
  { who: "chain", at: "13:06", text: "customer wallet settles 25 USDC" },
  {
    who: "agent",
    at: "13:07",
    text: "Table 4 paid. 25 USDC. sig 5xR2…9kM",
  },
  { who: "owner", at: "14:52", text: "refund table 4, they were overcharged" },
  {
    who: "agent",
    at: "14:52",
    text: "Refund built: 25 USDC back to the wallet that paid. Held at your approval — it will not expire.",
  },
  { who: "owner", at: "19:30", text: "approved" },
  {
    who: "agent",
    at: "19:30",
    text: "Signed and sent. sig 7pN4…2vC",
  },
];

const tone: Record<Line["who"], string> = {
  owner: "ml-auto bg-raised text-foreground",
  agent: "bg-surface text-foreground border border-line",
  chain: "mx-auto bg-transparent border border-dashed border-line text-muted",
};

export function ShopFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="shop" className="relative border-t border-line py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.22em] text-muted">
              One afternoon in one chat
            </p>
            <h2 className="font-display text-[clamp(1.9rem,3.4vw,2.9rem)] font-semibold leading-[1.1] tracking-tight">
              The whole product fits
              <br />
              in a conversation.
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-muted">
              No dashboard, no point-of-sale hardware, no app for the customer to
              install. The owner already has this window open. The agent lives in
              it and does four things: quote a charge, confirm a payment, prepare
              a refund, and wait to be told yes.
            </p>
            <p className="mt-4 max-w-md leading-relaxed text-muted">
              Look at the gap between 14:52 and 19:30. That is four and a half
              hours between the refund being prepared and the owner approving it.
              A transaction built the ordinary way stopped being valid at 14:54.
            </p>

            <dl className="mt-10 space-y-4 border-t border-line pt-8">
              {[
                ["Owner types", "plain language, no command syntax to remember"],
                ["Customer pays", "any Solana wallet, nothing to install"],
                ["Agent holds", "no key, at any point, by construction"],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-4 text-sm">
                  <dt className="w-28 shrink-0 font-mono text-accent">{k}</dt>
                  <dd className="text-muted">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div
            ref={ref}
            className="rounded-2xl border border-line bg-background/40 p-5 sm:p-7"
          >
            <div className="mb-5 flex items-center gap-2 border-b border-line pb-4">
              <span className="h-2 w-2 rounded-full bg-ok" />
              <span className="font-mono text-xs text-muted">
                shop telegram · caixa
              </span>
            </div>

            <div className="space-y-3">
              {conversation.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: i * 0.14, ease }}
                  className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${tone[line.who]} ${
                    line.who === "chain" ? "text-center font-mono text-xs" : ""
                  }`}
                >
                  {line.text}
                  <span className="ml-2 font-mono text-[10px] text-muted/70">
                    {line.at}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
