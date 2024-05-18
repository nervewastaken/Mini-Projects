// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4_qsF4gEAj_ojhDKczwyzJBu5JOusIRQ",
  authDomain: "nextjs-auth-proj.firebaseapp.com",
  projectId: "nextjs-auth-proj",
  storageBucket: "nextjs-auth-proj.appspot.com",
  messagingSenderId: "267998568203",
  appId: "1:267998568203:web:3db2a6f4c7876de9bf4c0e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const db = getFirestore(app);