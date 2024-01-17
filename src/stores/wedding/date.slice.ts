import { StateCreator } from "zustand";


export interface IDateSlice {
    eventDate: Date;

    eventYYYYMMDD: () => string;
    eventHHMM: () => string;

    setEventDate: (parcialDate: string) => void;
    setEventTime: (parcialTime: string) => void;
}

export const createDateSlice: StateCreator<IDateSlice> = (set, get) => ({
    eventDate:new Date(),

    eventYYYYMMDD: () => {
        // es una forma de devolver la fecha, por eso lo cortamos antes de la T verificarlo en consola de google. Te retorna un Array con la fecha.
        return get().eventDate.toISOString().split('T')[0]
    },
    eventHHMM: () => {
        // padStart significa que siempre tiene que tener 2 letras y si falta uno lo completamos con 0. Probar en consola de google.
        const hours = get().eventDate.getHours().toString().padStart(2, '0');
        const minutes = get().eventDate.getMinutes().toString().padStart(2, '0');

        return `${hours}:${minutes}`;
    },
    
    
    setEventDate: (parcialDate: string) => set( (state) => {
        const date = new Date(parcialDate);

        const year = date.getFullYear();
        const month = date.getMonth() + 1; //hay que +1 para el mes de bien debido a que esta en base 0 la función getMonth()
        const day = date.getDate() + 1; //hay que +1 al día de bien debido a que esta en base 0 la función getDate()

        //console.log({year, month, day});

        // me creo una nueva fecha basado en la fecha anterior para poder realizar la mutación y que sea notificado los cambios. 
        const newDate = new Date( state.eventDate);
        newDate.setFullYear(year, month, day);
        
        return { eventDate: newDate }
    }),
    setEventTime: (parcialTime: string) =>  set( state => {

        const hours = parseInt(parcialTime.split(':')[0]);
        const minutes = parseInt(parcialTime.split(':')[1]);
        
         // me creo una nueva fecha basado en la fecha anterior para poder realizar la mutación y que sea notificado los cambios. 
         const newDate = new Date( state.eventDate);
         newDate.setHours(hours, minutes);

        return { eventDate: newDate }
    })

})