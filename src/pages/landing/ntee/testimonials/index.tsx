import quotation from "assets/icons/quotation.svg";
import { testimonials } from "content/testimonials";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "./card";

export const Testimonials = ({ classes = "" }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 640px)": { slidesToScroll: 1 },
      "(min-width: 768px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 3 },
    },
  });

  return (
    <div className={` ${classes} grid pt-48 overflow-x-clip`}>
      <img
        src={quotation}
        alt="quotation mark"
        className="justify-self-center w-24 lg:w-36 mb-8"
      />
      <h3 className="text-center text-3xl/tight md:text-4.5xl/tight text-pretty justify-self-center mb-14">
        Nonprofit Success Stories: <br /> Inspiring Change Together
      </h3>

      <div className="overflow-hidden relative" ref={emblaRef}>
        <div className="flex gap-x-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} {...testimonial} />
          ))}
        </div>
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          className="p-4 text-blue-d1 bg-white rounded-full border border-gray-l3 shadow-xl z-10 absolute top-32 left-0"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          className="p-4 text-blue-d1 bg-white rounded-full border border-gray-l3 shadow-xl z-10 absolute top-32 right-0"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
