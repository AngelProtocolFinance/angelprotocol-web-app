import { laira } from "assets/laira/laira";
import Image from "components/Image";
import { ShipWheel, Sprout, Tally4 } from "lucide-react";

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

export function Manifesto({ className = "" }) {
  return (
    <section className={`${className} grid pb-40`}>
      <h2 className="col-span-full text-center text-4xl leading-snug">
        The Better Giving Manifesto
      </h2>
      <p className="text-navy text-center mb-8 col-span-full text-xl mt-4 max-w-3xl justify-self-center">
        Nonprofits are the champions of societal change, addressing the world’s
        most pressing challenges. But they often face barriers like outdated
        systems, restrictive funding, and limited access to financial tools. At
        Better Giving, we’re committed to breaking down these barriers.
      </p>

      <p className="text-xl font-bold text-center text-blue-d1 mb-4">
        We believe in these fundamental rights for all nonprofits
      </p>

      <ul className="flex flex-wrap sm:justify-center gap-4 mt-4 mb-8">
        <li className="max-md:w-full pb-8 grid justify-items-center bg-white rounded shadow-2xl shadow-lilac gap-y-4 p-4 border-lilac border text-center font-heading font-black">
          <Sprout size={40} className="text-green" />
          <span className="text-lg">
            The Right to Financial Self-Sufficiency
          </span>
        </li>
        <li className="max-md:w-full pb-8 grid justify-items-center bg-white rounded shadow-2xl shadow-lilac gap-y-4 p-4 border-lilac border text-center font-heading font-black">
          <Tally4 size={35} className="text-navy" />
          <span className="text-lg">The Right to equal opportunity</span>
        </li>
        <li className="max-md:w-full pb-8 grid justify-items-center bg-white rounded shadow-2xl shadow-lilac gap-y-4 p-4 border-lilac border text-center font-heading font-black">
          <ShipWheel size={40} className="text-blue-d1" />
          <span className="text-lg">The Right to organizational autonomy</span>
        </li>
      </ul>

      {/* <ul className="mt-4 @3xl:divide-x divide-gray-l4 grid @3xl:grid-cols-3 gap-y-16 @3xl:gap-y-0">
        {items.map((item, idx) => (
          <ListItem {...item} key={idx} />
        ))}
      </ul> */}
      <p className="text-lg max-w-3xl text-center justify-self-center mt-10">
        At Better Giving, we envision a future where every nonprofit can fully
        exercise these rights—free from outdated systems and restrictive
        practices. We provide the tools and support you need to strengthen your
        financial future and achieve lasting impact.
      </p>
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
      <h5 className="text-center font-body font-medium text-2xl text-navy">
        {props.title1}
      </h5>
      <h6 className="text-center self-center font-normal font-body text-lg @6xl:text-xl text-navy-l1 mb-4">
        {props.title2}
      </h6>
      <p className="pt-4 text-center @6xl:text-lg text-navy-l3 border-t-[3px] border-blue-d1 ">
        {props.description}
      </p>
    </li>
  );
}
