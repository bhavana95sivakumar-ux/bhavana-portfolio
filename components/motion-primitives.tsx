"use client";

import * as React from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform, type Variants } from "motion/react";

const baseEase = [0.22, 1, 0.36, 1] as const;

export function FadeIn({
  children,
  delay = 0,
  y = 20,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: React.ElementType;
}) {
  const MotionTag = motion(Tag);
  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: baseEase, delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

export function Stagger({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: delay } },
  };
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  const item: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: baseEase } },
  };
  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  );
}

export function TextReveal({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: baseEase, delay: delay + i * 0.06 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function CountUp({ to, suffix = "", duration = 1.6 }: { to: number; suffix?: string; duration?: number }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 55, damping: 20, mass: 0.8 });
  const rounded = useTransform(spring, (v) => Math.round(v).toLocaleString() + suffix);

  React.useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, to, mv]);

  // Initial render to avoid hydration flash
  const [, force] = React.useState(0);
  React.useEffect(() => {
    const unsub = rounded.on("change", () => force((n) => n + 1));
    return unsub;
  }, [rounded]);

  return <motion.span ref={ref}>{rounded.get()}</motion.span>;
}

export function Spotlight() {
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 80, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 80, damping: 20 });

  React.useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;
    const handle = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    };
    el.addEventListener("mousemove", handle);
    return () => el.removeEventListener("mousemove", handle);
  }, [x, y]);

  const background = useTransform(
    [smoothX, smoothY],
    ([lx, ly]) =>
      `radial-gradient(600px circle at ${lx}px ${ly}px, hsl(var(--foreground) / 0.08), transparent 40%)`
  );

  return (
    <motion.div
      ref={ref}
      className="pointer-events-none absolute inset-0 -z-10 transition"
      style={{ background }}
    />
  );
}

export function Marquee({ children, duration = 30 }: { children: React.ReactNode; duration?: number }) {
  return (
    <div className="relative overflow-hidden py-2" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
      <motion.div
        className="flex gap-6 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

export function EKGLine({ className, color = "var(--heart)" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 400 60" className={className} preserveAspectRatio="none" fill="none">
      <line x1="0" y1="30" x2="400" y2="30" stroke={color} strokeOpacity="0.15" strokeWidth="1" />
      <motion.path
        d="M0 30 L60 30 L75 30 L85 12 L95 48 L105 18 L115 30 L160 30 L175 30 L185 10 L195 50 L205 22 L215 30 L260 30 L275 30 L285 14 L295 46 L305 20 L315 30 L400 30"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3, ease: "linear", repeat: Infinity }}
      />
    </svg>
  );
}

export function HeartbeatIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <motion.svg
      width={size} height={size} viewBox="0 0 24 24" fill="none"
      className={className}
      animate={{ scale: [1, 1.25, 1, 1.12, 1] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", times: [0, 0.15, 0.35, 0.5, 1] }}
    >
      <path d="M12 21s-8-5.5-8-11a5 5 0 019-3 5 5 0 019 3c0 5.5-8 11-8 11z" fill="var(--heart)" stroke="var(--heart)" strokeWidth="1.2" strokeLinejoin="round" />
    </motion.svg>
  );
}

