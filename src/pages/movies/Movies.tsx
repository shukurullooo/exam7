import { useMovie } from "@/api/hooks/useMovie";
import MovieView from "@/components/movie-view/MovieView";
import React, { useState } from "react";
import { Pagination } from "antd";
import { useGenre } from "@/api/hooks/useGenre";
import Genre from "@/components/genre/Genre";

const Movies = () => {
  const [page, setPage] = useState(1);
  const { getMovies } = useMovie();
  const { getGenres } = useGenre();

  const { data: genreData } = getGenres();
  const { data  } = getMovies({
    page,
    without_genres: "", 
  });

  const handlePageChange = (newPage: React.SetStateAction<number>) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" }); 
  };

  return (
    <div className="container mx-auto  mt-14 px-4 py-6 space-y-10">
      <Genre data={genreData?.genres} />
      <MovieView data={data?.results} />

      <div className="flex justify-center mt-6">
        <Pagination
          current={page}
          total={data?.total_results || 500} 
          pageSize={20} 
          onChange={handlePageChange}
          showSizeChanger={false} 
        />
      </div>
    </div>
  );
};


export default React.memo(Movies);
