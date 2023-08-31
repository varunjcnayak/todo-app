
import firebase from 'firebase/app';
import 'firebase/firestore'; 
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyD63PSItShkxoBaVXfgjE4IAiqj-gGP7S4",
    authDomain: "todo-app-7466c.firebaseapp.com",
    projectId: "todo-app-7466c",
    storageBucket: "todo-app-7466c.appspot.com",
    messagingSenderId: "694401033055",
    appId: "1:694401033055:web:d681205efc855243d44cea"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export Firebase services you want to use
export const db = firebase.firestore();
