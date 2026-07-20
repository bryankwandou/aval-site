"use client";

import { useScroll } from "framer-motion";
import { useRef } from "react";

import { CharacterV1 } from "@/components/ui/skiper31";

/**
 * Scroll-driven type moment built on skiper-ui's CharacterV1: the scattered
 * characters converge as you scroll — the product thesis acted out in type.
 */
export function BuiltToWait() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "center center"],
  });

  const text = "BUILT TO WAIT";
  const centerIndex = Math.floor(text.length / 2);

  return (
    <section ref={targetRef} className="relative overflow-hidden py-40">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <div
          className="font-display text-[clamp(2.4rem,9vw,7rem)] font-bold tracking-tight"
          style={{ perspective: "500px" }}
        >
          {text.split("").map((char, i) => (
            <CharacterV1
              key={i}
              char={char}
              index={i}
              centerIndex={centerIndex}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted">
          Everything else in agent payments is built to hurry. Aval is built for
          the other half of the transaction — the human half, the part that
          happens after lunch, after the school run, after you have actually
          read what you are signing.
        </p>
      </div>
    </section>
  );
}
