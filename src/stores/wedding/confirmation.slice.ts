import { StateCreator } from "zustand";


export interface IConfirmationSlice {
    isConfirmed: boolean;

    setIsConfirmed: (value: boolean) => void;
}

export const createConfirmationSlice : StateCreator<IConfirmationSlice> = (set) => ({
    
    isConfirmed: false,
    
    setIsConfirmed: ( value:boolean ) => set({ isConfirmed: value })
})