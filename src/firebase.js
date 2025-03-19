import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDZ5pm6UKkZ4nwzTf9fdxp8LKIi1VC7ti0",
  authDomain: "fir-chat-1ef4f.firebaseapp.com",
  projectId: "fir-chat-1ef4f",
  storageBucket: "fir-chat-1ef4f.firebasestorage.app",
  messagingSenderId: "119990007107",
  appId: "1:119990007107:web:ef3ab65836de570eedabf6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
