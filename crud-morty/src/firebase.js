import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDRI8HkgoyPUO3jzjAT39VkvF6u1iLeIZg",
  authDomain: "crud-rick-and-morty.firebaseapp.com",
  projectId: "crud-rick-and-morty",
  storageBucket: "crud-rick-and-morty.appspot.com",
  messagingSenderId: "618472832540",
  appId: "1:618472832540:web:0fa7ded9bb30acc982e9d9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export {firebase}