import { auth, db } from "@/lib/firebase/client";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

async function ensureUserDoc(user: User) {
  const ownerEmail = process.env.NEXT_PUBLIC_OWNER_EMAIL?.toLowerCase();
  const isOwner = ownerEmail && (user.email?.toLowerCase() === ownerEmail);

  const ref = doc(db, "users", user.uid);

  await setDoc(ref, {
    uid: user.uid,
    email: user.email ?? null,
    displayName: user.displayName ?? null,
    role: isOwner ? "admin" : "user", // ✅ automatic but safe
    createdAt: serverTimestamp(),
  });
}

export async function signUpEmail(email: string, password: string) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await ensureUserDoc(cred.user);
  return cred.user;
}

export async function signInEmail(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  await ensureUserDoc(cred.user);
  return cred.user;
}

export async function signInGoogle() {
  const provider = new GoogleAuthProvider();
  const cred = await signInWithPopup(auth, provider);
  await ensureUserDoc(cred.user);
  return cred.user;
}

export async function logout() {
  await signOut(auth);
}
