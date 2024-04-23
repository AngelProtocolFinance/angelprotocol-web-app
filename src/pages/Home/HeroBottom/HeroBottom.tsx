import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import { useEndowmentCardsQuery } from "services/aws/aws";
import "swiper/css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import frame1 from "../../../assets/landing/frame_1.png";
import frame2 from "../../../assets/landing/frame_2.png";
import frame3 from "../../../assets/landing/frame_3.png";
import frame4 from "../../../assets/landing/frame_4.png";
import frame5 from "../../../assets/landing/frame_5.png";
import frame6 from "../../../assets/landing/frame_6.png";
import mappng from "../../../assets/landing/map.png";
import Button from "../../../components/landing/Button";
import Card from "./Card";

const HeroBottom = () => {
  const { data } = useEndowmentCardsQuery({
    claimed: "true",
    page: 1,
    query: "",
  });

  return (
    <div className="relative bottom-[300px] lg:bottom-[300px]   md:bottom-[350px] z-10 pt-[50px] px-6 ">
      <img
        src={mappng}
        alt="map"
        className=" w-[841px] h-[403px] lg:w-full md:w-full lg:h-[70%] md:h-1/2  absolute lg:bottom-[-20%] lg:left-8 md:bottom-[-16%] md:left-4  z-[-88] bottom-[-12%] left-2 opacity-[1] lg:scale-[1] md:scale-[1] scale-[1] lg:object-fill object-cover object-center"
      />
      <svg
        viewBox="0 0 1440 1533"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 z-[-8] overflow-hidden w-full h-full"
      >
        <g opacity=".4" filter="url(#filter0_f_443_2773)">
          <path
            d="M195 1091.5C43.4 1208.3 -115.5 813.443 -157 685.443C-157 495.043 -547 418.11 -742 403.443C-485.667 390.943 162.4 362.643 704 349.443C1381 332.943 1489.5 782.943 947.5 685.443C405.5 587.943 384.5 945.5 195 1091.5Z"
            fill="#3DD3A6"
            fillOpacity="0.5"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_443_2773"
            x="-1162"
            y="-71"
            width="2874.37"
            height="1603.84"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="210"
              result="effect1_foregroundBlur_443_2773"
            />
          </filter>
        </defs>
      </svg>
      <div
        style={{ zIndex: "-1" }}
        className="absolute top-0 left-0 w-full h-[60%]  bg-[#fdfdfd] blur-[400px]"
      ></div>
      <div className=" absolute bottom-[0%] right-[-20%] w-[60%] h-[60%] rounded-full bg-[#fdefd1]   z-[-12] blur-[450px]"></div>

      <div className="flex flex-col items-center gap-5   ">
        <span className="flex flex-col items-center gap-3 mb-10 ">
          <h3 className="text-lg uppercase font-bold text-blue-d1 font-heading text-[13px] md:text-[18px]">
            Bridge to better
          </h3>
          <h2 className="text-[32px] md:text-[42px] lg:w-full md:w-8/12 text-center capitalize font-bold text-navy-d4 font-heading">
            Connecting Donors to Causes That Matter
          </h2>
        </span>

        <div className=" relative  flex items-center  md:gap-3 xl:gap-4 lg:justify-between w-fit top-0 left-[0%]   h-full  ">
          <div className="hidden md:block lg:hidden absolute bg-white h-full w-[40%] z-[8] top-[-2%] left-[-20%] blur-[100px] rounded-full"></div>
          <button className="cause-prev lg:relative  lg:top-[90%] lg:left-[0%] lg:-translate-y-1/2 lg:p-3 w-fit h-fit md:p-3  bg-white rounded-full borderLine shadow-md md:absolute md:top-[42.5%] md:-translate-y-1/2 md:left-[2%] z-10  top-[42.5%] -translate-y-1/2  absolute left-[-5%]  lg:-mt-7 p-3">
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
          <div className="lg:h-[520px] w-[85vw]">
            <Swiper
              slidesPerView="auto"
              loop
              breakpoints={{
                300: {
                  spaceBetween: 20,
                  slidesPerView: 1,
                  centeredSlides: true,
                },
                768: {
                  spaceBetween: 20,
                  slidesPerView: 2,
                  initialSlide: 2,
                  centeredSlides: true,
                },
                1100: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
              }}
              navigation={{
                nextEl: ".cause-next",
                prevEl: ".cause-prev",
              }}
              modules={[Navigation]}
              className="cause-swiper"
            >
              {(data?.Items || []).map((endow) => (
                <SwiperSlide key={endow.id}>
                  <Card {...endow} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <button className="cause-next  lg:-mt-7 lg:relative lg:top-[42%] lg:right-[0%] lg:-translate-y-1/2 lg:p-3 md:p-3  bg-white rounded-full borderLine z-[777] shadow-md md:absolute absolute md:top-[42%] md:right-[2%] top-[42.5%] -translate-y-1/2 z-40  right-[-5%] p-3 ">
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

          <div className="hidden md:block lg:hidden absolute bg-white h-full w-[40%] z-[8] blur-[100px] right-[-15%] top-[-2%]  rounded-full"></div>
        </div>

        <Link to={appRoutes.marketplace} className="block -mt-30 z-40">
          <Button text="Explore All Causes" />
        </Link>
        <p className="bg-[#FFEECC] font-gochi text-2xl z-[22] px-4">
          from all around the globe
        </p>
      </div>
      <img
        src={frame1}
        alt="frame1"
        className="  absolute top-[2%] md:top-[5%]  md:left-[3%] lg:top-[5%]  lg:left-[15%]  -left-5 md:scale-[.8] scale-[.6]  lg:scale-[.7]  -z-10"
      />
      <img
        src={frame2}
        alt="frame2"
        className="  md:scale-[.7] scale-[.5] absolute top-[-4%] right-[-5%] lg:top-[2%] lg:left-[74%] md:top-[8%] md:right-[4%]  md:block lg:block  -z-10 "
      />
      <img
        src={frame3}
        alt="frame3"
        className="absolute lg:top-[15%] lg:right-[0%] md:top-[15%] md:right-[10%] -top-3 right-2  md:scale-[.9] lg:scale-[.9] scale-[.7] opacity-[.5]  z-10 hidden lg:block "
      />
      <img
        src={frame4}
        alt="frame4"
        className="    scale-[.6] opacity-60 absolute lg:top-1/4 lg:left-[84%] md:top-[32%] md:left-[84%]     -z-[9] hidden lg:block "
      />
      <img
        src={frame5}
        alt="frame5"
        className="  absolute md:top-1/4 md:right-[22%] md:scale-[.6] lg:scale-[.7]  lg:top-[20%] lg:left-[33%]  opacity-40 -z-[9]   hidden md:block"
      />
      <img
        src={frame6}
        alt="frame6"
        className="   absolute md:top-[38%] md:left-[.5%] lg:top-[38%]  top-[25.5%] -left-2 -z-10 scale-[.7]   lg:left-[3%]"
      />
    </div>
  );
};

export default HeroBottom;
