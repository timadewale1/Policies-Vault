import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "./client";

export type Publication = {
  id: string;
  title: string;
  type: "Article" | "Commentary" | "Brief" | "Analysis";
  excerpt?: string;

  // Body supports all formats
  contentFormat?: "markdown" | "html" | "pdf";
  content?: string; // markdown/html
  pdfUrl?: string;  // used when contentFormat="pdf"

  coverImageUrl?: string;

  status: "draft" | "published";
  publishedAt?: Timestamp;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export async function fetchPublications() {
  const q = query(
    collection(db, "publications"),
    where("status", "==", "published"),
    orderBy("publishedAt", "desc")
  );

  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as Publication[];
}
