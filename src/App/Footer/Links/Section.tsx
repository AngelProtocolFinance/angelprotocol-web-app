import { SectionProps } from "./types";

export default function Section({ title, links }: SectionProps) {
  return (
    <div className="flex flex-col items-start gap-4">
      <h6 className="font-heading font-black text-base uppercase">{title}</h6>
      <div className="flex flex-col items-start h-full gap-1">
        {links.map((link) => (
          <Link key={link.text} {...link} />
        ))}
      </div>
    </div>
  );
}

const linkStyles = "font-body font-semibold text-sm";

function Link(props: { text: string; href?: string }) {
  return props.href ? (
    <a
      href={props.href}
      rel="noreferrer"
      className={`${linkStyles} cursor-pointer`}
    >
      {props.text}
    </a>
  ) : (
    <span className={linkStyles}>{props.text}</span>
  );
}
