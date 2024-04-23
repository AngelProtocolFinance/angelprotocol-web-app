import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import quotation from "../../../assets/landing/quotation.svg";
import TestimonialCard from "./TestimonialCard";
import useGetTestimonials from "./useGetTestimonials";

const Testimonials = () => {
  const testimonials = useGetTestimonials();

  return (
    <div className="lg:px-[60px] pt-5 md:px-[30px] md:py-[100px] flex flex-col gap-[50px]  relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="287"
        height="358"
        viewBox="0 0 287 358"
        fill="none"
        className="absolute  hidden lg:block top-[15%] left-0"
      >
        <path
          opacity="0.4"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M-186.87 150.179C-171.375 144.719 -154.386 152.856 -148.926 168.354C-113.43 269.088 -3.00679 321.979 97.7107 286.489C198.428 250.999 251.301 140.567 215.805 39.8331C210.344 24.3355 218.478 7.34603 233.973 1.88603C249.468 -3.57398 266.456 4.56309 271.917 20.0607C318.335 151.79 249.194 296.201 117.486 342.611C-14.221 389.021 -158.62 319.856 -205.038 188.126C-210.499 172.629 -202.365 155.639 -186.87 150.179Z"
          fill="#D8E9FD"
        />
      </svg>
      <img
        src={quotation}
        alt="quotation mark"
        className="h-[100px]  md:scale-[.8] lg:scale-[.9] scale-[.7] w-[100px] m-auto "
      />
      <h2 className="lg:w-full opacity-75 md:mx-auto lg:-mt-4 md:-mt-7 -mt-8 text-center text-[30px] w-full  md:w-full    px-5 leading-10 md:leading-[58px] md:mb-6 mb-6 md:text-[42px] font-bold font-heading">
        Success Stories: <br className=" " /> Inspiring Change Together
      </h2>

      <div className="  relative  flex items-center  md:gap-3 xl:gap-4 lg:justify-between w-fit top-0 left-1/2  -translate-x-1/2 h-full">
        <button
          className="testimonial-prev lg:relative  lg:top-1/2 lg:left-[0%] lg:-translate-y-1/2 lg:p-3 w-fit h-fit md:p-3  bg-white rounded-full borderLine shadow-md md:absolute md:top-1/2 md:-translate-y-1/2 md:left-[2%] z-10  top-1/2 -translate-y-1/2  absolute left-[-5%] left-0 p-3  "
          // style={{ opacity: showPrevButton ? 1 : 0 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="text-blue-d1 w-6 h-6 font-bold"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <Swiper
          slidesPerView={"auto"}
          loop={true}
          breakpoints={{
            768: {
              spaceBetween: 20,
              slidesPerView: 2,
              centeredSlides: true,
              initialSlide: 2,
            },
            300: {
              slidesPerView: 1,
              initialSlide: 1,
              centeredSlides: true,
              spaceBetween: 24,
            },
            1100: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          navigation={{
            nextEl: ".testimonial-next",
            prevEl: ".testimonial-prev",
          }}
          modules={[Navigation]}
          className="testimonial_swiper "
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

        <button
          className="testimonial-next lg:relative lg:top-1/2 lg:right-[0%] lg:-translate-y-1/2 lg:p-3 md:p-3  bg-white rounded-full borderLine z-[777]  shadow-md md:absolute absolute md:top-1/2 md:right-[2%] top-1/2 -translate-y-1/2  right-[-5%] p-3    anurag "
          // style={{ opacity: showNextButton ? 1 : 0 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="text-blue-d1 w-6 h-6 font-bold "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
