import Icon from "components/Icon";
import { testimonials } from "content/testimonials";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import TestimonialCard from "./TestimonialCard";
import quotation from "./quotation.svg";

const Testimonials = () => {
  return (
    <div className="grid relative pt-48 bg-gradient-to-t from-peach/40 to-transparent">
      <img
        src={quotation}
        alt="quotation mark"
        className="justify-self-center w-24 lg:w-36 mb-8"
      />
      <h2 className="text-center text-[30px]/10 md:text-[42px]/[58px] text-pretty justify-self-center mb-14">
        Success Stories: <br /> Inspiring Change Together
      </h2>

      <button
        type="button"
        className="swip-prev p-4 bg-white text-blue-d1 rounded-full shadow-md z-10 absolute top-3/4 -translate-y-1/2 right-[90%]"
      >
        <Icon type="Back" className="text-2xl" />
      </button>
      <button
        type="button"
        className="swip-next p-4 bg-white text-blue-d1 rounded-full shadow-md z-10 absolute top-3/4 -translate-y-1/2 left-[90%]"
      >
        <Icon type="Next" className="text-2xl" />
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
