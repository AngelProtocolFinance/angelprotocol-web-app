import quotation from "assets/icons/quotation.svg";
import { testimonials } from "content/testimonials";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {
  return (
    <div className="grid relative pt-48 bg-gradient-to-b from-peach/20 to-transparent overflow-x-clip">
      <img
        src={quotation}
        alt="quotation mark"
        className="justify-self-center w-24 lg:w-36 mb-8"
      />
      <h2 className="text-center text-[30px]/10 md:text-[42px]/[58px] text-pretty justify-self-center mb-14">
        Nonprofit Success Stories: <br /> Inspiring Change Together
      </h2>

      <button
        type="button"
        className="swip-prev p-4 bg-white text-blue-d1 rounded-full shadow-md z-10 absolute top-3/4 -translate-y-1/2 right-[90%]"
      >
        <ChevronLeft />
      </button>
      <button
        type="button"
        className="swip-next p-4 bg-white text-blue-d1 rounded-full shadow-md z-10 absolute top-3/4 -translate-y-1/2 left-[90%]"
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
        className="w-[90vw] lg:w-[80vw]"
      >
        {testimonials.map((t, idx) => {
          return (
            <SwiperSlide key={idx}>
              <TestimonialCard {...t} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Testimonials;
