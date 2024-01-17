import axios from "axios";
import { useAuthStore } from "../stores";

const tesloApi = axios.create({
  baseURL: "http://localhost:3000/api",
});

/* 
  Interceptors (para saber más al respecto leer la documentación de Axios)

  Cualquier acción que salga utilziando "tesloApi" verifica primero el estado del token y los coloca en el headers de auth

*/ 
tesloApi.interceptors.request.use((config) => {

  //tomo el token que viene de Zustand. Ojo la forma que debo hacerlo ya que estoy fuera del scope de React
  const token = useAuthStore.getState().token;
  //console.log(token);

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`; // eslint-disable
  }
  return config;
});

export { tesloApi };
