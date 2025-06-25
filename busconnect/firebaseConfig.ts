// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// @ts-ignore 
import { initializeAuth } from 'firebase/auth';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVuWFq2gR_HaqBIhCkirPemic6hzK2VXo",
  authDomain: "busconnect-133bd.firebaseapp.com",
  projectId: "busconnect-133bd",
  storageBucket: "busconnect-133bd.firebasestorage.app",
  messagingSenderId: "468764745896",
  appId: "1:468764745896:web:6b81cdc73f6cefdb95229d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = initializeAuth(app);