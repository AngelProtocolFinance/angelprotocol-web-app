import Image from "components/image";
import { Bolt, Combine, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import sectionImg from "./images/portfolio.webp";

type TListItem = {
  title1: string;
  title2: string;
  description: string;
  icon: ReactNode;
};
const items: TListItem[] = [
  {
    title1: "Your Donations, Your Way",
    title2: "",
    description:
      "Choose what proportion of donated funds are granted directly to your bank account, held in a high-yield savings account, or invested into the market for growth. Savings & investments are purely optional. You can change your preferences, transfer balances, or request grants at any time.",
    icon: <Bolt size={38} className="stroke-blue-d1" />,
  },
  {
    title1: "Secure and Compliant",
    title2: "",
    description:
      "Better Giving’s fund management solutions are fully regulated investment vehicles secured through our trusted financial partner, Fidelity Investments. Our portfolios are constructed and reviewed by an experienced investment committee to ensure responsible and effective management.",
    icon: <ShieldCheck size={36} className="text-blue-d1" />,
  },
  {
    title1: "Flexibility For Your Needs",
    title2: "",
    description:
      "We understand one-size does not fit all. From conservative 4-5% US Treasury savings returns with no market risk, to balanced investment portfolios providing avg. annual returns of 24% over the past 5 years, we’ve got you covered.",
    icon: <Combine size={35} className="text-blue-d1" />,
  },
];

export default function WhyBG({ className = "" }) {
  return (
    <section className={`${className} grid`}>
      <h4 className="mb-4 col-span-full text-lg text-blue-d1 uppercase text-center">
        Fund Management Solutions
      </h4>
      <h2 className="col-span-full text-center text-3xl md:text-4.5xl leading-snug mb-16">
        The Sustainability Fund: <br /> Securing Your Future, Today
      </h2>

      <div className="grid @3xl:grid-cols-2 items-center mb-14 p-3 rounded-lg">
        <Image src={sectionImg} width={320} className="justify-self-center" />
        <div className="">
          <p className="border-b border-gray-l4 pb-2 text-2xl mb-4 mt-4 @3xl:mt-0 font-medium text-center @3xl:text-left">
            Investment Philosophy
          </p>
          <ul className="space-y-7">
            <li className="text-center @3xl:text-left">
              <span className="block font-semibold mb-1">
                50% Equity Exposure
              </span>{" "}
              <span className="text-navy-l1">
                benefit from the long-term growth potential of US and global
                markets
              </span>
            </li>
            <li className="text-center @3xl:text-left">
              <span className="block font-semibold b-1">
                30% Fixed Income Stability
              </span>{" "}
              <span className="text-navy-l1">
                cushion losses during market down-turns and generate steady
                income
              </span>
            </li>
            <li className="text-center @3xl:text-left">
              <span className="block font-semibold mb-1">
                15% Blockchain Assets
              </span>{" "}
              <span className="text-navy-l1">
                gain exposure to the emerging digital asset frontier
              </span>
            </li>
            <li className="text-center @3xl:text-left">
              <span className="block font-semibold mb-1">
                5% Cash Flexibility
              </span>{" "}
              <span className="text-navy-l1">
                maintain liquidity for strategic rebalancing opportunities
              </span>
            </li>
          </ul>
        </div>
      </div>
      <ul className="mt-4 @3xl:divide-x divide-gray-l4 grid @3xl:grid-cols-3 gap-y-16 @3xl:gap-y-0">
        {items.map((item, idx) => (
          <ListItem {...item} key={idx} />
        ))}
      </ul>
      <p className="text-navy-l1 text-sm text-center mt-16 max-w-2xl justify-self-center">
        Disclaimer: Past performance is not indicative of future results. All
        investments carry risk, and the value of our portfolio may fluctuate.
        Our investment committee oversees and reviews our portfolio to ensure
        alignment with long-term financial goals, but returns cannot be
        guaranteed.
      </p>
    </section>
  );
}

function ListItem(props: TListItem) {
  return (
    <li className="grid content-start @3xl:grid-rows-subgrid row-span-4 justify-items-center px-4">
      {props.icon}
      <h5 className="text-center font-body font-medium text-xl @6xl:text-2xl text-navy mt-8">
        {props.title1}
      </h5>
      <h6 className="text-center self-center font-normal font-body text-lg @6xl:text-xl text-navy-l1 mb-4">
        {props.title2}
      </h6>
      <p className="text-center @6xl:text-lg text-navy-l3 mt-4">
        {props.description}
      </p>
    </li>
  );
}
