import { Testimonial } from "./types";

const TestimonialCard = (props: Testimonial) => {
  return (
    <div className="@container">
      <img
        src={props.reviewer_logo}
        alt="logo"
        className="object-contain size-28 rounded-lg ml-8 bg-white shadow-xl"
      />
      <div className="relative -mt-14 pt-24 px-8 pb-8 rounded-3xl bg-white -z-10">
        <p className="text-lg @md:h-64 mt-8">{props.review}</p>
        <p className="mt-4 @md:mt-0 text-lg opacity-90 font-bold">
          {props.reviewer}
        </p>
        <p className="md:text-lg font-medium">{props.reviewer_profession}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
