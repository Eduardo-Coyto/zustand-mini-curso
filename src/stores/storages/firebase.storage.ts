import { StateStorage, createJSONStorage } from "zustand/middleware";

const firebaseurl =
  "https://zustand-storage-854bc-default-rtdb.firebaseio.com/zustand";

const firebaseApi: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    const data = await fetch(`${firebaseurl}/${name}.json`).then((res) =>
      res.json()
    );
    //console.log(data);
    // debo parsearlo a string para poder visualizarlo en la UI
    return JSON.stringify(data);
  },

  setItem: async function (name: string, value: string): Promise<void> {
    await fetch(`${firebaseurl}/${name}.json`, {
      method: "PUT",
      body: value,
    }).then((res) => res.json());

    return;
  },

  removeItem: function (name: string): void | Promise<void> {
    console.log("removeItem", name);
  },
};

export const firebaseStorage = createJSONStorage(() => firebaseApi);
