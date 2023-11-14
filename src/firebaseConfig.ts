import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjDW-6Z5TyzOLBpUg3jXcVU0cWm7veT1M",
  authDomain: "d-train.firebaseapp.com",
  projectId: "d-train",
  storageBucket: "d-train.appspot.com",
  messagingSenderId: "1045174940152",
  appId: "1:1045174940152:web:656accd7a29587e132a60d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;
