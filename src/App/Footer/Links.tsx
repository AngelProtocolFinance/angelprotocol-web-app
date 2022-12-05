import ExtLink from "components/ExtLink";
import { SECTIONS_DATA } from "./constants";

const linkStyles = "font-body font-semibold text-sm";

export default function Links() {
  return (
    <div className="grid grid-rows-2 grid-cols-2 gap-4 w-4/5 max-w-[38rem] md:grid-rows-1 md:grid-cols-4 lg:w-full">
      {SECTIONS_DATA.map(({ title, links }) => (
        <div key={title} className="flex flex-col items-start gap-4">
          <h6 className="font-heading font-black text-base uppercase">
            {title}
          </h6>
          <div className="flex flex-col items-start h-full gap-1">
            {links.map((link) => (
              <Link key={link.text} {...link} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Link(props: { text: string; href?: string }) {
  return props.href ? (
    <ExtLink href={props.href} className={`${linkStyles} cursor-pointer`}>
      {props.text}
    </ExtLink>
  ) : (
    <span className={linkStyles}>{props.text}</span>
  );
}
