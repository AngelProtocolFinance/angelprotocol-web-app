import AppMenu from "components/AppFoot/AppMenu";
import { Link } from "react-router-dom";
import { getIcon } from "components/Icons/Icons";

export default function AppFoot() {
  return (
    <footer className="w-full grid place-items-center bg-gray-900">
      <div className="w-full  py-2 flex flex-col items-center lg:flex-row lg:items-center lg:justify-between padded-container">
        <nav className="flex lg:items-center mb-2 lg:mb-0 lg:order-2">
          <AppMenu />
        </nav>
        <div className="flex flex-col items-center">
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

          <Link
            to="/ap-litepaper.pdf"
            className="mt-2 mb-1 font-semibold text-xs uppercase text-white-grey text-center"
            target="_blank"
            download
          >
            Download Litepaper
          </Link>
          <p className="text-white-grey text-center text-xs uppercase lg:order-1 lg:text-left ">
            Copyright 2021 Angel Protocol. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

const links = [
  {
    id: 1,
    Icon: getIcon("Twitter"),
    link: "https://twitter.com/angelprotocol",
    textColor: "text-gray-50 hover:text-gray-50/75",
    title: "Twitter",
  },
  {
    id: 2,
    Icon: getIcon("Telegram"),
    link: "https://t.me/angelprotocoI",
    textColor: "text-blue-50 hover:text-blue-50/75",
    title: "Telegram",
  },
  {
    id: 3,
    Icon: getIcon("Youtube"),
    link: "https://www.youtube.com/channel/UCPYj_fooJCfc_tc52rPiw1w",
    textColor: "text-white hover:text-white/75",
    title: "YouTube",
  },
  {
    id: 4,
    Icon: getIcon("Medium"),
    link: "https://angelprotocol.medium.com/",
    textColor: "text-white hover:text-white/75",
    title: "Medium",
  },
  {
    id: 5,
    Icon: getIcon("Discord"),
    link: "https://discord.gg/RhqA652ySA",
    textColor: "text-white hover:text-white/75",
    title: "Discord",
  },
];
