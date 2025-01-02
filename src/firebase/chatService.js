import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  doc,
  setDoc,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

async function sendMessage(chatId, sender, text) {
  const chatRef = doc(db, "chats", chatId);

  await setDoc(chatRef, { createdAt: serverTimestamp() }, { merge: true });

  const messageCollection = collection(chatRef, "messages");
  await addDoc(messageCollection, {
    sender: sender,
    text: text,
    timestamp: serverTimestamp(),
  });
}

function listenMessage(chatId, callback) {
  const chatRef = collection(doc(db, "chats", chatId), "messages");
  const chatQuery = query(chatRef, orderBy("timestamp", "asc"));
  return onSnapshot(chatQuery, (snapshot) => {
    const chatArray = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(chatArray);
  });
}

export { sendMessage, listenMessage };
