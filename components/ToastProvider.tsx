"use client";

import React, { createContext, useCallback, useContext, useState } from "react";

type Toast = { id: string; type: "success" | "error" | "info"; title?: string; message: string };

const ToastContext = createContext<any>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((t: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2, 9);
    const toast = { id, ...t } as Toast;
    setToasts((s) => [toast, ...s]);
    setTimeout(() => {
      setToasts((s) => s.filter((x) => x.id !== id));
    }, 4000);
  }, []);

  const api = {
    success: (message: string, title?: string) => push({ type: "success", message, title }),
    error: (message: string, title?: string) => push({ type: "error", message, title }),
    info: (message: string, title?: string) => push({ type: "info", message, title }),
  };

  return (
    <ToastContext.Provider value={api}>
      {children}

      <div style={{ position: "fixed", right: 18, bottom: 18, zIndex: 9999, display: "flex", flexDirection: "column", gap: 10 }}>
        {toasts.map((t) => (
          <div
            key={t.id}
            style={{
              minWidth: 220,
              padding: "10px 12px",
              borderRadius: 10,
              color: "white",
              background: t.type === "success" ? "#16a34a" : t.type === "error" ? "#dc2626" : "#2563eb",
              boxShadow: "0 6px 20px rgba(0,0,0,.12)",
            }}
          >
            {t.title ? <div style={{ fontWeight: 700 }}>{t.title}</div> : null}
            <div style={{ marginTop: t.title ? 6 : 0, fontSize: 13 }}>{t.message}</div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
