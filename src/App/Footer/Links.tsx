import { LITEPAPER } from "constants/urls";

const linkStyles = "font-body font-semibold text-sm";

export default function Links() {
  return (
    <div className="grid grid-rows-2 grid-cols-2 gap-6 w-4/5 max-w-[38rem] md:grid-rows-1 md:grid-cols-4 lg:w-full">
      {sections.map((section) => (
        <Section key={section.title} {...section} />
      ))}
    </div>
  );
}

type SectionProps = {
  title: string;
  links: {
    text: string;
    href?: string;
  }[];
};

function Section({ title, links }: SectionProps) {
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

const sections: SectionProps[] = [
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
      { text: "Litepaper", href: LITEPAPER },
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
