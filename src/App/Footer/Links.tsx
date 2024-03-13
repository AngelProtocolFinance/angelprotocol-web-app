import { Link } from "react-router-dom";
import { LinkGroup } from "../types";

const linkStyles = "font-semibold text-xs";

export default function Links({ groups }: { groups: LinkGroup[] }) {
  return (
    <div className="grid grid-rows-2 grid-cols-2 gap-4 w-4/5 max-w-[38rem] md:grid-rows-1 md:grid-cols-4 lg:w-full">
      {groups.map(({ title, links }) => (
        <div key={title} className="flex flex-col items-start gap-4">
          <p className="font-heading text-sm font-bold uppercase leading-6">
            {title}
          </p>
          <div className="flex flex-col items-start h-full gap-1">
            {links.map((link) => (
              <_Link key={link.text} {...link} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function _Link(props: { text: string; href?: string }) {
  return props.href ? (
    <Link to={props.href} className={`${linkStyles} hover:underline`}>
      {props.text}
    </Link>
  ) : (
    <span className={linkStyles}>{props.text}</span>
  );
}
