// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxVZfrVI3Pbplgj4BsgHHQ12Vl-ABqjrk",
  authDomain: "luminicate-57dbb.firebaseapp.com",
  databaseURL: "https://luminicate-57dbb-default-rtdb.firebaseio.com",
  projectId: "luminicate-57dbb",
  storageBucket: "luminicate-57dbb.appspot.com",
  messagingSenderId: "945286549382",
  appId: "1:945286549382:web:7a4869525bf14354956607",
  measurementId: "G-M28W2X8MYP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const auth=getAuth(app);
export default app;