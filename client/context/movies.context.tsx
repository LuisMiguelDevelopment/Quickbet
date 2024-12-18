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
  ObtenerUpComingRequest,
  ObtenerTopRateRequest,
  BuscarMovieRequest,
} from "@/pages/api/movies";

interface MoviesContestType {
  movies: Record<string, any>[];
  randomMovie: Record<string, any> | null;
  nowPaying: Record<string, any>[];
  upComing: Record<string, any>[];
  topRate: Record<string, any>[];
  searchResults: Record<string, any>[];
  ObtenerTodasPeliculas: () => Promise<void>;
  ObtenerNowPaying: () => Promise<void>;
  ObtenerUpComing: () => Promise<void>;
  ObtenerTopRate: () => Promise<void>;
  ObtenerPeliculaAleatoria: () => void;
  BuscarMovie: (query: string) => Promise<void>;
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
  const [upComing, setUpComing] = useState<Record<string, any>[]>([]);
  const [topRate, setTopRate] = useState<Record<string, any>[]>([]);
  const [randomMovie, setRandomMovie] = useState<Record<string, any> | null>(
    null
  );
  const [searchResults, setSearchResults] = useState<Record<string, any>[]>([]);

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
  const ObtenerUpComing = async () => {
    try {
      const res = await ObtenerUpComingRequest();
      console.log(res, "hey");
      setUpComing(res);
    } catch (error) {
      console.log(error);
    }
  };
  const ObtenerTopRate = async () => {
    try {
      const res = await ObtenerTopRateRequest();
      console.log(res, "hey");
      setTopRate(res);
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

  const BuscarMovie = async (query: string) => {
    try {
      const res = await BuscarMovieRequest(query);
      setSearchResults(res);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const movieContextValue: MoviesContestType = {
    movies,
    randomMovie,
    nowPaying,
    upComing,
    topRate,
    searchResults,
    ObtenerTodasPeliculas,
    ObtenerPeliculaAleatoria,
    ObtenerNowPaying,
    ObtenerUpComing,
    ObtenerTopRate,
    BuscarMovie,
  };

  return (
    <MoviesContext.Provider value={movieContextValue}>
      {children}
    </MoviesContext.Provider>
  );
};
