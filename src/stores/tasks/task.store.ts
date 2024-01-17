import { StateCreator, create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { ITask, TaskStatus } from "../../interfaces";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
//import { produce } from "immer";

interface ITaskState {
  /*

    Record<K, T> es una característica de TypeScript que representa un objeto con claves de tipo K y valores de tipo T

    También se puede usar {[key:string]: ITask}

  */

  draggingTaskId?: string;
  tasks: Record<string, ITask>;

  getTaskByStatus: (status: TaskStatus) => ITask[]; //la intención es devolver un array de las tareas que coincidan con el estado.

  addTask: (title: string, status: TaskStatus) => void;

  setDraggingTaskId: (taskId: string) => void;

  removeDragginTaskId: () => void;

  changeTaskStatus: (taskId: string, status: TaskStatus) => void;

  onTaskDrop: (status: TaskStatus) => void;
}

/*
    Para obtener información del estado utilizo el "get"

    Tengo que tener en cuenta los tipados que necesita el StateCreator

*/
const storeApi: StateCreator<
  ITaskState,
  [["zustand/devtools", never], ["zustand/immer", never]]
> = (set, get) => ({
  draggingTaskId: undefined, //comienza undefined
  tasks: {
    "ABC-1": { id: "ABC-1", title: "Task 1", status: "open" },
    "ABC-2": { id: "ABC-2", title: "Task 2", status: "in-progress" },
    "ABC-3": { id: "ABC-3", title: "Task 3", status: "open" },
    "ABC-4": { id: "ABC-4", title: "Task 4", status: "open" },
    "ABC-5": { id: "ABC-5", title: "Task 5", status: "open" },
  },

  getTaskByStatus: (status: TaskStatus) => {
    const tasks = get().tasks;
    return Object.values(tasks).filter((task) => task.status === status);
    /*
        Object.values simplifica la manipulación de objetos al proporcionar un array de sus valores, 
        lo que facilita las operaciones de filtrado, mapeo u otras operaciones que puedan realizarse 
        más fácilmente en un array que en un objeto.
    */
  },

  addTask: (title: string, status: TaskStatus) => {
    const newTask = { id: uuidv4(), title, status };

    /*

    Con el middleware de immer de zustand

    */

    set((state) => {
      state.tasks[newTask.id] = newTask;
    });

    /*
    
    Para esta forma se instalo la libreria immer
    npm i immer
    
    set( produce ( (state: ITaskState) => {
      state.tasks[newTask.id] = newTask;
    }));
    
    */

    /*

    Esto es la forma nativa de hacerlo 

    set( state => ({
      tasks: {
        ...state.tasks,
        [newTask.id]: newTask,
      },
    }));

    */
  },

  // le asigno un id al estado "draggingTaskId"
  setDraggingTaskId: (taskId: string) => {
    set({ draggingTaskId: taskId });
  },

  removeDragginTaskId: () => {
    set({
      draggingTaskId: undefined,
    });
  },

  changeTaskStatus: (taskId: string, status: TaskStatus) => {
    /*

    Utilizo esta parte cuando lo quiero hacer de la forma tradicional de Zustand.

    // obtengo la tarea según el id
    const task = get().tasks[taskId];
    
    // le cambio el status a la tarea que tomé
    task.status = status;
    */

    /* 
    Con el middleware de immer zustand

    "set": Es una función proporcionada por Zustand que se utiliza para actualizar el estado. 
           Toma una función que describe cómo se debe actualizar el estado.

    "state => {...}": Es una función que toma el estado actual como argumento y devuelve el nuevo estado. 
                      Aquí estás utilizando la función de flecha para definir esta función.

    "state.tasks[taskId]": Accedes al objeto de tareas dentro del estado y seleccionas la tarea específica identificada por su taskId.

    "{...state.tasks[taskId]}": Utilizas el operador de propagación (...) para crear una copia superficial (clon) de la tarea. 
                                Esto es crucial para mantener la inmutabilidad. 
                                En lugar de modificar directamente la tarea, estás creando un nuevo objeto que comparte las mismas propiedades, 
                                pero es independiente.

    "status": Estás actualizando la propiedad status de la tarea con el nuevo valor.

    En conjunto, la línea state.tasks[taskId] = {...state.tasks[taskId], status}; está actualizando la tarea específica en el estado, 
    pero en lugar de modificar directamente la tarea, estás creando un nuevo objeto de tarea con el estado actualizado y asignándolo al estado.

    */
    set((state) => {
      state.tasks[taskId] = {
        ...state.tasks[taskId],
        status,
      };
    });
    /*
   
    Forma tradicional de Zustand
    Con el operador de propagación obtengo todas las tareas tal cual estaban
    y con el [taskId] agrego o actualizo la tarea con el nuevo status.
    set((state) => ({
      tasks: {
        ...state.tasks,
        [taskId]: task,
      },
    }));
   
    */
  },

  onTaskDrop: (status: TaskStatus) => {
    const taskId = get().draggingTaskId;
    if (!taskId) return;
    get().changeTaskStatus(taskId, status);
    get().removeDragginTaskId();
  },
});

export const useTaskStore = create<ITaskState>()(
  devtools(
    persist(
      immer(
        storeApi
        ), { name: "task-store" }
      )
    )
);
