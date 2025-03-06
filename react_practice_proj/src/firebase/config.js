// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRcq9_gRVIAT3Tz7k0JYT16J51NZQswyw",
  authDomain: "react-practice-01-832c4.firebaseapp.com",
  projectId: "react-practice-01-832c4",
  storageBucket: "react-practice-01-832c4.firebasestorage.app",
  messagingSenderId: "365208069878",
  appId: "1:365208069878:web:e481a22861ef89d8562ed7"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);