import { posts } from "api/get/wp-posts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import BlogCard, { Skeleton } from "./BlogCard";
import s from "./styles.module.css";

const Blogs = () => {
  const { data } = useSWR("1", (page) => posts(+page));

  return (
    <section className="grid content-start py-40 bg-gradient-to-b from-transparent via-peach/40 to-transparent overflow-x-clip">
      <h2 className="text-navy-d4 text-3xl md:text-4.5xl text-center mb-14 px-4">
        Gain Knowledge to Empower Your Nonprofit
      </h2>
      <div className="relative">
        <button
          type="button"
          className="blog-prev p-4 bg-white text-blue-d1 rounded-full shadow-md z-10 absolute top-1/2 -translate-y-1/2 left-10 md:left-[15%]"
        >
          <ChevronLeft />
        </button>
        <button
          type="button"
          className="blog-next p-4 bg-white text-blue-d1 rounded-full shadow-md z-10 absolute top-1/2 -translate-y-1/2 right-10 md:right-[15%]"
        >
          <ChevronRight />
        </button>
        <Swiper
          loop
          speed={400}
          centeredSlides
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
            nextEl: ".blog-next",
            prevEl: ".blog-prev",
          }}
          className="w-[70vw] md:w-[80vw] lg:w-[65vw]"
          modules={[Navigation]}
        >
          {(data?.[0] || [1, 2, 3, 4, 5, 6]).map((blog, idx) => {
            return (
              <SwiperSlide key={idx}>
                {typeof blog === "number" ? (
                  <Skeleton />
                ) : (
                  <BlogCard {...blog} />
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className={`${s.carousel_overlay} absolute inset-0 md:hidden`} />
      </div>
    </section>
  );
};

export default Blogs;
