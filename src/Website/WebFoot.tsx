import Subscriber from "Website/Subscriber/Subscriber";
import { Link } from "react-router-dom";
import {
  AiOutlineTwitter,
  AiFillYoutube,
  AiOutlineMedium,
} from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";
import { RiDiscordLine } from "react-icons/ri";

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
                  rel="noreferrer"
                  className={`${textColor} block m-2`}
                >
                  <Icon className="w-8 h-8" title={title} />
                </a>
              </li>
            );
          })}
        </ul>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/ap-litepaper.pdf"
            className="mt-2 mb-1 font-semibold text-sm uppercase text-white-grey text-center"
            target="_blank"
            download
          >
            Download Litepaper
          </Link>
          <a
            href="https://drive.google.com/file/d/1OMF45tdJW_IdiNxjL2juHwPhtUWbCtzE/view?usp=drive_web"
            target="_blank"
            rel="noreferrer"
            className="mt-2 mb-1 font-semibold text-sm uppercase text-white-grey text-center"
          >
            PRIVACY POLICY
          </a>
        </div>
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
    textColor: "text-gray-50 hover:text-grey-50/75",
    title: "Twitter",
  },
  {
    id: 2,
    Icon: FaTelegramPlane,
    link: "https://t.me/angelprotocoI",
    textColor: "text-blue-50 hover:text-blue-50/75",
    title: "Telegram",
  },
  {
    id: 3,
    Icon: AiFillYoutube,
    link: "https://www.youtube.com/channel/UCPYj_fooJCfc_tc52rPiw1w",
    textColor: "text-white hover:text-white/75",
    title: "YouTube",
  },
  {
    id: 4,
    Icon: AiOutlineMedium,
    link: "https://angelprotocol.medium.com/",
    textColor: "text-white hover:text-white/75",
    title: "Medium",
  },
  {
    id: 5,
    Icon: RiDiscordLine,
    link: "https://discord.gg/RhqA652ySA",
    textColor: "text-white hover:text-white/75",
    title: "Discord",
  },
];
