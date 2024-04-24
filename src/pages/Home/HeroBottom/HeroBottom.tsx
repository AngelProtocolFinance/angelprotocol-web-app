import Icon from "components/Icon";
import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import { useEndowmentCardsQuery } from "services/aws/aws";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "./Card";
import frame1 from "./characters/frame_1.png";
import frame2 from "./characters/frame_2.png";
import frame3 from "./characters/frame_3.png";
import frame4 from "./characters/frame_4.png";
import frame6 from "./characters/frame_6.png";
import mappng from "./map.png";

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
        className="absolute size-24 right-0 left-40"
      />
      <img
        src={frame2}
        alt="frame2"
        className="absolute top-0 right-40 -translate-y-1/2 size-32"
      />
      <img
        src={frame3}
        alt="frame3"
        className="absolute right-0 translate-x-1/5 top-44"
      />
      <img
        src={frame4}
        alt="frame4"
        className="absolute size-20 right-24 top-1/4"
      />
      <img src={frame6} alt="frame6" className="absolute left-0 top-1/4" />
    </div>
  );
};

export default HeroBottom;
