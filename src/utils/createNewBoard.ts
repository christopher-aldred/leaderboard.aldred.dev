import { addDoc, collection } from "firebase/firestore";
import db from "../firebaseConfig";

export default async function createNewBoard() {
  const newBoardDoc = await addDoc(collection(db, "boards"), {});

  const usersCollection = collection(db, "boards", newBoardDoc.id, "users");

  await addDoc(usersCollection, {
    name: "Player one",
  });

  return newBoardDoc.id;
}