import Icon, { IconTypes } from "components/Icon";

export default function Socials(props: { classes?: string }) {
  return (
    <div className={`${props.classes || ""} flex justify-center items-center`}>
      {SOCIAL_MEDIA_LINKS.map(({ id, iconType, link, title }) => {
        return (
          <a
            key={id}
            href={link}
            target="_blank"
            rel="noreferrer"
            className={`text-zinc-50 hover:text-sky-400 active:text-sky-500 block mx-2 first:ml-0`}
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
    iconType: "Youtube",
    link: "https://www.youtube.com/channel/UCPYj_fooJCfc_tc52rPiw1w",
    title: "YouTube",
  },
  {
    id: 4,
    iconType: "Medium",
    link: "https://angelprotocol.medium.com",
    title: "Medium",
  },
  {
    id: 5,
    iconType: "Discord",
    link: "https://discord.gg/RhqA652ySA",
    title: "Discord",
  },
];
