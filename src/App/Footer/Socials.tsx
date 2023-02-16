import { SocialMediaLink } from "../types";
import ExtLink from "components/ExtLink";
import Icon from "components/Icon";

type Props = { links: SocialMediaLink[] };

export default function Socials({ links }: Props) {
  return (
    <div className="flex items-center gap-4 md:gap-8">
      {links.map(({ title, iconType, href }) => {
        return (
          <ExtLink
            key={`social-link-${iconType}`}
            href={href}
            className="hover:text-blue-l1 active:text-blue transition ease-in-out duration-300"
          >
            <Icon type={iconType} className="w-6 h-6" title={title} />
          </ExtLink>
        );
      })}
    </div>
  );
}
