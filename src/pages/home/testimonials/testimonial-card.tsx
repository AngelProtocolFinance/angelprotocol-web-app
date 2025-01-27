import Image from "components/image";
import type { Testimonial } from "content/testimonials";

const TestimonialCard = (props: Testimonial) => {
  return (
    <div className="@container">
      <Image
        height={240}
        src={props.reviewer_org_logo}
        alt="Reviewer's organization logo"
        className="object-contain size-28 rounded-lg ml-8 bg-white shadow-xl"
      />
      <div className="relative -mt-14 pt-24 px-8 pb-8 rounded-3xl bg-white -z-10 border border-gray-l4">
        <p className="text-lg @md:h-64 mt-8">{props.content}</p>
        <p className="mt-4 @md:mt-0 text-lg opacity-90 font-bold">
          {props.reviewer}
        </p>
        <p className="md:text-lg font-medium">{props.reviewer_org_role}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
