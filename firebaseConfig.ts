// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBH2EuC6SUTpiMKOmmu1jjLfR_WvYU_Nlg",
  authDomain: "fbla2023-b4b37.firebaseapp.com",
  projectId: "fbla2023-b4b37",
  storageBucket: "fbla2023-b4b37.appspot.com",
  messagingSenderId: "387194083926",
  appId: "1:387194083926:web:04887a53ab26793fc079f7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig, "default");
export const tempApp = initializeApp(firebaseConfig, "tempApp")

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const tempAuth = getAuth(tempApp);
