import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import TestimonialCard from "./TestimonialCard";
import quotation from "./quotation.svg";
import useGetTestimonials from "./useGetTestimonials";

const Testimonials = () => {
  const testimonials = useGetTestimonials();

  return (
    <div className="grid relative">
      <img
        src={quotation}
        alt="quotation mark"
        className="justify-self-center w-24 lg:w-36 mb-8"
      />
      <h2 className="text-center text-[30px]/10 md:text-[42px]/[58px] max-w-md justify-self-center mb-14">
        Success Stories: Inspiring Change Together
      </h2>

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
        className="w-[90vw] md:w-screen lg:w-[80vw]"
      >
        {testimonials.map((ele, idx) => {
          return (
            <SwiperSlide key={idx}>
              <TestimonialCard
                review={ele.review}
                reviewer={ele.reviewer}
                reviewer_profession={ele.reviewer_profession}
                reviewer_logo={ele.reviewer_logo}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Testimonials;
