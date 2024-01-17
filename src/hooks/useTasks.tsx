import { DragEvent, useState } from "react";
import Swal from "sweetalert2";
import { useTaskStore } from "../stores";
import { TaskStatus } from "../interfaces";

interface IOptions {
    status: TaskStatus
}


export const useTasks = ({ status }: IOptions) => {
  
   /*  La doble negación es para convertir su valore a su equivalente booleano. 
      Esta técnica se utiliza para asegurarse de que el valor sea interpretado como un booleano, independientemente del tipo de dato original. 
  */
      const isdragging = useTaskStore((state) => !!state.draggingTaskId);
      const onTaskDrop = useTaskStore((state) => state.onTaskDrop);
      const addTask = useTaskStore((state) => state.addTask);
    
      const [onDragOver, setOnDragOver] = useState(false);
    
      const handleAddTask = async () => {
        const { isConfirmed, value } = await Swal.fire({
          title: "Nueva Tarea",
          input: "text",
          inputLable: "Nombre de la tarea",
          inputPlaceholder: "Ingrese el nombre de la tarea",
          showCancelButton: true,
          inputValidator: (value) => {
            if (!value) {
              return "¡No puedes dejarlo vacío!";
            }
          },
        });
    
        if (!isConfirmed) return;
        addTask( value, status);
      };
    
      const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setOnDragOver(true);
      };
      const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setOnDragOver(false);
      };
      const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setOnDragOver(false);
        onTaskDrop(status);
      };
  
  
  
  
    return {
        // Propiedades
        isdragging,

        // Métodos
        onDragOver,
        handleAddTask,
        handleDragOver,
        handleDragLeave,
        handleDrop
    }
}


