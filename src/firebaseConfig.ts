import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from "firebase/app-check";

const app = initializeApp({
  apiKey: "AIzaSyA3-DWnpkiE-o5Yr23l0ZzF-JBf7ANzAPI",
  authDomain: "leader-board-app.firebaseapp.com",
  projectId: "leader-board-app",
  storageBucket: "leader-board-app.appspot.com",
  messagingSenderId: "875468914437",
  appId: "1:875468914437:web:85e853410aa77226aa016c",
});

console.log(process.env.REACT_APP_SITE_KEY!);

initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider(process.env.REACT_APP_SITE_KEY!),
  isTokenAutoRefreshEnabled: false,
});

const db = getFirestore(app);

export default db;
