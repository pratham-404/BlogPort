
// npm install firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getAuth, GoogleAuthProvider} from "firebase/auth";

import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHa99vIdheD_f3L0raTYn4L9emTfOHaHM",
  authDomain: "social-network-site-6468f.firebaseapp.com",
  projectId: "social-network-site-6468f",
  storageBucket: "social-network-site-6468f.appspot.com",
  messagingSenderId: "398868945968",
  appId: "1:398868945968:web:bb5c5103bab54cfe34a1f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);