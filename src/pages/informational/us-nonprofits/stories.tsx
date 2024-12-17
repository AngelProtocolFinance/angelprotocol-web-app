import quotation from "assets/icons/quotation.svg";
import {
  type Testimonial as TTestimonial,
  testimonials,
} from "content/testimonials";

export function Stories({ className = "" }) {
  return (
    <div
      className={`${className} grid @3xl:grid-cols-[2fr_3fr] gap-x-4 relative`}
    >
      <div className="@3xl:mb-40 @3xl:-mt-24 py-4 @3xl:py-0 @3xl:sticky top-16 @3xl:top-32 bottom-32 self-start z-10">
        <img
          src={quotation}
          alt="quotation mark"
          width={60}
          className="mb-4 @3xl:mb-8"
        />
        <h2 className="text-navy-d4 text-pretty text-xl @3xl:text-3xl/normal">
          Nonprofit Success Stories: <br />
          Inspiring Change Together
        </h2>
      </div>

      <div className="grid gap-y-3.5 @container">
        {testimonials.map((t, idx) => (
          <Testimonial key={idx} {...t} />
        ))}
      </div>
    </div>
  );
}

const Testimonial = (props: TTestimonial) => {
  return (
    <div className="grid @lg:grid-cols-[auto_1fr] border border-gray-l4 rounded-3xl p-9 gap-x-8">
      <img
        src={props.reviewer_org_logo}
        alt="organization logo"
        className="size-24 object-contain object-center rounded-lg shadow-xl shadow-black/5 border border-gray-l4 mb-6 @lg:mb-0"
      />
      <div>
        <p className="text-xl mb-9 text-navy-l1">{props.content}</p>
        <p className="text-lg mb-2 font-bold">{props.reviewer}</p>
        <p className="text-navy-l1">{props.reviewer_org_role}</p>
      </div>
    </div>
  );
};
