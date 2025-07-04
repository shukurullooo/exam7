import { useMovie } from '@/api/hooks/useMovie'
import React from 'react'
import MovieView from '@/components/movie-view/MovieView'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import type { IMovie, ThumbSwiperProps } from "@/types";
import { IMAGE_URL } from "@/const";


const Home = ({ movies }: ThumbSwiperProps) => {
  const {getMovies} = useMovie()
  const {data} = getMovies({page: 1, without_genres: "18,36,27,10749"})
  

  return (
    <div className='container mx-auto p-4 mt-14'>
      <div className="relative max-w-5xl mx-auto mt-6 px-10">
      <Swiper
        modules={[Thumbs, Navigation]}
        navigation={{
          prevEl: ".thumbs-navigation-prev",
          nextEl: ".thumbs-navigation-next",
        }}
        spaceBetween={16}
        slidesPerView={movies?.length >= 5 ? 5 : movies?.length}
        className="relative"
      >
        {movies?.map((movie: IMovie) => (
          <SwiperSlide key={movie?.id} className="flex justify-center">
            <img
              src={IMAGE_URL + movie?.poster_path}
              alt={movie?.title}
              className="w-[160px] h-[140px] object-cover rounded-xl border-2 border-transparent hover:border-red-500 transition shadow"
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
      <MovieView data={data?.results?.slice(0, 8)}/>
    </div>
  )
}

export default React.memo(Home)