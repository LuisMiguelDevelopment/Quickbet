import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from "@nextui-org/react";
import { FaHeart } from "react-icons/fa";
import ProgresoCirculo from "./circuloProgreso";

interface Movie {
  title: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
}

interface CardSearchProps {
  movieSearch: Movie[];
}

export const CardSearch: React.FC<CardSearchProps> = ({ movieSearch }) => {
  return (
    <div className="flex gap-5 flex-wrap">
      {movieSearch.map((movie, index) => (
        <Card key={index} className="max-w-[200px] h-[375px]">
          <CardHeader className="p-0 w-full">
            <Image
              alt={movie.title}
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              width="100%"
              height="223px"
              className="rounded-none object-cover"
            />
          </CardHeader>
          <Divider />

          <CardBody>
            <div className="flex flex-col">
              <p className="text-md">{movie.title}</p>
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
                size="35px"
                fontSize="10px"
              />
            </div>

            <div>
              <span className="text-sm">Favorito</span>
              <div
                className="hover:text-red-500 transition-colors duration-300 cursor-pointer"
                style={{ fontSize: "35px" }}
              >
                <FaHeart />
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default CardSearch;
