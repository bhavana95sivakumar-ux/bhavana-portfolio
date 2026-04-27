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
