import { usePostsQuery } from "services/wordpress";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BlogCard from "./BlogCard";
import s from "./styles.module.css";

const Blogs = () => {
  const { data: page } = usePostsQuery({ page: 1 });

  return (
    <section className="xl:px-[126px] lg:px-[60px] md:px-[30px] flex flex-col gap-14 py-[50px] blogs relative z-10">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="156"
        height="286"
        viewBox="0 0 156 286"
        fill="none"
        className="absolute top-[40%] right-0"
      >
        <path
          opacity="0.4"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M36.6441 1.54872C50.4083 4.61319 59.0818 18.2574 56.0168 32.024C36.0944 121.507 92.472 210.194 181.94 230.113C271.407 250.032 360.086 193.64 380.008 104.157C383.073 90.3908 396.716 81.715 410.48 84.7795C424.244 87.844 432.918 101.488 429.853 115.255C403.8 232.271 287.837 306.015 170.84 279.967C53.8442 253.919 -19.8803 137.942 6.17203 20.9266C9.23702 7.16001 22.8798 -1.51575 36.6441 1.54872Z"
          fill="#FDE3D8"
        />
      </svg>
      <h2 className="text-navy-d4 text-[32px] md:text-[42px] font-bold text-center font-heading">
        Check out the latest
      </h2>

      <div className="  relative  flex items-center  md:gap-3 xl:gap-4 lg:justify-between w-fit top-0 left-1/2  -translate-x-1/2 h-full">
        <div className="hidden md:block lg:hidden absolute bg-white h-full w-[40%] z-[8] left-[-20%] blur-[100px] rounded-full"></div>

        <button className="prev lg:-mt-12 lg:relative  lg:top-1/2 lg:left-[0%] lg:-translate-y-1/2 lg:p-3 w-fit h-fit md:p-3  bg-white rounded-full border border-[#dbdada] shadow-md md:absolute md:top-1/2 md:-translate-y-1/2 md:left-[2%] z-10  top-[39.5%] -translate-y-1/2  absolute left-[-5%]  p-3   md:block">
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
          slidesPerView="auto"
          loop
          speed={400}
          breakpoints={{
            768: {
              spaceBetween: 20,
              slidesPerView: 2,
              initialSlide: 2,
              centeredSlides: true,
            },
            300: {
              spaceBetween: 20,
              slidesPerView: 1,
              centeredSlides: true,
            },
            1100: {
              spaceBetween: 20,
              slidesPerView: 3,
            },
          }}
          navigation={{
            nextEl: ".next",
            prevEl: ".prev",
          }}
          modules={[Navigation]}
          className={s.blog_Carousel}
        >
          {(page?.posts || []).map((blog, idx) => {
            return (
              <SwiperSlide key={idx} className="w-[300px]">
                <BlogCard {...blog} />
              </SwiperSlide>
            );
          })}
        </Swiper>

        <button className="next lg:relative lg:-mt-12 lg:top-1/2 lg:right-[0%] lg:-translate-y-1/2 lg:p-3 md:p-3  bg-white rounded-full border border-[#dbdada] z-[777]  shadow-md md:absolute absolute md:top-1/2 md:right-[2%] top-[39.5%] -translate-y-1/2  right-[-5%] p-3  md:block">
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

        <div className="hidden md:block lg:hidden absolute bg-white h-full w-[40%] z-[8] right-[-20%] blur-[100px] rounded-full "></div>
      </div>
    </section>
  );
};

export default Blogs;
