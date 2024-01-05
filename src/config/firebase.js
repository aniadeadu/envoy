// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCdf2NuQVECEhmAV81NO5MLrQ-b-6LqQdE",
  authDomain: "envoy-14bad.firebaseapp.com",
  projectId: "envoy-14bad",
  storageBucket: "envoy-14bad.appspot.com",
  messagingSenderId: "1058138694781",
  appId: "1:1058138694781:web:4ee90bceedf8b8f759bd14"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage()
export const db = getFirestore();
// import * as firebase from "firebase/app";
// import { initializeApp } from "firebase/app";
// import  "firebase/auth";
// export const authi  = firebase.initializeApp({
//   apiKey: "AIzaSyCdf2NuQVECEhmAV81NO5MLrQ-b-6LqQdE",
//   authDomain: "envoy-14bad.firebaseapp.com",
//   projectId: "envoy-14bad",
//   storageBucket: "envoy-14bad.appspot.com",
//   messagingSenderId: "1058138694781",
//   appId: "1:1058138694781:web:4ee90bceedf8b8f759bd14"
// }.auth());
