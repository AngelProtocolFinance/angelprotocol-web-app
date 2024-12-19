import quotation from "assets/icons/quotation.svg";
import { testimonials } from "content/testimonials";
import { unpack } from "helpers";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwipeCard } from "./swipe-card";

interface Classes {
  container?: string;
  quote?: string; //w-24 lg:w-36
  heading?: string; //text-3xl/tight @3xl:text-4.5xl/tight
}

interface Props {
  classes?: Classes;
  heading?: ReactNode; //Nonprofit Success Stories: <br /> Inspiring Change Together
}
export const Horizontal = (props: Props) => {
  const s = unpack(props.classes);
  return (
    <div className={`grid relative ${s.container}`}>
      <img
        src={quotation}
        alt="quotation mark"
        className={`justify-self-center ${s.quote || "w-24 lg:w-36"} mb-8`}
      />
      <h2
        className={`text-center ${s.heading || "text-3xl/tight @3xl:text-4.5xl/tight"} text-pretty justify-self-center mb-14`}
      >
        {props.heading ?? (
          <>
            Nonprofit Success Stories: <br /> Inspiring Change Together
          </>
        )}
      </h2>

      <button
        type="button"
        className="swip-prev p-4 bg-white text-blue-d1 rounded-full shadow-md z-10 absolute top-1/2 @3xl:top-3/4 -translate-y-1/2 right-[85%] @3xl:right-[90%]"
      >
        <ChevronLeft />
      </button>
      <button
        type="button"
        className="swip-next p-4 bg-white text-blue-d1 rounded-full shadow-md z-10 absolute top-1/2 @3xl:top-3/4 -translate-y-1/2 left-[85%] @3xl:left-[90%]"
      >
        <ChevronRight />
      </button>

      <Swiper
        centeredSlides
        loop
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 24,
          },
          768: {
            spaceBetween: 20,
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        modules={[Navigation]}
        navigation={{
          nextEl: ".swip-next",
          prevEl: ".swip-prev",
        }}
        className="w-[80vw] @3xl:w-[80vw]"
      >
        {testimonials.map((t, idx) => {
          return (
            <SwiperSlide key={idx}>
              <SwipeCard {...t} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
