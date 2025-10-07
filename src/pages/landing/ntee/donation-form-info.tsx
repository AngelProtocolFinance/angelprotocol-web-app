import laira_announce from "assets/laira/laira-announce.webp";
import laira_cheering from "assets/laira/laira-cheering.webp";
import laira_like from "assets/laira/laira-like.webp";
import laira_presentation from "assets/laira/laira-presentation.webp";
import { StepsCarousel } from "components/donation";
import { Image } from "components/image";
import { app_routes } from "constants/routes";

import { Link } from "react-router";

type TListItem = {
  title: string;
  description: string;
  image: { src: string; height?: number; width?: number };
};
const items: TListItem[] = [
  {
    title: "Quick, simple setup",
    description:
      "Register in minutes, we’ll review and get you started right away.",
    image: { src: laira_cheering, width: 50 },
  },
  {
    title: "Never miss a donation",
    description:
      "Accept cash, stocks, crypto, and DAF gifts all in one conversion-optimized form.",
    image: { src: laira_announce, width: 50 },
  },
  {
    title: "Make it yours",
    description:
      "Apply your brand colors, customize wording and options, and easily add to your website.",
    image: { src: laira_like, width: 40 },
  },
  {
    title: "Grow your funds",
    description:
      "Choose to have your donations saved or invested to provide sustainable funding.",
    image: { src: laira_presentation, width: 60 },
  },
];

export function DonationFormInfo({ className = "" }) {
  return (
    <section
      className={`${className} grid @6xl:grid-cols-2 gap-x-16 content-start`}
    >
      <h4 className="mb-4 col-span-full text-lg text-blue-d1 uppercase text-center">
        Your all-in-one donation form
      </h4>
      <h2 className="col-span-full text-center text-3xl @3xl:text-4.5xl mb-4">
        <span className="text-blue-d1">Raise more.</span> Do less.
      </h2>
      <p className="col-span-full mb-12 text-center text-xl text-navy">
        100% free. No setup costs, no recurring charges, no platform fees.
      </p>

      <StepsCarousel classes="w-full max-w-lg self-center justify-self-center" />

      <ul className="divide-y divide-gray-l4 mt-6 @6xl:mt-0 grid grid-cols-[auto_1fr]">
        {items.map((item, idx) => (
          <ListItem {...item} key={idx} />
        ))}
      </ul>
      <Link
        to={`${app_routes.register}/welcome`}
        className="text-center btn-blue px-6 py-2 @6xl:px-10 @6xl:py-4 @6xl:text-lg shadow-blue/30 hover:shadow-blue/50 active:translate-x-1  font-bold shadow-2xl rounded-xl justify-self-center col-span-full mt-8"
      >
        Start Free
      </Link>
    </section>
  );
}

function ListItem(props: TListItem) {
  return (
    <li className="grid grid-cols-subgrid col-span-2 gap-y-1 gap-x-4 py-6">
      <Image
        src={props.image.src}
        className="col-start-1 row-span-2"
        width={props.image.width}
        height={props.image.height}
      />
      <h6 className="text-lg font-medium @6xl:text-xl text-gray-d4">
        {props.title}
      </h6>
      <p className="text-lg @6xl:text-xl text-gray">{props.description}</p>
    </li>
  );
}
