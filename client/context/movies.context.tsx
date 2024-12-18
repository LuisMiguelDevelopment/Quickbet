import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import {
  ObtenerTodasPeliculasRequest,
  ObtenerNowPayingRequest,
} from "@/pages/api/movies";

interface MoviesContestType {
  movies: Record<string, any>[];
  randomMovie: Record<string, any> | null;
  nowPaying: Record<string, any>[];
  ObtenerTodasPeliculas: () => Promise<void>;
  ObtenerNowPaying: () => Promise<void>;
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
  const [nowPaying, setNowPaying] = useState<Record<string, any>[]>([]);
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

  const ObtenerNowPaying = async () => {
    try {
      const res = await ObtenerNowPayingRequest();
      console.log(res, "hey");
      setNowPaying(res);
    } catch (error) {
      console.log(error);
    }
  };

  const ObtenerPeliculaAleatoria = async () => {
    if (movies.length === 0) return;

    const randomIndex = Math.floor(Math.random() * movies.length);
    const movieSeleccionada = movies[randomIndex];
    console.log(movieSeleccionada);
    setRandomMovie(movieSeleccionada);
  };

  const movieContextValue: MoviesContestType = {
    movies,
    randomMovie,
    nowPaying,
    ObtenerTodasPeliculas,
    ObtenerPeliculaAleatoria,
    ObtenerNowPaying,
  };

  return (
    <MoviesContext.Provider value={movieContextValue}>
      {children}
    </MoviesContext.Provider>
  );
};
