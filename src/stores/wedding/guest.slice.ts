import { StateCreator } from "zustand";


export interface IGuestSlice {
    guestCount: number;

    setGuestCount: (value: number) => void;
}

export const createGuestSlice : StateCreator<IGuestSlice> = (set) => ({
    guestCount: 0,
   
    setGuestCount: (guestCount: number) => set({
        guestCount: guestCount > 0 ? guestCount : 0 
    })
})