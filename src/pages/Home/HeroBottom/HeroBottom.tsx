import Icon from "components/Icon";
import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import { useEndowmentCardsQuery } from "services/aws/aws";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import frame1 from "../../../assets/landing/frame_1.png";
import frame2 from "../../../assets/landing/frame_2.png";
import frame3 from "../../../assets/landing/frame_3.png";
import frame4 from "../../../assets/landing/frame_4.png";
import frame5 from "../../../assets/landing/frame_5.png";
import frame6 from "../../../assets/landing/frame_6.png";
import mappng from "../../../assets/landing/map.png";
import Card from "./Card";

const HeroBottom = () => {
  const { data } = useEndowmentCardsQuery({
    claimed: "true",
    page: 1,
    query: "",
  });

  return (
    <div
      className="grid relative bg-contain bg-no-repeat bg-[center_25rem] mb-4 pb-80"
      style={{ backgroundImage: `url('${mappng}')` }}
    >
      <div className="absolute inset-0 bg-white/40" />
      <h3 className="isolate uppercase text-blue-d1 text-center mt-2">
        Bridge to better
      </h3>
      <h2 className="isolate text-[32px] md:text-[42px] text-center text-navy-d4 font-heading">
        Connecting Donors to Causes That Matter
      </h2>

      <div className="relative">
        <button
          type="button"
          className="cause-prev p-3 bg-white text-blue-d1 rounded-full shadow-md z-10 absolute top-1/2 -translate-y-1/2 left-[6vw]"
        >
          <Icon type="Back" />
        </button>
        <button
          type="button"
          className="cause-next p-3 bg-white text-blue-d1 rounded-full shadow-md z-10 absolute top-1/2 -translate-y-1/2 right-[6vw]"
        >
          <Icon type="Next" />
        </button>
        <Swiper
          centeredSlides
          loop
          breakpoints={{
            640: {
              spaceBetween: 20,
              slidesPerView: 1,
            },
            768: {
              spaceBetween: 20,
              slidesPerView: 2,
            },
            1024: {
              spaceBetween: 20,
              slidesPerView: 4,
            },
          }}
          navigation={{
            nextEl: ".cause-next",
            prevEl: ".cause-prev",
          }}
          modules={[Navigation]}
          className="relative w-[80vw] py-8"
        >
          {(data?.Items || []).map((endow) => (
            <SwiperSlide key={endow.id} className="">
              <Card key={endow.id} {...endow} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Link
        to={appRoutes.marketplace}
        className="mt-16 justify-self-center btn-blue normal-case inline-flex items-center px-10 py-3 gap-1 rounded-full font-heading relative"
      >
        <span className="ml-1">Explore All Causes</span>
        <Icon type="ArrowRightLong" className="text-lg" />
      </Link>
      <p className="bg-[#FFEECC] font-gochi text-2xl z-[22] px-4 justify-self-center mt-4">
        from all around the globe
      </p>

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
