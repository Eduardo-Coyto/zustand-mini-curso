import { type StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useWeddingBoundStore } from "../wedding";
//import { customsessionStorage } from "../storages/session.storage";
//import { firebaseStorage } from "../storages/firebase.storage";
//import { logger } from "../middlewares/logger.middleware";

interface IPersonState {
  firstName: string;
  lastName: string;
}

interface IAction {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

/*

Middleware en Zustand

Son funciones que expanden las funciones que tenemos en Zustand
Permiten manipular el estado antes y después de ejecutar una acción.

La función "persist" nos permite hacer persistente nuestro store.
Esto significa que si cierran la pestaña del navegador, al volver a abrirla, el store seguirá con los valores anteriores.

Para que el código quede más legible, es buena práctica separar el middleware de la lógica. Con "storeApi" separo lógica del middleware

*/

const storeApi: StateCreator<
  IPersonState & IAction,
  [["zustand/devtools", never]]
> = (set) => ({
  firstName: "",
  lastName: "",
  /*
  El callback tiene 3 argumentos
  1° Value
  2° Si quiero sobreescribir el estado anterior (true/false)
  3° Nombre de mi acción
  */
  setFirstName: (value: string) =>
    set({ firstName: value }, false, "setFirstname"),
  setLastName: (value: string) =>
    set({ lastName: value }, false, "setLastName"),
});

export const usePersonStore = create<IPersonState & IAction>()(
  devtools(
    persist(storeApi, {
      name: "person-storage",
      //storage: customsessionStorage,
      //storage: firebaseStorage,
    })
  )
);

/*
    La siguiente funcionalidad me permite si hago cambios en el estado de la persona, 
    puedo a su vez cambiar el estado del nombre y apellido del invitado en el dasboard del wedding. 

    Lo que realiza es que me suscribo al usePersonStore y puedo visualizar el estado anterior y el estado actual de la variable.

    Sólo lo debo realizar en uno de los store porque sino origino una acción cíclica.

*/
usePersonStore.subscribe( (nextState, prevState ) => {
  //console.log({nextState, prevState})
  const { firstName, lastName } = nextState;

  useWeddingBoundStore.getState().setFirstName(firstName);
  useWeddingBoundStore.getState().setLastName(lastName);
});
