// firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCSnJNGmzNNWzXG67VV7zCHo4j5UPBpUEw",
  authDomain: "todo-list-firebase-acd62.firebaseapp.com",
  projectId: "todo-list-firebase-acd62",
  storageBucket: "todo-list-firebase-acd62.firebasestorage.app",
  messagingSenderId: "44803877802",
  appId: "1:44803877802:web:b7391feae55b14d9fc19d3"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const collectionTasks = collection(db, "tasks")
const collectionProfile = collection(db, "profile")
export { db, auth, collectionProfile, collectionTasks}; // Exporte `auth` explicitamente
