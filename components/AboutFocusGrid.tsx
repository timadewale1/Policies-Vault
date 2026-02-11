"use client";

import { motion } from "framer-motion";

const items = [
  {
    title: "International Development",
    desc: "Analysis of development institutions, aid effectiveness, and sustainable development goals.",
  },
  {
    title: "Policy Analysis",
    desc: "Evidence-based evaluation of policies and their impact on development outcomes.",
  },
  {
    title: "Institutional Governance",
    desc: "Examination of governance structures and decision-making processes in development organizations.",
  },
  {
    title: "Development Finance",
    desc: "Research on financing mechanisms and resource allocation in development contexts.",
  },
  {
    title: "Impact Assessment",
    desc: "Evaluation of program effectiveness and measurement of development outcomes.",
  },
  {
    title: "Policy Commentary",
    desc: "Thoughtful perspectives on current trends and challenges in international development.",
  },
];

export default function AboutFocusGrid() {
  return (
    <div className="aboutFocusWrap">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
        className="aboutFocusGrid"
      >
        {items.map((it) => (
          <motion.div
            key={it.title}
            className="aboutFocusCard"
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
            }}
          >
            <div className="h-serif aboutFocusCardTitle">{it.title}</div>
            <p className="aboutFocusCardDesc" style={{ margin: 0, color: "rgba(47,36,32,.72)" }}>
              {it.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
