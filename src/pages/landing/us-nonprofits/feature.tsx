import { laira } from "assets/laira/laira";
import Image from "components/image";
import { Video, videos } from "components/video/video";

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
    image: { src: laira.shakeHands, width: 100, alt: "Laira negotiating" },
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

export function Feature({ className = "" }) {
  return (
    <section
      className={`${className} pt-10 pb-20 lg:pb-0 lg:grid-cols-2 lg:gap-10 grid content-start`}
    >
      <div className="self-center max-lg:contents">
        <h2 className="text-sm md:text-lg text-blue-d1 max-lg:text-center mb-4">
          Easy as 1-2-3
        </h2>
        <h3 className="max-lg:text-center text-3xl md:text-4.5xl text-balance mb-6 max-lg:px-4">
          How Better Giving Works
        </h3>
        <p className="text-gray max-lg:px-10 max-lg:text-center mb-2 text-xl">
          Discover how easy it is to boost your nonprofit’s donations and
          achieve long-term financial sustainability.
        </p>
      </div>

      <Video vid={videos.about} classes="max-w-2xl justify-self-center p-4" />

      <ul className="col-span-full mt-10 lg:divide-x divide-gray-l3 grid gap-y-20 lg:gap-y-0 lg:grid-cols-3">
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
