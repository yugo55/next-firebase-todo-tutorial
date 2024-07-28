import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmIwD79P2nME2_4QYUoy6N50Jmwx6Oucw",
  authDomain: "next-firebase-todo-tutorial.firebaseapp.com",
  projectId: "next-firebase-todo-tutorial",
  storageBucket: "next-firebase-todo-tutorial.appspot.com",
  messagingSenderId: "807794838519",
  appId: "1:807794838519:web:9e4097f06c62fa4bf7bcf2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };