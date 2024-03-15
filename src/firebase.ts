import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBtFw42SOlgnly4xRACeNlh-JBSo324edk",
  authDomain: "nwitter-reloaded-8429b.firebaseapp.com",
  projectId: "nwitter-reloaded-8429b",
  storageBucket: "nwitter-reloaded-8429b.appspot.com",
  messagingSenderId: "609151651202",
  appId: "1:609151651202:web:f1634925fe318037e6139b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);