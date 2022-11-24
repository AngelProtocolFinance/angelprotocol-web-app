import ExtLink from "components/ExtLink";
import Icon from "components/Icon";
import { SOCIAL_MEDIA_LINKS } from "./constants";

export default function Socials() {
  return (
    <div className="flex items-center gap-4 md:gap-8">
      {Object.entries(SOCIAL_MEDIA_LINKS).map(([type, { iconType, link }]) => {
        return (
          <ExtLink
            key={type}
            href={link}
            className="hover:text-blue-l1 active:text-blue"
          >
            <Icon type={iconType} className="w-6 h-6" title={type} />
          </ExtLink>
        );
      })}
    </div>
  );
}
