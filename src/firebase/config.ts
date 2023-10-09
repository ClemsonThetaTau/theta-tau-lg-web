import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAXWZ2GUKOBaRi10YQWzMqw1-s5krK2ZSQ",
  authDomain: "theta-tau-lambda-gamma.firebaseapp.com",
  projectId: "theta-tau-lambda-gamma",
  storageBucket: "theta-tau-lambda-gamma.appspot.com",
  messagingSenderId: "786566986467",
  appId: "1:786566986467:web:e3501dfdb368e5d45e23d6",
  measurementId: "G-87T7K6GX57"
};

// const firebaseConfig = {
//     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//     measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
// };

// Initialize Firebase
let app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