export function DnaHelix({ className }: { className?: string }) {
  // Two sine-wave strands with base-pair "rungs" — biomedical research signature
  const pairs = Array.from({ length: 22 });
  return (
    <svg className={className} viewBox="0 0 800 400" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="dna-strand" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--heart)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--heart)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--heart)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Strand A */}
      <motion.path
        d="M0 200 Q100 80 200 200 T400 200 T600 200 T800 200"
        stroke="url(#dna-strand)"
        strokeWidth="1.4"
        fill="none"
        animate={{ d: [
          "M0 200 Q100 80 200 200 T400 200 T600 200 T800 200",
          "M0 200 Q100 320 200 200 T400 200 T600 200 T800 200",
          "M0 200 Q100 80 200 200 T400 200 T600 200 T800 200",
        ] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Strand B (phase-shifted) */}
      <motion.path
        d="M0 200 Q100 320 200 200 T400 200 T600 200 T800 200"
        stroke="url(#dna-strand)"
        strokeWidth="1.4"
        fill="none"
        animate={{ d: [
          "M0 200 Q100 320 200 200 T400 200 T600 200 T800 200",
          "M0 200 Q100 80 200 200 T400 200 T600 200 T800 200",
          "M0 200 Q100 320 200 200 T400 200 T600 200 T800 200",
        ] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Base-pair rungs that pulse along */}
      {pairs.map((_, i) => {
        const x = (i / (pairs.length - 1)) * 800;
        const phase = i * 0.35;
        return (
          <motion.line
            key={i}
            x1={x}
            x2={x}
            stroke="var(--heart)"
            strokeWidth="0.8"
            strokeOpacity="0.4"
            animate={{
              y1: [200 + Math.sin(phase) * 80, 200 + Math.sin(phase + Math.PI) * 80, 200 + Math.sin(phase) * 80],
              y2: [200 + Math.sin(phase + Math.PI) * 80, 200 + Math.sin(phase) * 80, 200 + Math.sin(phase + Math.PI) * 80],
              opacity: [0.15, 0.5, 0.15],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        );
      })}
    </svg>
  );
}

export function MoleculeOrbit({ className }: { className?: string }) {
  // Atom-like rings with orbiting dots — molecular science feel
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden>
      <g transform="translate(100 100)">
        {[0, 60, 120].map((rot, i) => (
          <g key={i} transform={`rotate(${rot})`}>
            <ellipse cx="0" cy="0" rx="80" ry="32" fill="none" stroke="var(--heart)" strokeOpacity="0.35" strokeWidth="1" />
            <motion.circle
              r="4"
              fill="var(--heart)"
              animate={{ rotate: 360 }}
              transition={{ duration: 6 + i * 1.5, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "0 0", transformBox: "fill-box" }}
            >
              <animateMotion dur={`${6 + i * 1.5}s`} repeatCount="indefinite" path="M -80 0 a 80 32 0 1 1 160 0 a 80 32 0 1 1 -160 0" />
            </motion.circle>
          </g>
        ))}
        <circle r="6" fill="var(--heart)" />
      </g>
    </svg>
  );
}

export function ParticleField({ count = 30, className }: { count?: number; className?: string }) {
  // Deterministic positions to avoid hydration mismatch
  const dots = React.useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const seed = i * 9301 + 49297;
      const r1 = ((seed % 233280) / 233280);
      const r2 = (((seed * 7) % 233280) / 233280);
      const r3 = (((seed * 13) % 233280) / 233280);
      return {
        id: i,
        x: r1 * 100,
        y: r2 * 100,
        size: 1 + r3 * 2.5,
        duration: 6 + r1 * 10,
        delay: r2 * 4,
      };
    });
  }, [count]);
  return (
    <div className={className} aria-hidden>
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full bg-[var(--heart)]"
          style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.size, height: d.size, opacity: 0.5 }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: d.duration, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function ConnectingLines({ className }: { className?: string }) {
  // SVG with animated connecting lines — gives "research network" feel
  return (
    <svg className={className} viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--heart)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--heart)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--neon-cyan)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[
        "M50,80 Q200,20 400,100 T750,80",
        "M0,200 Q200,150 380,220 T800,180",
        "M30,320 Q220,260 420,330 T780,300",
      ].map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="url(#line-grad)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.8, 0] }}
          transition={{ duration: 6, delay: i * 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {/* Pulse nodes */}
      {[
        { x: 120, y: 90 }, { x: 380, y: 60 }, { x: 600, y: 110 },
        { x: 200, y: 200 }, { x: 500, y: 230 }, { x: 700, y: 180 },
        { x: 150, y: 320 }, { x: 450, y: 340 }, { x: 680, y: 310 },
      ].map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="3"
          fill="var(--heart)"
          animate={{ scale: [1, 2.4, 1], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}

export function Magnetic({ children, strength = 0.25 }: { children: React.ReactNode; strength?: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  function onMove(e: React.MouseEvent) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={reset} style={{ x: sx, y: sy }} className="inline-block">
      {children}
    </motion.div>
  );
}
