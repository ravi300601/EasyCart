import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "easy-cart-fdf5c.firebaseapp.com",
  projectId: "easy-cart-fdf5c",
  storageBucket: "easy-cart-fdf5c.appspot.com",
  messagingSenderId: import.meta.env.VITE_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app)
export {fireDB, auth}
