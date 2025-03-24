import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import facebook from "assets/icons/social/facebook.webp";
import instagram from "assets/icons/social/instagram.webp";
import linkedin from "assets/icons/social/linkedin.webp";
import reddit from "assets/icons/social/reddit.svg";
import whatsapp from "assets/icons/social/whatsapp.svg";
import x from "assets/icons/social/x.webp";
import youtube from "assets/icons/social/youtube.webp";
import { LinkIcon, MailIcon, ShareIcon } from "lucide-react";
import Image from "./image";

interface IShareButton {
  organization: string;
  url: string;
  platform: string;
  classes?: string;
}

interface IMenuItem {
  name: string;
  icon: JSX.Element;
  getShareLink: (props: IShareButton) => string;
}

export function ShareButton({ classes = "", ...p }: IShareButton) {
  const shareText = `Please support ${p.organization} ${p.url} via @${p.platform}`;

  const menuItems: IMenuItem[] = [
    {
      name: "Facebook",
      icon: <Image src={facebook} width={18} alt="letter F" />,
      getShareLink: () =>
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(p.url)}&quote=${encodeURIComponent(shareText)}`,
    },
    {
      name: "Twitter",
      icon: <Image src={x} width={14} alt="letter X" />,
      getShareLink: () =>
        `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
    },
    {
      name: "LinkedIn",
      icon: <Image src={linkedin} width={20} alt="letters i & n" />,
      getShareLink: () =>
        `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(p.url)}&title=${encodeURIComponent(shareText)}`,
    },
    {
      name: "Reddit",
      icon: <Image src={reddit} width={18} alt="alien head" />,
      getShareLink: () =>
        `https://www.reddit.com/submit?url=${encodeURIComponent(p.url)}&title=${encodeURIComponent(p.organization)}`,
    },
    {
      name: "WhatsApp",
      icon: <Image src={whatsapp} width={18} alt="green phone" />,
      getShareLink: () =>
        `https://wa.me/?text=${encodeURIComponent(shareText)}`,
    },
    {
      name: "Youtube",
      icon: <Image src={youtube} width={18} alt="red play button" />,
      getShareLink: () =>
        `instagram://share?text=${encodeURIComponent(shareText)}`,
    },
    {
      name: "Instagram",
      icon: <Image src={instagram} width={14} alt="rounded corner camera" />,
      getShareLink: () =>
        `https://www.youtube.com/share?url=${encodeURIComponent(p.url)}`,
    },
    {
      name: "Email",
      icon: <MailIcon size={16} />,
      getShareLink: () =>
        `mailto:?subject=${encodeURIComponent(`Check out ${p.organization}`)}&body=${encodeURIComponent(shareText)}`,
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareText);
  };

  return (
    <Menu as="div" className={classes}>
      <MenuButton className="text-blue-d1 hover:text-blue-d2 transition-colors duration-200">
        <ShareIcon size={20} />
      </MenuButton>
      <MenuItems
        transition
        anchor="bottom"
        className="mt-2 grid grid-cols-2 w-max p-3 rounded-lg bg-white shadow-xl shadow-black/5 transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        {menuItems.map((item) => (
          <MenuItem key={item.name}>
            <a
              href={item.getShareLink({
                organization: p.organization,
                url: p.url,
                platform: p.platform,
              })}
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:bg-gray-l4 flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:text-gray-900`}
            >
              {item.icon}
              <span className="text-sm font-heading">{item.name}</span>
            </a>
          </MenuItem>
        ))}
        <MenuItem>
          <button
            onClick={copyToClipboard}
            className={`hover:bg-gray-l4 border-t border-gray-l4 text-sm col-span-full flex items-center gap-3 w-full px-3 py-2 rounded-md text-gray-d2 hover:text-gray-900`}
          >
            <LinkIcon size={16} />
            Copy link
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
