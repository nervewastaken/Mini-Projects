// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJLeoQKt0dovTUEF1YpnfTa3yLR9lbtUQ",
  authDomain: "reviewapp-8eb79.firebaseapp.com",
  projectId: "reviewapp-8eb79",
  storageBucket: "reviewapp-8eb79.appspot.com",
  messagingSenderId: "983756448900",
  appId: "1:983756448900:web:d08e4046447b68e2254ed1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db