import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyB-auwX1f9JIUUH0lqdyVXK-83G4xjtPEI",
    authDomain: "app-3d-fad22.firebaseapp.com",
    projectId: "app-3d-fad22",
    storageBucket: "app-3d-fad22.appspot.com",
    messagingSenderId: "955654748992",
    appId: "1:955654748992:web:0af12bd8f9b903fac258a5"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//initialize auth
const auth = getAuth(app);

//initialize db
const db = getFirestore(app);

//initialize  storage
const storage = getStorage(app);

export { auth, db, storage };