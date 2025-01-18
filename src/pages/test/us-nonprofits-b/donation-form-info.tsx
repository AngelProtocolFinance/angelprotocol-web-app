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
      "Register in minutes, we’ll review and get you started right away.",
    image: { src: laira.cheering, width: 50 },
  },
  {
    title: "Never miss a donation",
    description:
      "Accept cash, stocks, crypto, and DAF gifts all in one conversion-optimized form.",
    image: { src: laira.announce, width: 50 },
  },
  {
    title: "Make it yours",
    description:
      "Apply your brand colors, customize wording and options, and easily add to your website.",
    image: { src: laira.like, width: 40 },
  },
  {
    title: "Grow your funds",
    description:
      "Choose to have your donations saved or invested to provide sustainable funding.",
    image: { src: laira.presentation, width: 60 },
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
        Raise more. Save more. Do less.
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
      <p className="col-span-full text-center text-xl @6xl:text-2xl leading-normal max-w-3xl justify-self-center mt-8">
        As a 501(c)(3) public charity, Better Giving accepts donations on your
        behalf, handling all reporting, processing, and tax receipting. We grant
        100% of donations directly to your bank account, or save and invest a
        portion based on your preferences.
      </p>
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
      <h6 className="text-lg font-medium @6xl:text-xl text-navy-d4">
        {props.title}
      </h6>
      <p className="text-lg @6xl:text-xl text-navy-l3">{props.description}</p>
    </li>
  );
}
