import ExtLink from "components/ExtLink";
import Icon from "components/Icon";
import { SocialMediaLink } from "../types";

type Props = { links: SocialMediaLink[] };

export default function Socials({ links }: Props) {
  return (
    <div className="flex items-center gap-4 md:gap-8">
      {links.map(({ title, icon, href }) => {
        return (
          <ExtLink
            key={`social-link-${icon.type}`}
            href={href}
            className="hover:text-blue-l1 active:text-blue transition ease-in-out duration-300"
          >
            <Icon type={icon.type} size={icon.size} title={title} />
          </ExtLink>
        );
      })}
    </div>
  );
}
