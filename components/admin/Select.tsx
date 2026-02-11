"use client";

import * as RadixSelect from "@radix-ui/react-select";
import React from "react";

export default function AdminSelect({
  value,
  onChange,
  options,
  ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  ariaLabel?: string;
}) {
  const triggerStyle: React.CSSProperties = {
    border: "1px solid rgba(47,36,32,.28)",
    padding: "10px 12px",
    background: "transparent",
    outline: "none",
    width: "100%",
    fontSize: 13,
    color: "rgba(47,36,32,.8)",
    borderRadius: 8,
    textAlign: "left",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const contentStyle: React.CSSProperties = {
    background: "white",
    border: "1px solid rgba(47,36,32,.12)",
    borderRadius: 8,
    padding: 6,
    minWidth: 120,
    zIndex: 1000,
  };

  const itemStyle: React.CSSProperties = {
    padding: "8px 10px",
    borderRadius: 6,
    cursor: "pointer",
  };

  return (
    <RadixSelect.Root value={value} onValueChange={onChange}>
      <RadixSelect.Trigger aria-label={ariaLabel} style={triggerStyle}>
        <RadixSelect.Value />
        <RadixSelect.Icon>
          <span aria-hidden style={{ color: "rgba(47,36,32,.5)" }}>
            ▾
          </span>
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content style={contentStyle}>
          <RadixSelect.Viewport>
            {options.map((o) => (
              <RadixSelect.Item key={o} value={o} style={itemStyle}>
                <RadixSelect.ItemText>{o}</RadixSelect.ItemText>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}
