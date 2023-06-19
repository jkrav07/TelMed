// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIz9XCmdd21hkP-uCnWTazvUAfnbhAdk8",
  authDomain: "telmed-expressmed.firebaseapp.com",
  projectId: "telmed-expressmed",
  storageBucket: "telmed-expressmed.appspot.com",
  messagingSenderId: "487412588340",
  appId: "1:487412588340:web:f403c4875ba0348564cf61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;