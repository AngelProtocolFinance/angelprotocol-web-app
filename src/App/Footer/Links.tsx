import { SECTIONS_DATA } from "./constants";

const linkStyles = "font-body font-semibold text-sm";

export default function Links() {
  return (
    <div className="grid grid-rows-2 grid-cols-2 gap-6 w-4/5 max-w-[38rem] md:grid-rows-1 md:grid-cols-4 lg:w-full">
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
    <a
      href={props.href}
      className={`${linkStyles} cursor-pointer hover:text-orange-l1 active:text-orange transition ease-in-out duration-300`}
    >
      {props.text}
    </a>
  ) : (
    <span className={linkStyles}>{props.text}</span>
  );
}
