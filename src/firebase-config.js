import { initializeApp } from "firebase/app"
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCZQzY1DPVNWTsYgMAcNrTbtUgnHvh1pI0",
  authDomain: "library-v2-aeb0d.firebaseapp.com",
  projectId: "library-v2-aeb0d",
  storageBucket: "library-v2-aeb0d.appspot.com",
  messagingSenderId: "820508661390",
  appId: "1:820508661390:web:a25c882bdbbb4bb151dbdf"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
