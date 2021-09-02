import {
  AiOutlineTwitter,
  AiFillYoutube,
  AiFillMediumSquare,
} from "react-icons/ai";

import { FaTelegramPlane } from "react-icons/fa";

const links = [
  {
    id: 1,
    Icon: AiOutlineTwitter,
    link: "https://twitter.com/angelprotocol",
    color: "blue-400",
  },
  {
    id: 2,
    Icon: FaTelegramPlane,
    link: "https://t.me/angelprotocoI",
    color: "blue-300",
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

const Footer = () => {
  return (
    <footer className="grid justify-items-center p-5">
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
      <p className="font-body text-xs uppercase text-angel-grey">
        Copyright 2021 angelprotocol. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;

/**
 * <nav className="container mx-auto flex justify-between items-center h-16 inset-x-0 bottom-0 object-bottom">
        <a href="/" className="font-body text-2xs uppercase text-white">
          Copyright 2021 angelprotocol. All rights reserved.
        </a>
      </nav>
 */
