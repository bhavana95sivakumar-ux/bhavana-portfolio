"use client";

import * as React from "react";
import { motion } from "motion/react";

const sections = [
  { id: "about", label: "About" },
  { id: "research", label: "Research" },
  { id: "experience", label: "Experience" },
  { id: "honors", label: "Honors" },
  { id: "publications", label: "Publications" },
  { id: "contact", label: "Contact" },
];

export function SectionRail() {
  const [active, setActive] = React.useState<string>("");
  React.useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const v = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (v) setActive(v.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.5, 1] }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <motion.aside
      aria-hidden
      className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group flex items-center gap-2"
          >
            <span
              className={`text-[10px] font-mono uppercase tracking-wider transition-all ${
                isActive
                  ? "opacity-100 text-foreground"
                  : "opacity-0 group-hover:opacity-100 text-muted-foreground"
              }`}
            >
              {s.label}
            </span>
            <motion.span
              className="relative inline-flex h-1.5 rounded-full bg-foreground/30"
              animate={{ width: isActive ? 20 : 6, backgroundColor: isActive ? "var(--heart)" : "rgba(255,255,255,0.3)" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </a>
        );
      })}
    </motion.aside>
  );
}
