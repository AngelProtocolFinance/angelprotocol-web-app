import trustedLogo from "assets/icons/trusted.svg";
import protectedLogo from "assets/icons/protected.svg";
import secureLogo from "assets/icons/secure.svg";

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

export default function Highlights() {
  return (
    <ul className="h-60 bg-blue-accent w-full grid grid-cols-3 place-items-center">
      {highlights.map(({ id, heading, icon, text }) => (
        <li key={id} className="grid grid-cols-highlight max-w-xs items-center">
          <img src={icon} alt="" className="w-28" />
          <article className="pl-3">
            <h3 className="font-bold text-white text-lg">{heading}</h3>
            <p className="text-white-grey">{text}</p>
          </article>
        </li>
      ))}
    </ul>
  );
}
