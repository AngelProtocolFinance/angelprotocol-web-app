import Image from "components/Image";
import type { Testimonial } from "content/testimonials";

export const SwipeCard = (props: Testimonial) => {
  return (
    <div className="@container/swipe-card">
      <Image
        height={240}
        src={props.reviewer_org_logo}
        alt="logo"
        className="object-contain size-28 rounded-lg ml-8 bg-white shadow-xl"
      />
      <div className="relative -mt-14 pt-24 px-8 pb-8 rounded-3xl bg-white -z-10 border border-gray-l4">
        <p className="text-lg @md/swipe-card:h-64 mt-8">{props.content}</p>
        <p className="mt-4 @md/swipe-card:mt-0 text-lg opacity-90 font-bold">
          {props.reviewer}
        </p>
        <p className="@3xl:text-lg font-medium">{props.reviewer_org_role}</p>
      </div>
    </div>
  );
};
