import trustedLogo from "assets/icons/trusted.svg";
import protectedLogo from "assets/icons/protected.svg";
import secureLogo from "assets/icons/secure.svg";

export default function Highlights() {
  return (
    <ul className="h-auto lg:h-60 bg-blue-accent w-full grid grid-cols-1 sm:grid-cols-3 place-items-center gap-10 lg:gap-0 px-5 py-8 lg:py-0">
      {highlights.map(({ id, heading, icon, text }) => (
        <li
          key={id}
          className="grid grid-cols-1 justify-items-center lg:grid-cols-a1 max-w-xs items-center mb-10 sm:mb-0"
        >
          <img src={icon} alt="" className="w-28" />
          <article className="lg:pl-3">
            <h3 className="font-bold text-white text-lg text-center lg:text-left my-3 lg:my-0">
              {heading}
            </h3>
            <p className="text-white-grey text-center lg:text-left">{text}</p>
          </article>
        </li>
      ))}
    </ul>
  );
}

const highlights = [
  {
    id: 1,
    heading: "Trusted",
    icon: trustedLogo,
    text: "Founded with nonprofit leaders and improved through your feedback",
  },
  {
    id: 2,
    heading: "Protected",
    icon: protectedLogo,
    text: "We take security seriously. We also offer insurance to protect your assets.",
  },
  {
    id: 3,
    heading: "Secured",
    icon: secureLogo,
    text: "All funds are governed by open-source, audited smart contracts",
  },
];
