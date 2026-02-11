import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  where,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/lib/firebase/client";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export type ContentFormat = "markdown" | "html" | "pdf";
export type Status = "draft" | "published";

export async function uploadFile(path: string, file: File) {
  const r = ref(storage, path);
  await uploadBytes(r, file);
  return await getDownloadURL(r);
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function makeUniqueSlug(collectionName: string, base: string, excludeId?: string) {
  if (!base) return base;
  let slug = base;
  let attempt = 0;
  while (attempt < 6) {
    const q = query(collection(db, collectionName), where("slug", "==", slug));
    const snap = await getDocs(q);
    const exists = snap.docs.some((d) => (excludeId ? d.id !== excludeId : true));
    if (!exists) return slug;
    // append short suffix
    const suffix = Math.random().toString(36).slice(2, 6);
    slug = `${base}-${suffix}`;
    attempt++;
  }
  return slug;
}

/* ---------- Publications ---------- */
export async function listAdminPublications() {
  const q = query(collection(db, "publications"), orderBy("updatedAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
}

export async function getPublication(id: string) {
  const snap = await getDoc(doc(db, "publications", id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as any) };
}

export async function createPublication(payload: any) {
  const base = slugify(payload.title ?? payload.slug ?? "");
  const slug = await makeUniqueSlug("publications", base);
  const ref = await addDoc(collection(db, "publications"), {
    ...payload,
    slug,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    publishedAt: payload.status === "published" ? payload.publishedAt ?? serverTimestamp() : null,
  });
  return ref.id;
}

export async function updatePublication(id: string, payload: any) {
  let slug = payload.slug ?? null;
  if (payload.title) {
    const base = slugify(payload.title);
    slug = await makeUniqueSlug("publications", base, id);
  }

  await updateDoc(doc(db, "publications", id), {
    ...payload,
    ...(slug ? { slug } : {}),
    updatedAt: serverTimestamp(),
    publishedAt: payload.status === "published" ? payload.publishedAt ?? serverTimestamp() : payload.status === "draft" ? null : undefined,
  });
}

export async function removePublication(id: string) {
  await deleteDoc(doc(db, "publications", id));
}

/* ---------- Research ---------- */
export async function listAdminResearch() {
  const q = query(collection(db, "research"), orderBy("updatedAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
}

export async function getResearch(id: string) {
  const snap = await getDoc(doc(db, "research", id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as any) };
}

export async function createResearch(payload: any) {
  const base = slugify(payload.title ?? payload.slug ?? "");
  const slug = await makeUniqueSlug("research", base);
  const ref = await addDoc(collection(db, "research"), {
    ...payload,
    slug,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    publishedAt: payload.status === "published" ? payload.publishedAt ?? serverTimestamp() : null,
  });
  return ref.id;
}

export async function updateResearch(id: string, payload: any) {
  let slug = payload.slug ?? null;
  if (payload.title) {
    const base = slugify(payload.title);
    slug = await makeUniqueSlug("research", base, id);
  }

  await updateDoc(doc(db, "research", id), {
    ...payload,
    ...(slug ? { slug } : {}),
    updatedAt: serverTimestamp(),
    publishedAt: payload.status === "published" ? payload.publishedAt ?? serverTimestamp() : payload.status === "draft" ? null : undefined,
  });
}

export async function removeResearch(id: string) {
  await deleteDoc(doc(db, "research", id));
}

/* ---------- Messages ---------- */
export async function listAdminMessages() {
  const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
}

export async function getMessage(id: string) {
  const snap = await getDoc(doc(db, "messages", id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as any) };
}

export async function updateMessage(id: string, payload: any) {
  await updateDoc(doc(db, "messages", id), {
    ...payload,
    updatedAt: serverTimestamp(),
  });
}
