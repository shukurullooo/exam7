import { useMovie } from "@/api/hooks/useMovie";
import { IMAGE_URL } from "@/const";
import { useNavigate, useParams } from "react-router-dom";
import { Image } from "antd";
import MovieView from "@/components/movie-view/MovieView";

const MovieDetail = () => {
  const { id } = useParams();
  const { getMovieSingle, getMovieDetail } = useMovie();
    const navigate = useNavigate()


  const { data } = getMovieSingle(id || "");
  const { data: similarData } = getMovieDetail(id || "", "similar");
  const { data: imagesData } = getMovieDetail(id || "", "images");
  const { data: creditsData } = getMovieDetail(id || "", "credits");

  return (
    <div className="container mx-auto px-4 py-6 space-y-10 mt-14">
      {/* Cover Image */}
      <div className="w-full h-[300px] md:h-[450px] overflow-hidden rounded-xl shadow-lg">
        <img
          src={IMAGE_URL + data?.backdrop_path}
          alt={data?.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title & Budget */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{data?.title}</h1>
        {!!data?.budget && (
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Budget: {data?.budget?.toLocaleString()} USD
          </p>
        )}
      </div>

      {/* Lavhalar (Gallery) */}
      {imagesData?.backdrops?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Gallery</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scroll-smooth">
            {imagesData.backdrops.slice(0, 15).map((item: any, i: number) => (
              <div key={`img-${i}`} className="min-w-[160px]">
                <Image
                  src={IMAGE_URL + item.file_path}
                  width={160}
                  height={100}
                  className="rounded shadow-md object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Odamlar (Cast) */}
      {creditsData?.cast?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Cast</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scroll-smooth">
            {creditsData.cast.slice(0, 15).map((person: any) => (
              <div
                key={person.id}
                className="min-w-[160px] bg-white dark:bg-gray-800 p-3 rounded-lg shadow text-center"
              >
                <img
                  src={IMAGE_URL + person.profile_path}
                  alt={person.original_name}
                  className="w-[120px] h-[160px] object-cover mx-auto rounded-md"
                />
                <h3 className="text-sm font-medium text-gray-800 dark:text-white mt-2">
                  {person.original_name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{person.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Similar Movies (ixtiyoriy) */}
      {similarData?.results?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Similar Movies</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scroll-smooth">
            {similarData.results.slice(0, 10).map((movie: any) => (
              <div key={movie.id} className="min-w-[160px] text-center">
                <img
                  src={IMAGE_URL + movie.poster_path}
                  alt={movie.title}
                   onClick={()=> navigate(`/movie/${movie.id}`)}
                 
                  className="w-[120px] h-[180px] object-cover rounded-md mx-auto"
                />
                <h4 className="text-sm mt-2 text-gray-700 dark:text-white">{movie.title}</h4>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
