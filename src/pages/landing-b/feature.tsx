import photo from "assets/images/bg-logo-leaf-bg.webp";
import { laira } from "assets/laira/laira";
import Image from "components/image";

type TListItem = {
  title1: string;
  description: string;
  image: { src: string; width?: number; height?: number; alt: string };
};
const items: TListItem[] = [
  {
    title1: "More Ways to Give",
    description:
      "Accept crypto, stock, DAFs, and traditional payments all in one place.",
    image: { src: laira.heart, width: 80, alt: "Laira giving heart symbol" },
  },
  {
    title1: "Nonprofit-Owned",
    description: "We exist to support nonprofits, not to profit from them.",
    image: { src: laira.negotiating, width: 100, alt: "Laira using laptop" },
  },
  {
    title1: "Zero Platform Fees",
    description: "100% of donations go directly to your cause.",
    image: { src: laira.pointing, width: 65, alt: "Laira presenting" },
  },
  {
    title1: "Built for Long-Term Growth",
    description:
      "Free fundraising tools, savings accounts, and financial planning support.",
    image: { src: laira.presentation, width: 90, alt: "Laira presenting" },
  },
];

export function Feature({ className = "" }) {
  return (
    <section
      className={`${className} pt-10 pb-20 lg:pb-0 lg:grid-cols-2 lg:gap-10 grid content-start`}
    >
      <div className="self-center max-lg:contents">
        <h3 className="max-lg:text-center text-3xl md:text-4.5xl text-balance mb-6 max-lg:px-4">
          Who is Better Giving?
        </h3>
        <p className="text-gray max-lg:px-10 max-lg:text-center mb-4 text-xl">
          Better Giving is a nonprofit donation platform built by nonprofits,
          for nonprofits. We believe that fundraising should empower your
          mission—not drain your resources with excessive fees and restrictions.
        </p>
        <p className="text-gray max-lg:px-10 max-lg:text-center mb-2 text-xl">
          Unlike other platforms, we charge nothing for processing donations and
          provide powerful tools to help nonprofits grow their funds
          sustainably.
        </p>
      </div>

      <Image
        width={350}
        height={350}
        src={photo}
        alt="Better Giving logo with leaves background"
        className="w-full max-w-80 justify-self-center p-4"
      />

      <ul className="col-span-full mt-10 lg:divide-x divide-gray-l3 grid gap-y-20 lg:gap-y-0 md:grid-cols-2 lg:grid-cols-4">
        {items.map((item, idx) => (
          <ListItem {...item} key={idx} />
        ))}
      </ul>
    </section>
  );
}

function ListItem(props: TListItem) {
  return (
    <li className="grid lg:grid-rows-subgrid row-span-4 px-9 justify-items-center">
      <Image
        src={props.image.src}
        height={props.image.height}
        width={props.image.width}
        alt={props.image.alt}
        className="pb-2"
      />
      {/* <h4 className="text-center font-body font-medium text-2xl text-gray-d1 px-8">
        {props.title1}
      </h4> */}
      <h5 className="py-4 text-center font-medium font-body @6xl:text-lg text-blue-d1 border-t-2 border-blue-d1 mb-2 px-8">
        {props.title1}
      </h5>
      <p className="text-center text-lg @6xl:text-xl text-gray">
        {props.description}
      </p>
    </li>
  );
}
