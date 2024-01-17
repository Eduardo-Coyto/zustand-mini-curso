import { StateCreator } from "zustand";




export interface IPersonSlice {

    firstName: string;
    lastName: string;

    setFirstName: (value: string) => void;
    setLastName: (value: string) => void;

}

export const createPersonSlice: StateCreator<IPersonSlice> = (set) => ({
    firstName: "",
    lastName: "",

    setFirstName: (firstName: string) => set({firstName}),
    setLastName: (lastName: string) => set({lastName})
})