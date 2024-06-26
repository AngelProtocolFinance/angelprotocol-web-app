import Image from "components/Image";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import form from "./screenshots/form.png";
import result from "./screenshots/result.png";
import split from "./screenshots/split.png";
import summary from "./screenshots/summary.png";
import tip from "./screenshots/tip.png";

const screenshots = [form, split, tip, summary, result];

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
