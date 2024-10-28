import Image from "components/Image";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import checkout from "./screenshots/checkout.png";
import form from "./screenshots/form.png";
import result from "./screenshots/result.png";

const screenshots = [form, checkout, result];

export function StepsCarousel({ classes = "" }) {
  return (
    <Swiper
      pagination={{ clickable: true }}
      modules={[Pagination]}
      className={`${classes} grid content-start [&_.swiper-pagination]:top-1  [&_.swiper-pagination]:h-fit pt-8`}
    >
      {screenshots.map((s, idx) => (
        <SwiperSlide key={idx}>
          <Image
            src={s}
            className="rounded-xl border border-gray-l4 overflow-clip"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
