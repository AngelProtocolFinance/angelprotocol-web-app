import { posts } from "api/get/wp-posts";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useSWR from "swr/immutable";
import BlogCard, { Skeleton } from "./BlogCard";

const Blogs = () => {
  const { data } = useSWR("1", (page) => posts(+page));

  const [emblaRef, emblaApi] = useEmblaCarousel({
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
    <section className="grid content-start py-40 bg-gradient-to-b from-transparent via-peach/40 to-transparent overflow-x-clip">
      <h2 className="text-navy-d4 text-3xl md:text-4.5xl text-center mb-14 px-4">
        Gain Knowledge to Empower Your Nonprofit
      </h2>

      <div className="relative">
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          className="p-4 bg-white text-blue-d1 rounded-full shadow-md z-10 absolute top-1/2 -translate-y-1/2 left-10 md:left-[15%]"
          aria-label="Previous slide"
        >
          <ChevronLeft />
        </button>

        <div
          className="overflow-hidden w-[70vw] md:w-[80vw] lg:w-[65vw] mx-auto"
          ref={emblaRef}
        >
          <div className="flex">
            {(data?.[0] || [1, 2, 3, 4, 5, 6]).map((blog, idx) => (
              <div
                key={idx}
                className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-2.5"
              >
                {typeof blog === "number" ? (
                  <Skeleton />
                ) : (
                  <BlogCard {...blog} />
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          className="p-4 bg-white text-blue-d1 rounded-full shadow-md z-10 absolute top-1/2 -translate-y-1/2 right-10 md:right-[15%]"
          aria-label="Next slide"
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
};

export default Blogs;
