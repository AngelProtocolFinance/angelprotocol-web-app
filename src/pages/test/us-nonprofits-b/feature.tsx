import { laira } from "assets/laira/laira";
import Image from "components/Image";
type TListItem = {
  title1: string;
  title2: string;
  description: string;
  image: { src: string; width?: number; height?: number };
};
const items: TListItem[] = [
  {
    title1: "Step 1",
    title2: "Sign Up",
    description:
      "Get started in minutes with our quick and easy sign-up process, completely free of charge.",
    image: { src: laira.negotiating, width: 100 },
  },
  {
    title1: "Step 2",
    title2: "Embed Donation Form ",
    description:
      "Add our customizable donation form to your website effortlessly and start raising funds immediately.",
    image: { src: laira.laptop, width: 50 },
  },
  {
    title1: "Step 3",
    title2: "Grow Your Funds",
    description:
      "Watch your donations grow with our high-yield savings account and expertly managed investment funds.",
    image: { src: laira.presentation, width: 90 },
  },
];

export function Feature({ className = "" }) {
  return (
    <section className={`${className} pt-20 pb-20 lg:pb-0 grid content-start`}>
      <h3 className="text-sm md:text-lg text-blue-d1 text-center mb-4">
        Easy as 1-2-3
      </h3>
      <h2 className="text-center text-3xl md:text-4.5xl text-balance mb-6 px-4">
        How Better Giving Works
      </h2>
      <p className="text-navy-l1 px-10 text-center mb-16 text-xl">
        Discover how easy it is to boost your nonprofit’s donations and achieve
        long-term financial sustainability.
      </p>

      <ul className="lg:divide-x divide-gray-l4 grid gap-y-20 lg:gap-y-0 lg:grid-cols-3">
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
        className="mb-4"
      />
      <h5 className="text-center font-body font-medium text-2xl text-navy px-8">
        {props.title1}
      </h5>
      <h6 className="py-4 text-center font-medium font-body text-lg @6xl:text-xl text-navy-l1 border-b-[3px] border-blue-d1 mb-7 px-8">
        {props.title2}
      </h6>
      <p className="text-center text-lg @6xl:text-xl text-navy-l3">
        {props.description}
      </p>
    </li>
  );
}
