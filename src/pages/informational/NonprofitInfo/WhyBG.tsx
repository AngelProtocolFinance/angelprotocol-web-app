import lairaJumping from "assets/laira/laira-happy-jump.png";
import lairaOpenArms from "assets/laira/laira-open-arms.png";
import lairaSitting from "assets/laira/laira-sitting.png";
import Image from "components/Image";

type TListItem = {
  title1: string;
  title2: string;
  description: string;
  image: { src: string; width?: number; height?: number };
};
const items: TListItem[] = [
  {
    title1: "Trust",
    title2: "Built by a nonprofit, for nonprofits",
    description:
      "Register in minutes, we’ll review and get you started right away",
    image: { src: lairaOpenArms, width: 45 },
  },
  {
    title1: "Simplicity",
    title2: "Less admin work, more funding",
    description:
      "You easily accept all types of donations, we process and grant them out to you while managing all accounting and liability. We remove the hassle of receiving crypto, stock, and DAF funding.",
    image: { src: lairaSitting, width: 40 },
  },
  {
    title1: "Sustainability",
    title2: "Financial security at your fingertips",
    description:
      "With our innovative Sustainability Fund, you can allow donor gifts to be invested for growth, providing a reliable and growing income stream to provide not just today, but forever",
    image: { src: lairaJumping, width: 48 },
  },
];

export default function WhyBG({ className = "" }) {
  return (
    <section className={`${className} grid`}>
      <h2 className="mb-16 col-span-full text-center text-4xl leading-snug">
        Why <br className="@lg:hidden" /> Better Giving?
      </h2>

      <ul className="gap-y-16 @3xl:divide-x divide-gray-l4 grid @3xl:grid-cols-3">
        {items.map((item, idx) => (
          <ListItem {...item} key={idx} />
        ))}
      </ul>
    </section>
  );
}

function ListItem(props: TListItem) {
  return (
    <li className="flex flex-col px-9 items-center">
      <Image
        src={props.image.src}
        height={props.image.height}
        width={props.image.width}
        className="mb-4"
      />
      <h5 className="text-center font-body font-medium text-2xl text-navy py-4 border-b-[3px] px-8 border-blue-d1 mb-7">
        {props.title1}
      </h5>
      <h6 className="text-center font-normal font-body text-lg @6xl:text-xl text-navy-l1 mb-2">
        {props.title2}
      </h6>
      <p className="text-center text-lg @6xl:text-xl text-navy-l3">
        {props.description}
      </p>
    </li>
  );
}
