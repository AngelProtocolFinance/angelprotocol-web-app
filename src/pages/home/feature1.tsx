import { Link } from "@remix-run/react";
import { laira } from "assets/laira/laira";
import Image from "components/image";
import { BOOK_A_DEMO } from "constants/env";
import { appRoutes } from "constants/routes";
import { ArrowRight } from "lucide-react";

type TListItem = {
  title1: string;
  title2: string;
  description: string;
  image: { src: string; width?: number; height?: number; alt: string };
};
const items: TListItem[] = [
  {
    title1: "Step 1",
    title2: "Sign Up",
    description:
      "Get started in minutes with our quick and easy sign-up process, completely free of charge.",
    image: { src: laira.negotiating, width: 100, alt: "Laira negotiating" },
  },
  {
    title1: "Step 2",
    title2: "Embed Donation Form ",
    description:
      "Add our customizable donation form to your website effortlessly and start raising funds immediately.",
    image: { src: laira.laptop, width: 50, alt: "Laira using laptop" },
  },
  {
    title1: "Step 3",
    title2: "Grow Your Funds",
    description:
      "Watch your donations grow with our high-yield savings account and expertly managed investment funds.",
    image: { src: laira.presentation, width: 90, alt: "Laira presenting" },
  },
];

export function Feature1({ className = "" }) {
  return (
    <section
      className={`${className} pt-56 pb-20 lg:pb-0 grid content-start bg-linear-to-b from-transparent to-peach/20`}
    >
      <h2 className="text-sm md:text-lg text-blue-d1 text-center mb-4">
        Easy as 1-2-3
      </h2>
      <h3 className="text-center text-3xl md:text-4.5xl text-balance mb-6 px-4">
        How Better Giving Works
      </h3>
      <p className="text-gray px-10 text-center mb-16 text-xl">
        Discover how easy it is to boost your nonprofit’s donations and achieve
        long-term financial sustainability.
      </p>

      <ul className="lg:divide-x divide-gray-l4 grid gap-y-20 lg:gap-y-0 lg:grid-cols-3">
        {items.map((item, idx) => (
          <ListItem {...item} key={idx} />
        ))}
      </ul>
      <div className="isolate z-10 flex max-md:flex-col items-center justify-self-center gap-4 mt-24">
        <Link
          to={appRoutes.register}
          className="group isolate normal-case inline-flex items-center px-10 py-3 gap-1 text-lg relative bg-blue-d1 active:translate-x-1 text-white font-heading font-bold shadow-2xl rounded-full"
        >
          <span className="ml-1">Start Today</span>
          <ArrowRight size={18} className="group-hover:translate-x-1" />
        </Link>
        <Link
          to={BOOK_A_DEMO}
          className="group isolate normal-case inline-flex items-center px-10 py-3 gap-1 text-lg bg-white shadow-2xl shadow-black/5 active:translate-x-1 text-blue-d1 font-heading font-bold rounded-full relative border border-blue-l2"
        >
          <span className="ml-1">Book A Demo</span>
          <ArrowRight size={18} className="group-hover:translate-x-1" />
        </Link>
      </div>
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
        className="mb-4"
      />
      <h4 className="text-center font-body font-medium text-2xl text-gray-d1 px-8">
        {props.title1}
      </h4>
      <h5 className="py-4 text-center font-medium font-body text-lg @6xl:text-xl text-gray border-b-[3px] border-blue-d1 mb-7 px-8">
        {props.title2}
      </h5>
      <p className="text-center text-lg @6xl:text-xl text-gray">
        {props.description}
      </p>
    </li>
  );
}
