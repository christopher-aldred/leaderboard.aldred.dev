import { Timestamp, addDoc, collection } from "firebase/firestore";
import db from "../firebaseConfig";

export default async function createNewBoard() {
  const newBoardDoc = await addDoc(collection(db, "boards"), {});

  const usersCollection = collection(db, "boards", newBoardDoc.id, "users");

  const newUserDoc = await addDoc(usersCollection, {
    name: "Jeff",
  });

  const pointsCollection = collection(db, "boards", newBoardDoc.id, "points");

  await addDoc(pointsCollection, {
    user_id: newUserDoc.id,
    description: "Created first user",
    score: 1,
    date: Timestamp.fromDate(new Date()),
  });

  return newBoardDoc.id;
}
