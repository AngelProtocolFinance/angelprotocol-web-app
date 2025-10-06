import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import facebook from "assets/icons/social/facebook.webp";
import instagram from "assets/icons/social/instagram.webp";
import linkedin from "assets/icons/social/linkedin.webp";
import x from "assets/icons/social/x.webp";
import { APP_NAME } from "constants/env";
import { LinkIcon, MailIcon, ShareIcon } from "lucide-react";
import { Image } from "./image";

interface IShareButton {
  orgName: string;
  url: string;
  classes?: string;
}

interface IMenuItem {
  name: string;
  icon: JSX.Element;
  getShareLink: (props: IShareButton) => string;
}

export function ShareButton({ classes = "", ...p }: IShareButton) {
  const menuItems: IMenuItem[] = [
    {
      name: "Facebook",
      icon: <Image src={facebook} width={18} alt="letter F" />,
      getShareLink: ($) => {
        return `https://www.facebook.com/dialog/share?app_id=1286913222079194&display=popup&href=${encodeURIComponent($.url)}`;
      },
    },
    {
      name: "Twitter",
      icon: <Image src={x} width={14} alt="letter X" />,
      getShareLink: ($) => {
        const text = `Please support ${$.orgName} ${$.url} via @betterdotgiving`;
        return `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
      },
    },
    {
      name: "LinkedIn",
      icon: <Image src={linkedin} width={20} alt="letters i & n" />,
      getShareLink: ($) => {
        const text = `Please support ${$.orgName} ${$.url} via @${APP_NAME.toLowerCase()}`;
        return `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`;
      },
    },
    {
      name: "Instagram",
      icon: <Image src={instagram} width={14} alt="rounded corner camera" />,
      getShareLink: ($) =>
        `https://www.instagram.com/?url=${encodeURIComponent($.url)}`,
    },
    {
      name: "Email",
      icon: <MailIcon size={16} />,
      getShareLink: ($) =>
        `mailto:?subject=${encodeURIComponent(`Support ${$.orgName}`)}`,
    },
  ];

  return (
    <Menu as="div" className={classes}>
      <MenuButton className="focus:outline-none text-blue-d1 hover:text-blue-d2 transition-colors duration-200">
        <ShareIcon size={20} />
      </MenuButton>
      <MenuItems
        transition
        anchor="bottom"
        className="z-10 mt-2 grid grid-cols-2 w-max p-3 rounded-lg bg-white shadow-xl shadow-black/5 transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        {menuItems.map((item) => (
          <MenuItem key={item.name}>
            <a
              href={item.getShareLink({
                orgName: p.orgName,
                url: p.url,
              })}
              target="_blank"
              rel="noopener noreferrer"
              className={
                "hover:bg-gray-l4 flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:text-gray-900"
              }
            >
              {item.icon}
              <span className="text-sm font-heading">{item.name}</span>
            </a>
          </MenuItem>
        ))}
        <MenuItem>
          <button
            onClick={() => {
              navigator.clipboard.writeText(p.url);
            }}
            className={
              "hover:bg-gray-l4 border-t border-gray-l4 text-sm col-span-full flex items-center gap-3 w-full px-3 py-2 rounded-md text-gray-d2 hover:text-gray-900"
            }
          >
            <LinkIcon size={16} />
            Copy link
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
