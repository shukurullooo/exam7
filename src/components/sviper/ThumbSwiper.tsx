import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import type { IMovie } from "@/types";
import { IMAGE_URL } from "@/const";

interface ThumbSwiperProps {
  movies: IMovie[];
  setThumbsSwiper: (swiper: any) => void;
}

const ThumbSwiper = ({ movies, setThumbsSwiper }: ThumbSwiperProps) => {
  return (
    <div className="relative max-w-5xl mx-auto mt-6 px-10">
      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[Thumbs, Navigation]}
        navigation={{
          prevEl: ".thumbs-navigation-prev",
          nextEl: ".thumbs-navigation-next",
        }}
        spaceBetween={16}
        slidesPerView={movies.length >= 5 ? 5 : movies.length}
        className="relative"
      >
        {movies.map((movie: IMovie) => (
          <SwiperSlide key={movie.id} className="flex justify-center">
            <img
              src={IMAGE_URL + movie.poster_path}
              alt={movie.title}
              className="w-[160px] h-[140px] object-cover rounded-xl border-2 border-transparent hover:border-red-500 transition shadow"
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ThumbSwiper;