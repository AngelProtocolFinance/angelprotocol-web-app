import quotation from "assets/icons/quotation.svg";
import { testimonials } from "content/testimonials";
import { TestimonialCard } from "./testimonial-card";

export function Testimonials({ classes = "s" }) {
  return (
    <div className={`grid ${classes} pb-8 pt-24`}>
      <img
        src={quotation}
        alt="quotation mark"
        className="justify-self-center w-24 lg:w-36 mb-8"
      />
      <h3 className="capitalize text-center text-3xl/tight md:text-4.5xl/tight text-pretty justify-self-center mb-14">
        Member success spotlights: <br /> Inspiring change together
      </h3>

      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-0">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="break-inside-avoid mb-4">
            <TestimonialCard {...testimonial} />
          </div>
        ))}
      </div>
    </div>
  );
}
