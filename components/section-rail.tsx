"use client";

import * as React from "react";
import { motion } from "motion/react";

const sections = [
  { id: "about", label: "About" },
  { id: "research", label: "Research" },
  { id: "experience", label: "Experience" },
  { id: "honors", label: "Honors" },
  { id: "publications", label: "Publications" },
  { id: "service", label: "Service" },
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
    <motion.nav
      aria-label="Section progress"
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
            aria-current={isActive ? "true" : undefined}
            className="group flex items-center gap-2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[var(--heart)] focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <span
              className={`text-[10px] font-mono uppercase tracking-wider transition-opacity duration-200 ${
                isActive
                  ? "opacity-100 text-foreground"
                  : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 text-muted-foreground"
              }`}
            >
              {s.label}
            </span>
            <span className="relative inline-flex h-1.5 w-5 items-center justify-end">
              {/* scaleX instead of width so the rail never triggers layout */}
              <motion.span
                className="absolute right-0 h-1.5 w-5 origin-right rounded-full bg-foreground/30"
                animate={{ scaleX: isActive ? 1 : 0.3 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.span
                className="absolute right-0 h-1.5 w-5 origin-right rounded-full bg-[var(--heart)]"
                animate={{ scaleX: isActive ? 1 : 0.3, opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>
          </a>
        );
      })}
    </motion.nav>
  );
}
