import { Image } from "components/image";
import type { Testimonial } from "content/testimonials";

export const Card = (props: Testimonial) => {
  return (
    <div className="shrink-0 max-w-96 last:pr-8">
      <Image
        width={120}
        height={120}
        src={props.reviewer_org_logo}
        alt="Reviewer's organization logo"
        className="object-contain size-28 rounded-lg ml-8 bg-white shadow-xl"
      />
      <div className="relative -mt-14 pt-24 px-8 pb-8 rounded-3xl bg-white -z-10 border border-gray-l3">
        <p className="text-lg mt-8">{props.content}</p>
        <p className="mt-4 text-lg opacity-90 font-bold">{props.reviewer}</p>
        <p className="md:text-lg font-medium">{props.reviewer_org_role}</p>
      </div>
    </div>
  );
};
