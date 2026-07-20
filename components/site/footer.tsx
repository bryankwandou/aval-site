"use client";

import { Link003 } from "@/components/ui/skiper40";
import { AvalWordmark } from "@/components/site/logo";

const strip = [
  "durable nonces",
  "zero key custody",
  "fail-closed caps",
  "chain-side recheck",
  "wasm32-wasip2",
  "52 host tests",
  "MIT licensed",
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      {/* trust strip */}
      <div className="overflow-hidden border-b border-line py-4">
        <div className="animate-marquee flex w-max gap-10 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          {[...strip, ...strip].map((s, i) => (
            <span key={i} className="flex items-center gap-10">
              {s}
              <span className="text-accent">·</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-wrap items-start justify-between gap-10 px-6 py-14">
        <div className="max-w-sm">
          <AvalWordmark />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            An approval rail for transacting agents, built as Solana-native
            plugins for the ZeroClaw runtime. The name is the Brazilian
            Portuguese word for backing someone&apos;s obligation with your own
            signature — which is the whole design, in one word.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-16 gap-y-3 text-sm text-muted">
          <Link003 href="https://github.com/zeroclaw-labs/zeroclaw-plugins/pull/98" className="hover:text-foreground">
            Pull request #98
          </Link003>
          <Link003 href="https://github.com/bryankwandou/zeroclaw-plugins/tree/aval-suite" className="hover:text-foreground">
            Source branch
          </Link003>
          <Link003 href="https://github.com/zeroclaw-labs/zeroclaw" className="hover:text-foreground">
            ZeroClaw runtime
          </Link003>
          <Link003 href="https://superteam.fun/earn/listing/zeroclaw/" className="hover:text-foreground">
            Superteam bounty
          </Link003>
        </div>
      </div>
      <div className="border-t border-line py-5 text-center font-mono text-xs text-muted">
        Aval · MIT · built for the ZeroClaw × Superteam Brasil Solana bounty ·
        2026
      </div>
    </footer>
  );
}
