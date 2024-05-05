import Image from "components/Image";
import type { Benefit as TBenefit } from "content/benefits";

type Props = {
  className?: string;
  items: TBenefit[];
  subheading?: string;
  heading: string;
  body: string;
};
export default function Benefits(props: Props) {
  return (
    <section className={`grid ${props.className ?? ""}`}>
      {props.subheading && (
        <h4 className="text-lg uppercase text-blue-d1 text-center mb-4">
          {props.subheading}
        </h4>
      )}
      <h2 className="text-4.5xl capitalize text-navy-d4 text-center text-pretty mb-3">
        {props.heading}
      </h2>
      <p className="text-xl font-medium text-navy-l2 text-center mb-24 text-balance">
        {props.body}
      </p>
      <div className="grid gap-y-24 @2xl:gap-y-32">
        {props.items.map((b, i) => (
          <Benefit {...b} key={i} />
        ))}
      </div>
    </section>
  );
}

function Benefit(props: TBenefit) {
  return (
    <article className="grid justify-items-center @2xl:grid-cols-2 group gap-x-10">
      <div
        className={`w-full max-w-xs @2xl:max-w-[30rem] aspect-square ${props.cardBgClass} grid place-items-center rounded-4xl order-1 group-even:order-2 p-8 @3xl:p-16`}
      >
        <Image
          height={350}
          width={350}
          src={props.img}
          alt="benefit illustration"
        />
      </div>

      <div className="order-2 mt-4 @2xl:mt-0 @2xl:group-even:order-1 @2xl:group-even:justify-self-end self-center @5xl:self-start @5xl:mt-24">
        <h4 className="text-2xl @2xl:text-4xl text-center @2xl:text-left mb-6 text-pretty text-navy-d4">
          {props.title}
        </h4>
        <p className="text-lg @2xl:text-xl text-navy-l1 text-center @2xl:text-left">
          {props.description}
        </p>
      </div>
    </article>
  );
}
