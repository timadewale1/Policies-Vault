import { db } from "@/lib/firebase/client";
import { doc, getDoc } from "firebase/firestore";

export async function isAdmin(uid: string) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() && snap.data().role === "admin";
}
