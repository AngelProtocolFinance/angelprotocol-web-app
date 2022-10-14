import Icon, { IconTypes } from "components/Icon";

export default function Socials() {
  return (
    <div className="flex items-center gap-8">
      {SOCIAL_MEDIA_LINKS.map(({ id, iconType, link, title }) => {
        return (
          <a
            key={id}
            href={link}
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-l1 active:text-blue"
          >
            <Icon type={iconType} className="w-6 h-6" title={title} />
          </a>
        );
      })}
    </div>
  );
}

type SocialMediaLink = {
  id: number;
  iconType: IconTypes;
  link: string;
  title: string;
};

export const SOCIAL_MEDIA_LINKS: SocialMediaLink[] = [
  {
    id: 1,
    iconType: "Twitter",
    link: "https://twitter.com/angelprotocol",
    title: "Twitter",
  },
  {
    id: 2,
    iconType: "Telegram",
    link: "https://t.me/angelprotocoI",
    title: "Telegram",
  },
  {
    id: 3,
    iconType: "Discord",
    link: "https://discord.gg/RhqA652ySA",
    title: "Discord",
  },
  {
    id: 4,
    iconType: "Youtube",
    link: "https://www.youtube.com/channel/UCPYj_fooJCfc_tc52rPiw1w",
    title: "YouTube",
  },
  {
    id: 5,
    iconType: "Medium",
    link: "https://angelprotocol.medium.com",
    title: "Medium",
  },
  {
    id: 6,
    iconType: "FacebookCircle",
    link: "https://www.facebook.com/AngelProtocolFB/",
    title: "Facebook",
  },
  {
    id: 7,
    iconType: "Linkedin",
    link: "https://www.linkedin.com/company/angel-protocol/",
    title: "Linkedin",
  },
  {
    id: 8,
    iconType: "Instagram",
    link: "https://www.instagram.com/angelprotocol/",
    title: "Instagram",
  },
];
