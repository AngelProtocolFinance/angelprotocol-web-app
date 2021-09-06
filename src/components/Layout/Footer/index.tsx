import Subscriber from "components/Subscriber/Subscriber";
import {
  AiOutlineTwitter,
  AiFillYoutube,
  AiFillMediumSquare,
} from "react-icons/ai";

import { FaTelegramPlane } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="grid grid-cols-2 justify-items-center p-5 py-10 bg-blue-accent">
      <section className="grid justify-items-center content-center">
        <ul className="flex">
          {links.map(({ id, Icon, color, link }) => {
            return (
              <li key={id}>
                <a href={link} className={`text-${color} block m-2`}>
                  <Icon className="w-8 h-8" />
                </a>
              </li>
            );
          })}
        </ul>
        <p className="font-body text-xs font-semibold uppercase text-white">
          Copyright 2021 angelprotocol. All rights reserved.
        </p>
      </section>
      <section className="max-w-2xl">
        <p className="text-white-grey font-semibold text-xl mb-2">
          Angel Protocol creates sustainable income streams for charities. And
          we're just starting!{" "}
          <span className="block font-normal text-lg">
            Subscribe to our newsletter to get the latest updates.
          </span>
        </p>
        <Subscriber />
      </section>
    </footer>
  );
};

export default Footer;

const links = [
  {
    id: 1,
    Icon: AiOutlineTwitter,
    link: "https://twitter.com/angelprotocol",
    color: "gray-50",
  },
  {
    id: 2,
    Icon: FaTelegramPlane,
    link: "https://t.me/angelprotocoI",
    color: "blue-50",
  },
  {
    id: 3,
    Icon: AiFillYoutube,
    link: "https://www.youtube.com/channel/UCPYj_fooJCfc_tc52rPiw1w",
    color: "red-600",
  },
  {
    id: 4,
    Icon: AiFillMediumSquare,
    link: "https://angelprotocol.medium.com/",
    color: "gray-800",
  },
];

/**
 * <nav className="container mx-auto flex justify-between items-center h-16 inset-x-0 bottom-0 object-bottom">
        <a href="/" className="font-body text-2xs uppercase text-white">
          Copyright 2021 angelprotocol. All rights reserved.
        </a>
      </nav>
 */
