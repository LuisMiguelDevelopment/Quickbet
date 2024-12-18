import { useState, useEffect } from "react";
import { useMovieContext } from "@/context/movies.context";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import ProgresoCirculo from "./circuloProgreso";
import { FaHeart } from "react-icons/fa";

export const UpComing = () => {
  const { upComing, ObtenerUpComing } = useMovieContext();

  useEffect(() => {
    const fetchUpComing = async () => {
      try {
        await ObtenerUpComing();
      } catch (error) {
        console.log(error);
      }
    };
    fetchUpComing();
  }, []);

  return (
    <>
      {upComing.map((movie, index) => {
        return (
          <div key={index} className="flex gap-5">
            <Card
              className=" max-w-[300px] h-[375px]"
              style={{ width: "200px" }}
            >
              <CardHeader className="flex p-0 w-full ">
                <Image
                  alt={movie.title}
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                  width={"100%"}
                  height={"223px"}
                  className="rounded-none object-cover"
                />
              </CardHeader>
              <Divider />
              <CardBody>
                <div className="flex flex-col">
                  <p className="text-md">{movie.title}</p>{" "}
                  <p className="text-small text-default-500">
                    {movie.release_date}
                  </p>
                </div>
              </CardBody>

              <CardFooter className="flex justify-center items-center gap-5">
                <div>
                  <span className="text-sm">Rating</span>
                  <ProgresoCirculo
                    porcentaje={movie.vote_average}
                    size={"35px"}
                    fontSize="10px"
                  />
                </div>

                <div>
                  <span className="text-sm">Rating</span>
                  <div
                    className=" hover:text-red-500 transition-colors duration-300 cursor-pointer"
                    style={{ fontSize: "35px" }}
                  >
                    <FaHeart />
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        );
      })}
    </>
  );
};

export default UpComing;
