import { useState, useEffect } from "react";
import { useMovieContext } from "@/context/movies.context";
import ProgresoCirculo from "./circuloProgreso";
import { FaHeart } from "react-icons/fa";

export const Banner = () => {
  const {
    ObtenerTodasPeliculas,
    ObtenerPeliculaAleatoria,
    movies,
    randomMovie,
  } = useMovieContext();

  useEffect(() => {
    const fetchMovies = async () => {
      await ObtenerTodasPeliculas();
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      ObtenerPeliculaAleatoria();
    }
  }, [movies]);

  const backdropUrl = randomMovie
    ? `https://image.tmdb.org/t/p/w1280${randomMovie.backdrop_path}`
    : "";

  const movieTitle = randomMovie ? randomMovie.original_title : "Cargando...";
  const movieDescription = randomMovie ? randomMovie.overview : "Cargando...";
  const average = randomMovie ? randomMovie.vote_average : "Cargando...";

  return (
    <>
      <div
        className="w-full flex"
        style={{
          position: "relative",
          backgroundImage: `url(${backdropUrl})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "500px",
          width: "100vw",
          color: "white",
        }}
      >
        <div className="absolute top-10 sm:bottom-5 sm:left-10 left-10 sm:top-auto">
          <h1
            className="text-white"
            style={{ fontSize: "3rem", fontWeight: "900" }}
          >
            {movieTitle}
          </h1>
          <p
            className="hidden sm:block md:text-xs lg:text-xl "
            style={{ width: "50%" }}
          >
            {movieDescription}
          </p>
        </div>
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 sm:left-auto sm:right-10 flex items-center justify-center space-x-2">
          <div
            className="mr-10 hover:text-red-500 transition-colors duration-300 cursor-pointer"
            style={{ fontSize: "25px" }}
          >
            <FaHeart />
          </div>
          <ProgresoCirculo
            porcentaje={average}
            size={"120px"}
            fontSize="20px"
          />
        </div>
      </div>
    </>
  );
};
