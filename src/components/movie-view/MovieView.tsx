import { IMAGE_URL } from "@/const";
import type { IMovie } from "@/types";
import React, { type FC } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  data: undefined | IMovie[];
}

const MovieView: FC<Props> = ({ data }) => {
  const navigate = useNavigate()
  return (
    <div className="container mx-auto grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
      {data?.map((movie: IMovie) => (
        <div className="dark:bg-slate-900 bg-white relative" key={movie.id}>
          <div>
            <img
              loading="lazy"
              onClick={()=> navigate(`/movie/${movie.id}`)}
              src={IMAGE_URL + movie.poster_path}
              alt={movie.title}
            />
            <p className="absolute top-2 left-2 text-white bg-red-500 px-2 rounded text-sm">{movie.release_date.split("-")[0]}</p>
          </div>
          <div>
            <h3
              title={movie.title}
              className="text-xl font-semibold line-clamp-1"
            >
              {movie.title}
            </h3>
            <p>{movie.vote_average}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(MovieView);
