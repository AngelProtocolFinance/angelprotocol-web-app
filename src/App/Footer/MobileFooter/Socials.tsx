import { SocialMedia } from "../types";
import Icon from "components/Icon";
import { SOCIAL_MEDIA_LINKS } from "../constants";

const FOOTER_SOCIAL_MEDIA: SocialMedia[] = [
  "Medium",
  "Discord",
  "Telegram",
  "Twitter",
  "YouTube",
];

export default function Socials() {
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <span className="font-heading font-bold text-xs text-center tracking-widest uppercase">
        Join our community
      </span>
      <div className="flex items-center gap-8">
        {SOCIAL_MEDIA_LINKS.filter((link) =>
          FOOTER_SOCIAL_MEDIA.includes(link.title)
        ).map(({ iconType, link, title }) => {
          return (
            <a
              key={title}
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
    </div>
  );
}
