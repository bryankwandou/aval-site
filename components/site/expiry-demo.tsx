"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/** Minutes since 12:04, mapped over the demo's play progress. */
const START_MIN = 12 * 60 + 4;
const END_MIN = 16 * 60 + 40;
const EXPIRY_PROGRESS = 0.2; // ~90 seconds into the wait
const PLAY_MS = 7000;

function clockFrom(progress: number) {
  const total = START_MIN + (END_MIN - START_MIN) * progress;
  const h = Math.floor(total / 60);
  const m = Math.floor(total % 60);
  return `${h}:${m.toString().padStart(2, "0")}`;
}

type Phase = "idle" | "running" | "returned";

function AgentBubble() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease }}
      className="rounded-2xl rounded-tl-sm border border-line bg-raised p-4 text-sm leading-relaxed"
    >
      <div className="mb-1 font-mono text-[11px] uppercase tracking-widest text-muted">
        agent · 12:04
      </div>
      Invoice 412 came in. I built the 25 USDC transfer to the designer —
      unsigned, waiting on you.
    </motion.div>
  );
}

function TxCard({
  variant,
  phase,
  progress,
  approved,
  onApprove,
}: {
  variant: "plain" | "aval";
  phase: Phase;
  progress: number;
  approved: "none" | "ok" | "fail";
  onApprove: () => void;
}) {
  const isAval = variant === "aval";
  const dead = !isAval && progress >= EXPIRY_PROGRESS;
  const canApprove = phase === "returned" && approved === "none";

  return (
    <div
      className={cn(
        "relative flex flex-col gap-4 rounded-2xl border p-5 transition-colors duration-500",
        isAval ? "border-accent/40 bg-surface" : "border-line bg-surface",
        dead && approved === "none" && "opacity-80",
      )}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          {isAval ? "On the Aval rail" : "Typical agent payment"}
        </span>
        <AnimatePresence mode="wait">
          {phase !== "idle" && (
            <motion.span
              key={dead ? "dead" : "alive"}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={cn(
                "rounded-full border px-2.5 py-0.5 font-mono text-[11px]",
                dead
                  ? "border-danger/50 text-danger"
                  : "border-ok/50 text-ok",
              )}
            >
              {dead ? "blockhash expired" : "valid"}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="rounded-xl border border-line bg-background p-4 font-mono text-xs leading-relaxed text-muted">
        <div>
          send <span className="text-foreground">25 USDC</span> →{" "}
          <span className="text-foreground">7xKX..gAsU</span>
        </div>
        <div>memo &quot;invoice 412&quot;</div>
        <div className="mt-2">
          anchor:{" "}
          {isAval ? (
            <span className="text-accent">durable nonce 9WzD..AWWM</span>
          ) : (
            <span>recent blockhash Gh7s..p2Qk</span>
          )}
        </div>
      </div>

      {/* expiry stamp */}
      <AnimatePresence>
        {dead && approved !== "fail" && (
          <motion.div
            initial={{ opacity: 0, scale: 1.7, rotate: -18 }}
            animate={{ opacity: 1, scale: 1, rotate: -12 }}
            transition={{ duration: 0.35, ease: "backOut" }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <span className="rounded-md border-2 border-danger px-4 py-1 font-display text-2xl font-bold uppercase tracking-widest text-danger">
              Expired
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* verdict area */}
      <div className="min-h-[86px]">
        <AnimatePresence mode="wait">
          {approved === "ok" && (
            <motion.div
              key="ok"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative overflow-hidden rounded-xl border border-ok/40 bg-background p-3 font-mono text-xs"
            >
              <span
                className="absolute left-0 h-[2px] w-full bg-ok/70"
                style={{ animation: "scan 0.9s ease-in-out 1" }}
              />
              <div className="text-ok">approval_recheck → READY</div>
              <div className="mt-1 text-muted">
                nonce fresh · balances hold · exactly 25 USDC
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="mt-2 text-foreground"
              >
                Signed in your wallet. Landed first try.
                <span className="block truncate text-muted">
                  sig 5KtP…e2Vw · 16:41
                </span>
              </motion.div>
            </motion.div>
          )}
          {approved === "fail" && (
            <motion.div
              key="fail"
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: [0, -7, 6, -4, 0] }}
              transition={{ duration: 0.45 }}
              className="rounded-xl border border-danger/40 bg-background p-3 font-mono text-xs"
            >
              <div className="text-danger">wallet → Blockhash not found</div>
              <div className="mt-1 text-muted">
                Built at 12:04, dead by 12:06. The agent has to start over —
                and ask you again.
              </div>
            </motion.div>
          )}
          {approved === "none" && phase === "returned" && (
            <motion.button
              key="btn"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={onApprove}
              disabled={!canApprove}
              className={cn(
                "w-full rounded-xl px-4 py-2.5 text-sm font-medium transition-transform active:scale-[0.98]",
                isAval
                  ? "bg-accent text-background hover:bg-accent-soft"
                  : "border border-line text-muted hover:text-foreground",
              )}
            >
              Approve now
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function ExpiryDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);
  const [plain, setPlain] = useState<"none" | "ok" | "fail">("none");
  const [aval, setAval] = useState<"none" | "ok" | "fail">("none");
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (phase !== "running") return;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / PLAY_MS);
      setProgress(p);
      if (p < 1) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setPhase("returned");
      }
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [phase]);

  const reset = () => {
    setPhase("idle");
    setProgress(0);
    setPlain("none");
    setAval("none");
  };

  return (
    <section id="refunds" className="relative border-y border-line bg-background py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-muted">
              Verified on devnet, not illustrated
            </p>
            <h2 className="font-display max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
              The refund is built at 14:52. You approve at 19:30. One of these
              two is already dead.
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-xl border border-line bg-surface px-4 py-2 font-mono text-lg tabular-nums text-foreground">
              {clockFrom(progress)}
            </div>
            {phase === "idle" ? (
              <button
                onClick={() => setPhase("running")}
                className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-background transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                Run the afternoon
              </button>
            ) : (
              <button
                onClick={reset}
                className="rounded-full border border-line px-5 py-2.5 text-sm text-muted transition-colors hover:text-foreground"
              >
                Replay
              </button>
            )}
          </div>
        </div>

        {/* time track */}
        <div className="relative mb-10 h-1 overflow-hidden rounded-full bg-line">
          <motion.div
            className="absolute inset-y-0 left-0 bg-accent"
            style={{ width: `${progress * 100}%` }}
          />
          <div
            className="absolute inset-y-0 w-px bg-danger"
            style={{ left: `${EXPIRY_PROGRESS * 100}%` }}
            title="~90 seconds: blockhash death"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr_1.1fr]">
          <div className="flex flex-col gap-3">
            {phase !== "idle" ? (
              <AgentBubble />
            ) : (
              <div className="rounded-2xl border border-dashed border-line p-4 text-sm text-muted">
                Press play. The agent will propose a payment in both worlds at
                12:04, and you will come back four and a half hours later.
              </div>
            )}
            <AnimatePresence>
              {phase === "returned" && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease }}
                  className="rounded-2xl rounded-tr-sm border border-accent/30 bg-raised p-4 text-sm leading-relaxed"
                >
                  <div className="mb-1 font-mono text-[11px] uppercase tracking-widest text-muted">
                    you · 16:40
                  </div>
                  Back at my desk. Let me look at that transfer.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <TxCard
            variant="plain"
            phase={phase}
            progress={progress}
            approved={plain}
            onApprove={() => setPlain("fail")}
          />
          <TxCard
            variant="aval"
            phase={phase}
            progress={progress}
            approved={aval}
            onApprove={() => setAval("ok")}
          />
        </div>
      </div>
    </section>
  );
}
