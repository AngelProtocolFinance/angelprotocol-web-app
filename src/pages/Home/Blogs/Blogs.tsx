import Icon from "components/Icon";
import { usePostsQuery } from "services/wordpress";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BlogCard, { Skeleton } from "./BlogCard";
import s from "./styles.module.css";

const Blogs = () => {
  const { data: page } = usePostsQuery({ page: 1 });

  return (
    <section className="grid content-start py-40 bg-gradient-to-b from-peach/40 to-transparent overflow-x-clip">
      <h2 className="text-navy-d4 text-[32px] md:text-[42px] text-center mb-14">
        Check out the latest
      </h2>
      <div className="relative">
        <button
          type="button"
          className="blog-prev p-4 bg-white text-blue-d1 rounded-full shadow-md z-10 absolute top-1/2 -translate-y-1/2 left-10 md:left-[15%]"
        >
          <Icon type="Back" />
        </button>
        <button
          type="button"
          className="blog-next p-4 bg-white text-blue-d1 rounded-full shadow-md z-10 absolute top-1/2 -translate-y-1/2 right-10 md:right-[15%]"
        >
          <Icon type="Next" />
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
          {(page?.posts || [1, 2, 3, 4, 5, 6]).map((blog, idx) => {
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
