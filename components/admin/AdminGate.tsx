"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { isAdmin } from "@/lib/firebase/isAdmin";
import { usePathname, useRouter } from "next/navigation";

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [state, setState] = useState<"loading" | "ok" | "nope">("loading");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        setState("nope");
        if (pathname !== "/admin/login") router.replace("/admin/login");
        return;
      }
      const ok = await isAdmin(u.uid);
      if (!ok) {
        setState("nope");
        router.replace("/");
        return;
      }
      setState("ok");
    });

    return () => unsub();
  }, [router, pathname]);

  if (pathname === "/admin/login") return <>{children}</>;
  if (state === "ok") return <>{children}</>;

  return (
    <div className="container" style={{ padding: "60px 0", textAlign: "center" }}>
      <p style={{ margin: 0, color: "var(--muted)" }}>Checking access…</p>
    </div>
  );
}
