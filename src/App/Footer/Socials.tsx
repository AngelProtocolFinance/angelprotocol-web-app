import ExtLink from "components/ExtLink";
import Icon from "components/Icon";
import type { SocialMediaLink } from "../types";

type Props = { links: SocialMediaLink[] };

export default function Socials({ links }: Props) {
  return (
    <div className="flex items-center gap-3 md:gap-6">
      {links.map(({ title, icon, href }) => {
        return (
          <ExtLink
            key={`social-link-${icon.type}`}
            href={href}
            className="hover:scale-110 active:scale-110"
          >
            <Icon type={icon.type} size={icon.size} title={title} />
          </ExtLink>
        );
      })}
    </div>
  );
}
