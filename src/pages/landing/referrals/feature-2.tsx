import { laira } from "assets/laira/laira";
import Image from "components/image";
import { ArrowRight } from "lucide-react";

type TListItem = {
  title1: string;
  title2: string;
  description: string;
  image: { src: string; width?: number; height?: number; alt: string };
};
export const items: TListItem[] = [
  {
    title1: "Step 1",
    title2: "Get Your Unique Link",
    description:
      "Sign up for a free Better Giving account and access your referral link.",
    image: { src: laira.laptop, width: 50, alt: "Laira negotiating" },
  },
  {
    title1: "Step 2",
    title2: "Share with Your Network",
    description:
      "Send your link to nonprofits, consultants, or anyone who could benefit.",
    image: { src: laira.heart, width: 60, alt: "Laira using laptop" },
  },
  {
    title1: "Step 3",
    title2: "Earn Rewards",
    description:
      "Earn through Better Giving whenever your referred nonprofits succeed their donations stay 100% theirs.",
    image: { src: laira.shakeHands, width: 90, alt: "Laira presenting" },
  },
];

export function Feature2({ className = "" }) {
  return (
    <section className={`${className} py-10 xl:py-30 grid content-start`}>
      <h2 className="text-3xl md:text-4xl text-balance mb-6 text-center col-span-full">
        How It Works - Simple Steps
      </h2>

      <p className="text-gray text-center max-lg:px-10 max-lg:text-center mb-2 text-xl col-span-full">
        Our referral program makes it easy to share Better Giving while earning
        rewards.
        <br />
        Understand how you can earn while making a difference, here’s how it
        works.
      </p>

      <ul className="col-span-full mt-4 lg:divide-x divide-gray-l3 grid gap-y-20 lg:gap-y-0 lg:grid-cols-3">
        {items.map((item, idx) => (
          <ListItem {...item} key={idx} />
        ))}
      </ul>
      <a
        href="#getlink"
        className="btn-blue mt-8 justify-self-center col-span-full ml-1 group active:translate-x-1 font-bold shadow-2xl inline-flex items-center px-10 py-3 gap-1 rounded-full text-lg font-heading"
      >
        Get Your Link Now
        <ArrowRight size={18} className="group-hover:translate-x-1" />
      </a>
    </section>
  );
}

export function ListItem(props: TListItem) {
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
