import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getFirestore } from "firebase/firestore";

async function app() {
  if (process.env.REACT_APP_FIREBASE_ENV === "PROD") {
    console.log("** PROD environment **");
    return initializeApp({
      apiKey: "AIzaSyA3-DWnpkiE-o5Yr23l0ZzF-JBf7ANzAPI",
      authDomain: "leader-board-app.firebaseapp.com",
      projectId: "leader-board-app",
      storageBucket: "leader-board-app.appspot.com",
      messagingSenderId: "875468914437",
      appId: "1:875468914437:web:85e853410aa77226aa016c",
    });
  } else {
    console.log("** TEST environment **");
    return initializeApp({
      apiKey: "AIzaSyDTCD5eZ5KGlH2WjcArdtPu3PAL90Io1Eg",
      authDomain: "leader-board-app-test.firebaseapp.com",
      projectId: "leader-board-app-test",
      storageBucket: "leader-board-app-test.appspot.com",
      messagingSenderId: "784635245438",
      appId: "1:784635245438:web:6829b9800c91263cf2792f",
    });
  }
}

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  (<any>window).FIREBASE_APPCHECK_DEBUG_TOKEN = process.env.REACT_APP_DEBUG_KEY;
}

initializeAppCheck(await app(), {
  provider: new ReCaptchaV3Provider(process.env.REACT_APP_SITE_KEY!),
  isTokenAutoRefreshEnabled: true, // Set to true to allow auto-refresh.
});

const db = getFirestore(await app());
export default db;
