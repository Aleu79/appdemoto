import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyChlSOwq5uA4T5LRkpYwF5ENn5gP1qFV0Y",
  authDomain: "motoss-414b8.firebaseapp.com",
  projectId: "motoss-414b8",
  storageBucket: "motoss-414b8.appspot.com",
  messagingSenderId: "452076350520",
  appId: "1:452076350520:web:8e401a13b40a7cfd910acd",
  databaseURL: "https://motoss-414b8-default-rtdb.firebaseio.com/"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener referencia a la base de datos
const database = getDatabase(app);

export { database };
