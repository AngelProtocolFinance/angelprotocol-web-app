import Subscriber from "components/Subscriber/Subscriber";
import {
  AiOutlineTwitter,
  AiFillYoutube,
  AiFillMediumSquare,
} from "react-icons/ai";

import { FaTelegramPlane } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="grid grid-rows-2 grid-cols-1 lg:grid-cols-2 lg:grid-rows-1 justify-items-center p-5 py-10 bg-blue-accent">
      <section className="max-w-2xl lg:order-2">
        <p className="text-lg sm:text-xl text-center lg:text-left text-white-grey font-semibold  mb-2">
          Angel Protocol creates sustainable income streams for charities. And
          we're just starting!{" "}
          <span className="text-md sm:text-lg text-center lg:text-left block font-normal ">
            Subscribe to our newsletter to get the latest updates.
          </span>
        </p>
        <Subscriber />
      </section>
      <section className="grid justify-items-center content-center lg:order-1">
        <ul className="flex">
          {links.map(({ id, Icon, color, link }) => {
            return (
              <li key={id}>
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className={`text-${color} hover:text-opacity-75 block m-2`}
                >
                  <Icon className="w-8 h-8" title={title} />
                </a>
              </li>
            );
          })}
        </ul>
        <p className="font-body text-xs uppercase text-white text-center">
          Copyright 2021 angelprotocol. All rights reserved.
        </p>
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
