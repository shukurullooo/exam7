import { useMovie } from '@/api/hooks/useMovie'
import React, { useState } from 'react'
import MovieView from '@/components/movie-view/MovieView'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay } from "swiper/modules";
import type { IMovie } from "@/types";
import { IMAGE_URL } from "@/const";
import { useNavigate } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const Home = () => {
  const navigate = useNavigate();
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  
  const { getMovies } = useMovie();
  const { data } = getMovies({ page: 1, without_genres: "18,36,27,10749" });
  
  // Get popular movies for the main swiper
  const { data: popularData } = getMovies({ 
    page: 1, 
    sort_by: "popularity.desc",
    without_genres: "18,36,27,10749" 
  });

  const heroMovies = popularData?.results?.slice(0, 8) || [];
  const gridMovies = data?.results?.slice(0, 8) || [];

  return (
    <div className='container mx-auto p-4 mt-14 space-y-10'>
      {/* Hero Swiper Section */}
      {heroMovies.length > 0 && (
        <div className="relative">
          {/* Main Swiper */}
          <Swiper
            modules={[Navigation, Thumbs, Autoplay]}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            navigation={{
              prevEl: ".main-navigation-prev",
              nextEl: ".main-navigation-next",
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="relative rounded-xl overflow-hidden shadow-2xl"
          >
            {heroMovies.map((movie: IMovie) => (
              <SwiperSlide key={movie.id}>
                <div className="relative h-[400px] md:h-[500px]">
                  <img
                    src={IMAGE_URL + movie.backdrop_path}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 p-6 md:p-10 text-white max-w-2xl">
                    <h2 className="text-2xl md:text-4xl font-bold mb-3 line-clamp-2">
                      {movie.title}
                    </h2>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="bg-red-500 px-3 py-1 rounded text-sm font-medium">
                        {movie.release_date?.split("-")[0]}
                      </span>
                      <span className="flex items-center gap-1">
                        ⭐ {movie.vote_average?.toFixed(1)}
                      </span>
                    </div>
                    <button
                      onClick={() => navigate(`/movie/${movie.id}`)}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Подробнее
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button className="main-navigation-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors">
            ←
          </button>
          <button className="main-navigation-next absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors">
            →
          </button>

          {/* Thumbnail Swiper */}
          <div className="mt-6">
            <Swiper
              onSwiper={setThumbsSwiper}
              modules={[Thumbs, Navigation]}
              navigation={{
                prevEl: ".thumbs-navigation-prev",
                nextEl: ".thumbs-navigation-next",
              }}
              spaceBetween={16}
              slidesPerView={2}
              breakpoints={{
                640: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
              }}
              className="relative"
            >
              {heroMovies.map((movie: IMovie) => (
                <SwiperSlide key={`thumb-${movie.id}`} className="cursor-pointer">
                  <div className="relative group">
                    <img
                      src={IMAGE_URL + movie.poster_path}
                      alt={movie.title}
                      className="w-full h-[140px] object-cover rounded-xl border-2 border-transparent group-hover:border-red-500 transition-all shadow-md"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Thumbnail Navigation */}
            <button className="thumbs-navigation-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl text-gray-800 dark:text-white p-2 rounded-full transition-all">
              ←
            </button>
            <button className="thumbs-navigation-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl text-gray-800 dark:text-white p-2 rounded-full transition-all">
              →
            </button>
          </div>
        </div>
      )}

      {/* Popular Movies Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Популярные фильмы
        </h2>
        <MovieView data={gridMovies} />
      </div>
    </div>
  )
}

export default React.memo(Home)