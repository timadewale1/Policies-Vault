"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

export function FadeOutOnScroll({
  children,
  className,
  start = 0,
  end = 260,
}: {
  children: React.ReactNode;
  className?: string;
  start?: number;
  end?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [start, end], [1, 0]);
  const y = useTransform(scrollY, [start, end], [0, -12]);

  return (
    <motion.div ref={ref} className={className} style={{ opacity, y }}>
      {children}
    </motion.div>
  );
}

export function RevealWhileInView({
  children,
  from = "left", // "left" | "right" | "bottom"
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  from?: "left" | "right" | "bottom";
  delay?: number;
  className?: string;
}) {
  const initial =
    from === "left"
      ? { opacity: 0, x: -40, y: 0 }
      : from === "right"
      ? { opacity: 0, x: 40, y: 0 }
      : { opacity: 0, x: 0, y: 40 };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}


export function StaggerUpWhileInView({
  children,
  className,
  baseDelay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  baseDelay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.18, delayChildren: baseDelay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItemUp({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 18 },
        show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function SlideUpOnLoad({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

