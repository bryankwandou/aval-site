import { cn } from "@/lib/utils";

/**
 * The Aval mark: a notary's seal holding a co-signed "A".
 * The thin stroke is the agent's proposal; the heavy gold stroke is the
 * human's counter-signature; the dot at the crossbar is the durable nonce —
 * the held moment between the two.
 */
export function AvalMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-8 w-8", className)}
      aria-label="Aval"
    >
      {/* seal ring */}
      <path
        d="M32 3.5 L55.7 17.2 V44.8 L32 60.5 L8.3 44.8 V17.2 Z"
        stroke="var(--line)"
        strokeWidth="2.4"
        strokeLinejoin="round"
        fill="var(--surface)"
      />
      <path
        d="M32 8.2 L51.6 19.6 V42.6 L32 55.8 L12.4 42.6 V19.6 Z"
        stroke="color-mix(in oklab, var(--accent) 34%, transparent)"
        strokeWidth="1"
        strokeLinejoin="round"
        strokeDasharray="2.4 3.2"
        fill="none"
      />
      {/* agent stroke: thin, quiet */}
      <path
        d="M21 45.5 L31.4 17.5"
        stroke="var(--muted)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      {/* human counter-signature: heavy gold */}
      <path
        d="M32.6 17.5 L43 45.5"
        stroke="var(--accent)"
        strokeWidth="5.2"
        strokeLinecap="round"
      />
      {/* crossbar and the nonce dot */}
      <path
        d="M25.2 36.6 H40.4"
        stroke="var(--accent)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <circle cx="44.6" cy="36.6" r="2.7" fill="var(--accent-soft)" />
    </svg>
  );
}

export function AvalWordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <AvalMark />
      <span className="font-display text-xl font-semibold tracking-tight">
        Aval
      </span>
    </span>
  );
}
