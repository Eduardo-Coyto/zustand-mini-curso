import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { IPersonSlice, createPersonSlice } from "./person.slice";
import { IGuestSlice, createGuestSlice } from "./guest.slice";
import { IDateSlice, createDateSlice } from "./date.slice";
import { IConfirmationSlice, createConfirmationSlice } from "./confirmation.slice";

type ShareState = IPersonSlice & IGuestSlice & IDateSlice & IConfirmationSlice;

/*
    Creamos el Store
    Es buena practica utilizar en alguna parte del nombre el término "Bound", lo cual significa que el store esta realizado por slices 


    create<>()(
    (...a) => ({
        ...createPersonSlice(...a),
    })
    )

    "(...a)": Operador rest que esta dentro del argumento de la función y que significa tener (set, get, store)
    "...createPersonSlice(...a)": Slice creado con logica del estado 
    
*/

export const useWeddingBoundStore = create<ShareState>()(
  devtools((...a) => ({
    ...createPersonSlice(...a),
    ...createGuestSlice(...a),
    ...createDateSlice(...a),
    ...createConfirmationSlice(...a)
  }))
);
