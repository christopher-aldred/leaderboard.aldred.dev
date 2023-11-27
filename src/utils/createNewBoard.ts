import { addDoc, collection, setDoc } from "firebase/firestore";
import db from "../firebaseConfig";

export default async function createNewBoard(title?: string) {
  const newBoardDoc = await addDoc(collection(db, "boards"), {});

  if (typeof title !== "undefined" && title !== "") {
    setDoc(newBoardDoc, { title: title }, { merge: true });
  }

  const usersCollection = collection(db, "boards", newBoardDoc.id, "users");

  const newPlayer = await addDoc(usersCollection, {
    name: "Player one",
  });

  return newPlayer.path.split("/")[1];
}
