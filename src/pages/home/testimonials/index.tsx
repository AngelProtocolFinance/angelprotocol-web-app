import quotation from "assets/icons/quotation.svg";
import { testimonials } from "content/testimonials";
import { TestimonialCard } from "./testimonial-card";

export function Testimonials({ classes = "s" }) {
  return (
    <section
      className={`grid ${classes} pb-8 pt-24`}
      aria-labelledby="testimonials-heading"
    >
      <img
        src={quotation}
        alt=""
        className="justify-self-center w-24 lg:w-36 mb-8"
        aria-hidden="true"
      />
      <h2
        id="testimonials-heading"
        className="capitalize text-center text-3xl/tight md:text-4.5xl/tight text-pretty justify-self-center mb-14"
      >
        Member success spotlights: <br /> Inspiring change together
      </h2>

      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-0">
        {testimonials.map((testimonial, index) => (
          <article key={index} className="break-inside-avoid mb-4">
            <TestimonialCard {...testimonial} />
          </article>
        ))}
      </div>
    </section>
  );
}
