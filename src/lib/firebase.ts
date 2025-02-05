import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2acFisql4JMzNTHUPQA06J8hjtccxYZM",
  authDomain: "hackthehackers-3a983.firebaseapp.com",
  projectId: "hackthehackers-3a983",
  storageBucket: "hackthehackers-3a983.firebasestorage.app",
  messagingSenderId: "200316725086",
  appId: "1:200316725086:web:1a9588dc25d9a909e551cf",
  measurementId: "G-52TPBPCPVG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
const auth = getAuth(app);

// Set persistence immediately
setPersistence(auth, browserLocalPersistence);

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };