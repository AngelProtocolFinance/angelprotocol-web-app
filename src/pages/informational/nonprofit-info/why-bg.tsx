import laira_coin from "assets/laira/laira-coin.webp";
import laira_sitting from "assets/laira/laira-sitting.webp";
import laira_standing from "assets/laira/laira-standing.webp";
import { Image } from "components/image";
import { BOOK_A_DEMO } from "constants/env";
import { ArrowRight } from "lucide-react";
import { Link, href } from "react-router";

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
      "We understand your pain points firsthand, which is how we’ve helped causes in over 30 countries raise more than $6 million in donations - entirely for free.",
    image: { src: laira_standing, width: 40 },
  },
  {
    title1: "Simplicity",
    title2: "Less admin work, more funding",
    description:
      "Easily accept all types of donations while we manage all reporting, accounting and tax receipting. We’d tell you to sit back and relax - if you weren’t so mission driven.",
    image: { src: laira_sitting, width: 45 },
  },
  {
    title1: "Sustainability",
    title2: "Financial security at your fingertips",
    description:
      "With our high-yield savings and managed investment funds, let your donations work for you: a reliable and growing income stream to provide not just today, but forever.",
    image: { src: laira_coin, width: 65 },
  },
];

export default function WhyBG({ className = "" }) {
  return (
    <section className={`${className} grid`}>
      <h4 className="mb-4 col-span-full text-lg text-blue-d1 uppercase text-center">
        The Better Giving Difference
      </h4>
      <h2 className="col-span-full text-center text-3xl md:text-4.5xl leading-snug">
        Why Nonprofits Choose Better Giving
      </h2>
      <p className="text-gray-d1 text-center mb-16  col-span-full text-xl mt-4">
        A partner who understands your needs.
      </p>

      <ul className="mt-4 @3xl:divide-x divide-gray-l3 grid @3xl:grid-cols-3 gap-y-16 @3xl:gap-y-0">
        {items.map((item, idx) => (
          <ListItem {...item} key={idx} />
        ))}
      </ul>
      <div className="isolate z-10 flex flex-col @3xl:flex-row items-center justify-self-center gap-4 mt-24">
        <Link
          to={href("/register/welcome")}
          className="btn-blue isolate normal-case inline-flex items-center px-10 py-3 gap-1 rounded-full text-lg  relative group active:translate-x-1 font-bold shadow-2xl"
        >
          <span className="ml-1">Start Today</span>
          <ArrowRight size={18} className="group-hover:translate-x-1" />
        </Link>
        <Link
          to={BOOK_A_DEMO}
          className="isolate normal-case inline-flex items-center px-10 py-3 gap-1 rounded-full text-lg  relative bg-white group active:translate-x-1 text-blue-d1 font-bold shadow-2xl shadow-black/10 border border-blue-l3"
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
    <li className="grid content-start @3xl:grid-rows-subgrid row-span-4 justify-items-center px-4">
      <Image
        src={props.image.src}
        height={props.image.height}
        width={props.image.width}
        className="mb-4"
      />
      <h5 className="text-center  font-medium text-2xl text-gray-d1">
        {props.title1}
      </h5>
      <h6 className="text-center self-center font-normal  text-lg @6xl:text-xl text-gray mb-4">
        {props.title2}
      </h6>
      <p className="pt-4 text-center @6xl:text-lg text-gray border-t-[3px] border-blue-d1 ">
        {props.description}
      </p>
    </li>
  );
}
