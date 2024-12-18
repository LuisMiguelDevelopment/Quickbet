import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { ObtenerTodasPeliculasRequest } from "@/pages/api/movies";

interface MoviesContestType {
  movies: Record<string, any>[];
  randomMovie: Record<string, any> | null;
  ObtenerTodasPeliculas: () => Promise<void>;
  ObtenerPeliculaAleatoria: () => void;
}

export const MoviesContext = createContext<MoviesContestType | undefined>(
  undefined
);

interface MyContextProviderProps {
  children: ReactNode;
}

export const useMovieContext = (): MoviesContestType => {
  const context = useContext(MoviesContext);

  if (!context) {
    throw new Error("useMovieContext debe ser usado con MoviesContextProvider");
  }

  return context;
};

export const MoviesContextProvider: React.FC<MyContextProviderProps> = ({
  children,
}) => {
  const [movies, setMovies] = useState<Record<string, any>[]>([]);
  const [randomMovie, setRandomMovie] = useState<Record<string, any> | null>(
    null
  );

  const ObtenerTodasPeliculas = async () => {
    try {
      const res = await ObtenerTodasPeliculasRequest();
      console.log(res);
      setMovies(res);
    } catch (error) {
      console.log(error);
    }
  };

  const ObtenerPeliculaAleatoria = async () => {
    if (movies.length === 0) return;

    const randomIndex = Math.floor(Math.random() * movies.length);
    const movieSeleccionada = movies[randomIndex];
    setRandomMovie(movieSeleccionada);
  };

  const movieContextValue: MoviesContestType = {
    movies,
    randomMovie,
    ObtenerTodasPeliculas,
    ObtenerPeliculaAleatoria,
  };

  return (
    <MoviesContext.Provider value={movieContextValue}>
      {children}
    </MoviesContext.Provider>
  );
};
