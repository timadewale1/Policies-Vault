import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "./client";

export type ResearchItem = {
  id: string;
  title: string;
  summary?: string;
  content?: string; // markdown or html based on contentFormat
  contentFormat?: "markdown" | "html" | "pdf"; // pdf uses pdfUrl
  pdfUrl?: string;
  coverImageUrl?: string;
  tags?: string[];
  status: "draft" | "published";
  publishedAt?: Timestamp;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export async function fetchResearch() {
  const q = query(
    collection(db, "research"),
    where("status", "==", "published"),
    orderBy("publishedAt", "desc")
  );

  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as ResearchItem[];
}
