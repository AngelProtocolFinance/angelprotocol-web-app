import { appRoutes } from "constants/routes";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { EndowmentCard } from "types/aws";
import Card from "./Card";
import frame1 from "./characters/frame_1.png";
import frame2 from "./characters/frame_2.png";
import frame3 from "./characters/frame_3.png";
import frame4 from "./characters/frame_4.png";
import frame6 from "./characters/frame_6.png";
import mappng from "./map.webp";
import s from "./styles.module.css";

interface Props {
  endowments: EndowmentCard[];
  className?: string;
}

const HeroBottom = ({ className = "", endowments }: Props) => {
  return (
    <div
      className={`${className} ${s.container} grid content-start relative bg-[length:300%] md:bg-[length:200%] lg:bg-contain bg-no-repeat bg-[center_100%] pb-40 overflow-x-clip`}
      style={{ backgroundImage: `url('${mappng}')` }}
    >
      <h3 className="z-10 uppercase text-blue-d1 text-center my-4">
        Bridge to better
      </h3>
      <h2
        className={`${s.heading} px-6 justify-self-center z-10 mb-9 lg:mb-12 text-3xl md:text-4xl text-center text-navy-d4`}
      >
        Connecting Donors to Causes That Matter
      </h2>

      <div className={s.carousel}>
        <button
          type="button"
          className="cause-prev p-4 bg-white text-blue-d1 rounded-full shadow-lg z-10 absolute top-1/2 -translate-y-1/2 left-[5%] xl:left-[15%]"
        >
          <ChevronLeft />
        </button>
        <button
          type="button"
          className="cause-next p-4 bg-white text-blue-d1 rounded-full shadow-lg z-10 absolute top-1/2 -translate-y-1/2 right-[5%] xl:right-[15%]"
        >
          <ChevronRight className="text-2xl" />
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
              slidesPerView: 3,
            },
          }}
          navigation={{
            nextEl: ".cause-next",
            prevEl: ".cause-prev",
          }}
          modules={[Navigation]}
          className="relative w-[90vw] xl:w-[60vw] py-8"
          wrapperClass={s.swiper_wrapper}
        >
          {endowments.map((endow, idx) => (
            <SwiperSlide key={idx}>
              <Card key={endow.id} {...endow} />
            </SwiperSlide>
          ))}
        </Swiper>{" "}
        <div className={`${s.carousel_overlay} absolute inset-0 xl:hidden`} />
      </div>

      <Link
        to={appRoutes.marketplace}
        className="z-10 mt-16 justify-self-center btn-blue normal-case inline-flex items-center px-10 py-3 gap-1 rounded-full font-heading relative"
      >
        <span className="ml-1">Explore All Causes</span>
        <ArrowRight size={20} />
      </Link>
      <p className="bg-[#FFEECC] font-gochi text-2xl z-[22] px-4 justify-self-center mt-4">
        from all around the globe
      </p>

      <img
        src={frame1}
        alt="frame1"
        className="absolute size-16 xl:size-24 max-xl:top-[10%] right-0 left-[5%]"
      />
      <img
        src={frame2}
        alt="frame2"
        className="absolute top-0 right-[5%] xl:right-[10%] -translate-y-1/2 size-20 xl:size-28"
      />
      <img
        src={frame3}
        alt="frame3"
        className="max-xl:hidden absolute right-0 translate-x-1/5 top-44 "
      />
      <img
        src={frame4}
        alt="frame4"
        className="absolute size-16 right-[12%] bottom-[40%] xl:top-1/4"
      />
      <img
        src={frame6}
        alt="frame6"
        className="max-xl:hidden absolute left-0 top-1/4"
      />
    </div>
  );
};

export default HeroBottom;
