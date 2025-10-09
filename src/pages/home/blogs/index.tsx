import { posts } from "api/get/wp-posts";
import use_embla_carousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import use_swr from "swr/immutable";
import { BlogCard, Skeleton } from "./blog-card";

export const Blogs = ({ classes = "" }) => {
  const { data } = use_swr(["posts", "1"], ([, page]) => posts(+page));

  const [embla_ref, embla_api] = use_embla_carousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 640px)": {
        slidesToScroll: 1,
        containScroll: "trimSnaps",
      },
      "(min-width: 768px)": {
        slidesToScroll: 2,
        containScroll: "trimSnaps",
      },
      "(min-width: 1024px)": {
        slidesToScroll: 3,
        containScroll: "trimSnaps",
      },
    },
  });

  return (
    <section
      className={`${classes} grid content-start py-40`}
      aria-labelledby="blogs-heading"
    >
      <h2
        id="blogs-heading"
        className="text-gray-d4 text-3xl md:text-4.5xl text-center mb-14 px-4"
      >
        Gain knowledge to empower your nonprofit
      </h2>

      <div className="relative">
        <button
          type="button"
          onClick={() => embla_api?.scrollPrev()}
          className="p-4 bg-white text-blue-d1 rounded-full shadow-md z-10 absolute top-1/2 -translate-y-1/2 left-10 sm:left-[10%]"
          aria-label="Previous slide"
        >
          <ChevronLeft />
        </button>

        <div
          className="overflow-hidden w-[70vw] md:w-[80vw] lg:w-[65vw] mx-auto"
          ref={embla_ref}
        >
          <ul className="flex items-stretch">
            {(data?.[0] || [1, 2, 3, 4, 5, 6]).map((blog, idx) => (
              <li
                key={idx}
                className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-2.5 grid"
              >
                {typeof blog === "number" ? (
                  <Skeleton />
                ) : (
                  <BlogCard {...blog} />
                )}
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={() => embla_api?.scrollNext()}
          className="p-4 bg-white text-blue-d1 rounded-full shadow-md z-10 absolute top-1/2 -translate-y-1/2 right-10 sm:right-[10%]"
          aria-label="Next slide"
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
};
