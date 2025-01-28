import { laira } from "assets/laira/laira";
import Image from "components/image";

type TListItem = {
  title1: string;
  title2: string;
  description: string;
  image: { src: string; width?: number; height?: number };
};
const items: TListItem[] = [
  {
    title1: "Integrity",
    title2: "Transparency and honesty in everything we do",
    description:
      "As a nonprofit working with other nonprofits, we prioritize accountability and full transparency in our financial operations, fund management, and reporting.",
    image: { src: laira.standing, width: 45 },
  },
  {
    title1: "Sustainability",
    title2: "Long-term financial sustainability",
    description:
      "We empower nonprofits with secure savings options and high-yield investment opportunities, ensuring they can grow their financial resources sustainably and create lasting impact.",
    image: { src: laira.presentation, width: 80 },
  },
  {
    title1: "Inclusivity",
    title2: "Access to financial tools for all nonprofits",
    description:
      "We offer free donation processing and support for organizations of all sizes, including international nonprofits through fiscal sponsorship.",
    image: { src: laira.heart, width: 60 },
  },
];

export function Section2({ className = "" }) {
  return (
    <section className={`${className} grid`}>
      <h4 className="mb-4 col-span-full text-lg text-blue-d1 uppercase text-center">
        WE STAND FOR NONPROFITS
      </h4>
      <h2 className="col-span-full text-center text-3xl md:text-4.5xl leading-snug">
        Our Mission & Values
      </h2>
      <p className="text-gray-d1 text-center mb-16 col-span-full text-xl mt-4 max-w-4xl justify-self-center">
        Our mission is to financially empower fellow nonprofits by providing a
        free, global one-stop solution to fundraise, save, and invest. We
        believe that making financial sustainability easy and accessible creates
        enduring impact.
      </p>

      <ul className="mt-4 @3xl:divide-x divide-gray-l4 grid @3xl:grid-cols-3 gap-y-16 @3xl:gap-y-0">
        {items.map((item, idx) => (
          <ListItem {...item} key={idx} />
        ))}
      </ul>
    </section>
  );
}

function ListItem(props: TListItem) {
  return (
    <li className="grid content-start @3xl:grid-rows-subgrid row-span-4 justify-items-center px-4">
      <Image
        src={props.image.src}
        height={props.image.height}
        width={props.image.width}
        className="mb-4"
      />
      <h5 className="text-center font-body font-medium text-xl @6xl:text-2xl text-gray-d1 mb-2">
        {props.title1}
      </h5>
      <h6 className="text-center self-start font-normal font-body text-lg @6xl:text-xl text-gray mb-4">
        {props.title2}
      </h6>
      <p className="pt-4 text-center @6xl:text-lg text-gray border-t-[3px] border-blue-d1 ">
        {props.description}
      </p>
    </li>
  );
}
