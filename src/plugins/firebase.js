import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCSnJNGmzNNWzXG67VV7zCHo4j5UPBpUEw",
  authDomain: "todo-list-firebase-acd62.firebaseapp.com",
  projectId: "todo-list-firebase-acd62",
  storageBucket: "todo-list-firebase-acd62.firebasestorage.app",
  messagingSenderId: "44803877802",
  appId: "1:44803877802:web:b7391feae55b14d9fc19d3"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Configurar Firestore e Authentication
const db = getFirestore(app);
const auth = getAuth(app);

// Configurar persistência de autenticação
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('Persistência configurada para localStorage.');
  })
  .catch((error) => {
    console.error('Erro ao configurar persistência:', error);
  });

// Configurar referências para coleções
const collectionTasks = collection(db, "tasks");
const collectionProfile = collection(db, "profile");

// Exportações
export { app, db, auth, collectionTasks, collectionProfile };
