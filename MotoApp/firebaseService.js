import { ref, set } from 'firebase/database';
import { database } from './firebaseConfig';

export const agregarMoto = (marca, nuevaMoto) => {
  const motoRef = ref(database, `motos/${marca}/${new Date().getTime()}`); // Usar timestamp como ID único
  set(motoRef, nuevaMoto)
    .then(() => {
      console.log("Moto agregada correctamente");
    })
    .catch((error) => {
      console.error("Error al agregar moto:", error);
    });
};