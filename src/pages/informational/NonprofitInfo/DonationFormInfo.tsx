import { laira } from "assets/laira/laira";
import Image from "components/Image";
import { StepsCarousel } from "components/donation";

type TListItem = {
  title: string;
  description: string;
  image: { src: string; height?: number; width?: number };
};
const items: TListItem[] = [
  {
    title: "Quick, simple setup",
    description:
      "Register in minutes, we’ll review and get you started right away",
    image: { src: laira.openArms, width: 28 },
  },
  {
    title: "Never miss a donation",
    description:
      "Accept cash, stocks, crypto, and DAF gifts all in one conversion-optimized form",
    image: { src: laira.sitting, width: 23 },
  },
  {
    title: "Increase funds raised",
    description:
      "Increase funds raised: Choose to have your donations invested to provide sustainable funding",
    image: { src: laira.jumping, width: 30 },
  },
  {
    title: "Fundraise for free",
    description:
      "Fundraise for free: 100% free. No setup costs, no recurring charges, no platform fees of any kind",
    image: { src: laira.standing, width: 20 },
  },
];

export default function DonationFormInfo({ className = "" }) {
  return (
    <section className={`${className} grid @6xl:grid-cols-2 gap-x-16`}>
      <h4 className="mb-4 col-span-full text-lg text-blue-d1 uppercase text-center">
        Your all-in-one donation form
      </h4>
      <h2 className="mb-16 col-span-full text-center text-4xl">
        Easily accept all types of donations
      </h2>

      <StepsCarousel classes="w-full max-w-lg self-center justify-self-center" />

      <ul className="divide-y divide-gray-l4 mt-6 @6xl:mt-0">
        {items.map((item, idx) => (
          <ListItem {...item} key={idx} />
        ))}
      </ul>
    </section>
  );
}

function ListItem(props: TListItem) {
  return (
    <li className="grid grid-cols-[auto_1fr] gap-y-1 gap-x-4 py-6">
      <Image
        src={props.image.src}
        className="col-start-1 row-span-2"
        width={props.image.width}
        height={props.image.height}
      />
      <h6 className="text-lg font-medium @6xl:text-xl text-navy-d4">
        {props.title}
      </h6>
      <p className="text-lg @6xl:text-xl text-navy-l3">{props.description}</p>
    </li>
  );
}
