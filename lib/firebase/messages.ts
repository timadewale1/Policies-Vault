import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./client";

export async function sendContactMessage(payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  await addDoc(collection(db, "messages"), {
    ...payload,
    status: "new",
    createdAt: serverTimestamp(),
  });
}
