
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBf9m_06tUJrzzBAnnkA2V1bIwP40d7CW4",
  authDomain: "reactlinks-a72bd.firebaseapp.com",
  projectId: "reactlinks-a72bd",
  storageBucket: "reactlinks-a72bd.appspot.com",
  messagingSenderId: "977953825720",
  appId: "1:977953825720:web:1036764e86d1d14d81254d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);

export { auth, db};