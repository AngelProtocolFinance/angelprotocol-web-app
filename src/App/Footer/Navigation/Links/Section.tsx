import { SectionProps } from "./types";

const linkStyles = "font-body text-xs xl:text-sm";

export default function Section({ title, links }: SectionProps) {
  return (
    <div key={title} className="flex flex-col items-start pb-5 gap-2 xl:gap-4">
      <h6 className="font-heading font-bold text-sm xl:text-base uppercase">
        {title}
      </h6>
      <div className="flex flex-col items-start h-full">
        {links.map((link) => (
          <Link {...link} />
        ))}
      </div>
    </div>
  );
}

function Link(props: { text: string; href?: string }) {
  return props.href ? (
    <a
      key={props.text}
      href={props.href}
      className={`${linkStyles} cursor-pointer`}
    >
      {props.text}
    </a>
  ) : (
    <span key={props.text} className={linkStyles}>
      {props.text}
    </span>
  );
}
