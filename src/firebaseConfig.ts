import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3-DWnpkiE-o5Yr23l0ZzF-JBf7ANzAPI",
  authDomain: "leader-board-app.firebaseapp.com",
  projectId: "leader-board-app",
  storageBucket: "leader-board-app.appspot.com",
  messagingSenderId: "875468914437",
  appId: "1:875468914437:web:85e853410aa77226aa016c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;
