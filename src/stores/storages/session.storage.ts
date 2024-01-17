import { StateStorage, createJSONStorage } from "zustand/middleware";


/*

Dependiendo de la persistencia que se quiera obtener hay que analizar si se prefiere tener en el local storage o en el session storage

Con "sessionStorage" se crea el objeto del storage y con el createJSONStorage se lo asigna.

La idea es tener un objeto reutilizable para implementar el sessionStorage en cualquier parte de la aplicación

*/

const storageSessionApi: StateStorage = {
    getItem: function (name: string): string | Promise<string | null> | null {
      /*
       Quiero revisar el "sessionStorage"
      */
  
       const data = sessionStorage.getItem(name);
      return data;
    },
  
    setItem: function (name: string, value: string): void | Promise<void> {
      sessionStorage.setItem(name, value);
    },
  
    removeItem: function (name: string): void | Promise<void> {
      console.log("removeItem", name);
    },
  };

  export const customsessionStorage = createJSONStorage(() => storageSessionApi)