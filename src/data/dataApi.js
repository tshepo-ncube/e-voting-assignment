import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  getDocs,
  runTransaction,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQApGBO474rvXb0NLeTJjTye5DBUgmHJ0",
  authDomain: "inf4027workshop.firebaseapp.com",
  projectId: "inf4027workshop",
  storageBucket: "inf4027workshop.appspot.com",
  messagingSenderId: "847946574269",
  appId: "1:847946574269:web:d618594c3773bed7814ad4",
  measurementId: "G-BQ911VSE7E",
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);
