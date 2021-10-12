import Subscriber from "components/Subscriber/Subscriber";
import litePaper from "assets/docs/ap-litepaper.pdf";
import {
  AiOutlineTwitter,
  AiFillYoutube,
  AiFillMediumSquare,
} from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";

export default function WebFoot() {
  return (
    <footer className="grid grid-rows-2 grid-cols-1 lg:grid-cols-2 lg:grid-rows-1 justify-items-center p-5 pt-10 py-12 bg-blue-accent">
      <section className="max-w-2xl lg:order-2 grid place-items-center lg:block">
        <p className="text-lg sm:text-xl text-center lg:text-left text-white-grey font-semibold  mb-2">
          Angel Protocol creates sustainable income streams for charities
          <span className="text-base sm:text-lg text-center lg:text-left block font-normal ">
            Subscribe to our newsletter to get the latest updates.
          </span>
        </p>
        <Subscriber />
      </section>
      <section className="grid justify-items-center content-center lg:order-1 mt-10 md:mt-0">
        <ul className="flex">
          {links.map(({ id, Icon, textColor, link, title }) => {
            return (
              <li key={id}>
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={`${textColor} hover:text-opacity-75 block m-2`}
                >
                  <Icon className="w-8 h-8" title={title} />
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href={litePaper}
          className="mt-2 mb-1 font-semibold text-sm uppercase text-white-grey text-center"
          target="_blank"
          rel="noreferrer noopener"
          download="AP Litepaper"
        >
          Download Litepaper
        </a>
        <p className="font-body text-xs uppercase text-white text-center">
          Copyright 2021 Angel Protocol. All rights reserved.
        </p>
      </section>
    </footer>
  );
}

const links = [
  {
    id: 1,
    Icon: AiOutlineTwitter,
    link: "https://twitter.com/angelprotocol",
    textColor: "text-gray-50",
    title: "Twitter",
  },
  {
    id: 2,
    Icon: FaTelegramPlane,
    link: "https://t.me/angelprotocoI",
    textColor: "text-blue-50",
    title: "Telegram",
  },
  {
    id: 3,
    Icon: AiFillYoutube,
    link: "https://www.youtube.com/channel/UCPYj_fooJCfc_tc52rPiw1w",
    textColor: "text-red-600",
    title: "YouTube",
  },
  {
    id: 4,
    Icon: AiFillMediumSquare,
    link: "https://angelprotocol.medium.com/",
    textColor: "text-gray-800",
    title: "Medium",
  },
];
