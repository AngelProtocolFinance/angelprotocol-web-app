import Icon from "components/Icon";
import { usePostsQuery } from "services/wordpress";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BlogCard from "./BlogCard";

const Blogs = () => {
  const { data: page } = usePostsQuery({ page: 1 });

  return (
    <section className="grid">
      <h2 className="text-navy-d4 text-[32px] md:text-[42px] text-center">
        Check out the latest
      </h2>
      <div className="relative">
        <button
          type="button"
          className="blog-prev p-3 bg-white text-blue-d1 rounded-full shadow-md z-10 absolute top-1/2 -translate-y-1/2 left-1/4"
        >
          <Icon type="Back" />
        </button>
        <button
          type="button"
          className="blog-next p-3 bg-white text-blue-d1 rounded-full shadow-md z-10 absolute top-1/2 -translate-y-1/2 right-1/4"
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
          className="w-[60vw] md:w-[80vw] lg:w-[60vw]"
          modules={[Navigation]}
        >
          {(page?.posts || []).map((blog, idx) => {
            return (
              <SwiperSlide key={idx} className="w-[300px]">
                <BlogCard {...blog} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default Blogs;
