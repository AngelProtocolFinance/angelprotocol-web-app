import { SectionProps } from "./types";

const linkStyles = "font-body text-xs xl:text-sm";

export default function Section({ title, links }: SectionProps) {
  return (
    <div key={title} className="flex flex-col items-start pb-5 gap-2 xl:gap-4">
      <h6 className="font-heading font-bold text-sm xl:text-base uppercase">
        {title}
      </h6>
      <div className="flex flex-col items-start h-full">
        {links.map((link) => {
          return link.href ? (
            <a
              key={link.text}
              href={link.href}
              className={`${linkStyles} cursor-pointer`}
            >
              {link.text}
            </a>
          ) : (
            <span key={link.text} className={linkStyles}>
              {link.text}
            </span>
          );
        })}
      </div>
    </div>
  );
}
