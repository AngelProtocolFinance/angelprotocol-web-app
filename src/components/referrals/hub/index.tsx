import { Link } from "@remix-run/react";
import Image from "components/image";
import img4 from "./diamond-logo.png";
import img5 from "./laira-holding-folder.png";
import img1 from "./laptop.png";
import img3 from "./man-using-laptop.png";
import img2 from "./people-using-gadget.png";

interface ICard {
  id: string;
  title: string;
  img: {
    src: string;
    alt: string;
  };
  to: string;
}
export const cards: ICard[] = [
  {
    id: "1",
    title: "Logo and Brand Assets",
    img: { src: img1, alt: "laptop" },
    to: "https://intercom.help/better-giving/en/articles/11549962-referral-resource-hub-logos-and-brand-assets",
  },
  {
    id: "2",
    title: "Social Media Templates",
    img: { src: img2, alt: "people using gadget" },
    to: " https://intercom.help/better-giving/en/articles/11549960-referral-resource-hub-social-media-guidance-and-templates",
  },
  {
    id: "3",
    title: "Email Templates",
    img: {
      src: img3,
      alt: "man using laptop",
    },
    to: "https://intercom.help/better-giving/en/articles/11549957-referral-resource-hub-emails",
  },
  {
    id: "4",
    title: "Resource Hub",
    img: { src: img4, alt: "diamond logo" },
    to: "https://intercom.help/better-giving/en/collections/13341032-referral-program-resource-hub",
  },
];

interface Props {
  classes?: string;
}
export const Hub = ({ classes = "" }: Props) => {
  return (
    <div className={classes}>
      <h3 className="text-2xl mb-2">Referral Hub</h3>
      <div className={` bg-gray-l5 p-6 rounded-xl border border-gray-l4`}>
        <p className="mb-6 text-gray-d1">
          Your all-in-one resource for sharing Better Giving, equipping you to
          refer nonprofits, grow your network, and earn rewards smoothly.
        </p>
        <div className="overflow-x-auto">
          <div className="grid grid-rows-[auto_1fr] grid-cols-5 gap-x-8 min-w-max">
            {cards.map((card) => (
              <div
                // to={card.to ?? "#"}
                key={card.title}
                className="grid grid-rows-subgrid row-span-2 content-start"
              >
                <Link target="_blank" to={card.to}>
                  <Image
                    src={card.img.src}
                    alt={card.img.alt}
                    width={200}
                    className="rounded-xl shrink-0"
                  />
                </Link>

                <Link
                  target="_blank"
                  to={card.to}
                  className=" font-heading text-blue hover:text-blue-d1 mt-2 text-center font-semibold text-nowrap"
                >
                  {card.title}
                </Link>
              </div>
            ))}
            <Image
              src={img5}
              alt="laira holding folder"
              height={100}
              className="self-start h-36 object-contain grid grid-rows-subgrid row-span-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
