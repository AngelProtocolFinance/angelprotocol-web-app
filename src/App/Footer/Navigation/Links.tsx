export default function Links() {
  return (
    <div className="grid grid-cols-4 gap-3 xl:gap-6 max-w-2xl">
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
              const commonStyle = "font-body text-xs xl:text-sm";
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

type Section = {
  title: string;
  links: {
    text: string;
    href?: string;
  }[];
};

const sections: Section[] = [
  {
    title: "Products",
    links: [
      {
        text: "For Non-profit orgs.",
        href: "https://angelprotocol.io/non-profit-organizations/",
      },
      { text: "For Donors", href: "https://angelprotocol.io/donors/" },
      {
        text: "For Changemakers",
        href: "https://angelprotocol.io/changemakers/",
      },
      { text: "For Investors", href: "https://angelprotocol.io/investors/" },
      {
        text: "For CSR Partners",
        href: "https://angelprotocol.io/csr-partners/",
      },
    ],
  },
  {
    title: "About",
    links: [
      { text: "About us", href: "https://angelprotocol.io/about/" },
      {
        text: "Meet the team",
        href: "https://angelprotocol.io/about/#:~:text=MEET%20THE%20TEAM-,Operations,-DUFFY%20CASEY",
      },
      { text: "News", href: "https://angelprotocol.io/news/" },
      { text: "Stories", href: "https://angelprotocol.io/stories/" },
      { text: "Careers", href: "https://angelprotocol.io/careers/" },
    ],
  },
  {
    title: "Docs",
    links: [
      {
        text: "Litepaper",
        href: "https://angelprotocol.io/docs/litepaper-introduction/",
      },
      { text: "FAQs (coming soon)" },
      { text: "Technical doc (coming soon)" },
    ],
  },
  {
    title: "Legal",
    links: [
      {
        text: "Privacy policy",
        href: "https://angelprotocol.io/privacy-policy/",
      },
    ],
  },
];
