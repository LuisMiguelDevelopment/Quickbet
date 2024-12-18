import axios from "./axios";

export const ObtenerTodasPeliculasRequest = async (): Promise<
  Record<string, any>[]
> => {
  try {
    const response = await axios.get("/movies/all-movies");
    return response.data;
  } catch (error) {
    console.error("Error al obtener las películas", error);
    throw error;
  }
};

export const ObtenerNowPayingRequest = async (): Promise<
  Record<string, any>[]
> => {
  try {
    const response = await axios.get("/movies/now-paying");
    return response.data;
  } catch (error) {
    console.error("Error al obtener las películas", error);
    throw error;
  }
};

export const ObtenerUpComingRequest = async (): Promise<
  Record<string, any>[]
> => {
  try {
    const response = await axios.get("/movies/up-coming");
    return response.data;
  } catch (error) {
    console.error("Error al obtener las películas", error);
    throw error;
  }
};
