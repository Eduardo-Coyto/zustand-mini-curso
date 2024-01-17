import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IBear {
  id: number;
  name: string;
}

interface IBearState {
  blackBears: number;
  polarBears: number;
  pandaBears: number;

  bears: IBear[];

  totalBears: () => number;

  increaseBlackBears: (by: number) => void;
  increasePolarkBears: (by: number) => void;
  increasePandaBears: (by: number) => void;

  doNothing: () => void;
  addBears: () => void;
  clearBears: () => void;
}

/* 

Como estamos en ts primero invocamos el create con "()" y luego como "create" es una función invocamos la función

A su vez, como estamos en ts también necesitamos tipar el create a través de un interface "<IBearState>"

*/

export const useBearStore = create<IBearState>()(
  persist((set, get) => ({
    blackBears: 10,
    polarBears: 5,
    pandaBears: 1,

    bears: [{ id: 1, name: "Oso #1" }],

    totalBears: () => {
      return (
        get().blackBears +
        get().polarBears +
        get().pandaBears +
        get().bears.length
      );
    },

    increaseBlackBears: (by: number) =>
      set((state) => ({ blackBears: state.blackBears + by })),

    increasePolarkBears: (by: number) =>
      set((state) => ({ polarBears: state.polarBears + by })),

    increasePandaBears: (by: number) =>
      set((state) => ({ pandaBears: state.pandaBears + by })),

    doNothing: () => set((state) => ({ bears: [...state.bears] })),
    addBears: () =>
      set((state) => ({
        bears: [
          ...state.bears,
          {
            id: state.bears.length + 1,
            name: `Oso #${state.bears.length + 1}`,
          },
        ],
      })),
    clearBears: () => set({ bears: [] }),
  }), {
    name:"bear-storage"
  })
);
