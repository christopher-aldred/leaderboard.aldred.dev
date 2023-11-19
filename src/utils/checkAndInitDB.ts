import { addDoc, collection, getCountFromServer } from "firebase/firestore";
import db from "../firebaseConfig";

async function checkAndInitDB() {
  const collUsers = collection(db, "users");
  const snapshot = await getCountFromServer(collUsers);
  if (snapshot.data().count < 1) {
    await addDoc(collUsers, {
      name: "User 1",
    });
    await addDoc(collUsers, {
      name: "User 2",
    });
    await addDoc(collUsers, {
      name: "User 3",
    });
    console.log("Users initialised");
  }
}

export default checkAndInitDB;
