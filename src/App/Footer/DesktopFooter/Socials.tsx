import Icon from "components/Icon";
import { SOCIAL_MEDIA_LINKS } from "../constants";

export default function Socials() {
  return (
    <div className="flex items-center gap-8">
      {Object.entries(SOCIAL_MEDIA_LINKS).map(([type, { iconType, link }]) => {
        return (
          <a
            key={type}
            href={link}
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-l1 active:text-blue"
          >
            <Icon type={iconType} className="w-6 h-6" title={type} />
          </a>
        );
      })}
    </div>
  );
}
