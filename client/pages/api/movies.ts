import axios from "./axios";

export const ObtenerTodasPeliculasRequest = async (): Promise<Record<string, any>[]> => {
    try {
      const response = await axios.get("/movies/all-movies");
      return response.data;
    } catch (error) {
      console.error("Error al obtener las películas", error);
      throw error;
    }
  };