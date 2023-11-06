import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

export const firebaseConfig = {

    apiKey: "AIzaSyDKHEE5yytUzHQf1E6CBn0mXRY8a3ofnV0",
    authDomain: "bwi-mewe.firebaseapp.com",
    projectId: "bwi-mewe",
    storageBucket: "bwi-mewe.appspot.com",
    messagingSenderId: "914320733141",
    appId: "1:914320733141:web:da9917fd9e7e95a315c35c",
    measurementId: "G-QPNYE9SPH6"
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);
