import type { Testimonial } from "content/testimonials";

export const TestimonialCard = (props: Testimonial) => {
  return (
    <div className="grid content-start p-6 bg-white rounded w-full">
      <p className="text-lg">{props.content}</p>
      <p className="mt-4 font-bold text-left mb-4">{props.reviewer}</p>
      {/* <p className="font-medium text-left text-gray mb-2">{props.org}</p> */}
      <img
        width={props.org_logo.w}
        height={40}
        src={props.org_logo.src}
        alt="Reviewer's organization logo"
        className={`object-contain justify-self-start ${props.org_logo.classes ?? ""}`}
      />
    </div>
  );
};
