import { sections } from "./constants";

export default function Links() {
  return (
    <div
      className={`grid grid-cols-${sections.length} gap-3 xl:gap-6 max-w-2xl`}
    >
      {sections.map((section) => (
        <div
          key={section.title}
          className="flex flex-col items-start pb-5 gap-2 xl:gap-4"
        >
          <h6 className="font-heading font-bold text-sm xl:text-base uppercase">
            {section.title}
          </h6>
          <div className="flex flex-col items-start h-full">
            {section.links.map((link) => {
              const commonStyle = "font-sans text-xs xl:text-sm";
              return link.href ? (
                <a
                  key={link.text}
                  href={link.href}
                  className={`${commonStyle} cursor-pointer`}
                >
                  {link.text}
                </a>
              ) : (
                <span key={link.text} className={commonStyle}>
                  {link.text}
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
