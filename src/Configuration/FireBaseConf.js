
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyCkJJ2hM6ccHHCHtEI_k6h5CtvF6jGUds4",
  authDomain: "todoproject-e7a15.firebaseapp.com",
  projectId: "todoproject-e7a15",
  storageBucket: "todoproject-e7a15.appspot.com",
  messagingSenderId: "548626875309",
  appId: "1:548626875309:web:8ed97f8a79e463bb20d724",
  measurementId: "G-46PX8VMNNR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig