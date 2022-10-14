import Icon from "components/Icon";
import { SOCIAL_MEDIA_LINKS } from "../constants";

export default function Socials() {
  return (
    <div className="flex items-center gap-8">
      {SOCIAL_MEDIA_LINKS.map(({ iconType, link, title }) => {
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
  );
}
