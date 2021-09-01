import donorIcon from "assets/icons/administrator.svg";
import setupIcon from "assets/icons/rocket.svg";
import lowCostIcon from "assets/icons/piggy_bank.svg";
import mgmtIcon from "assets/icons/gear.svg";

const specs = [
  {
    id: 1,
    heading: "Attract new donors",
    icon: donorIcon,
    text: "Cryptocurrency investors have limited platforms to make donations. We are scaling across various cryptocurrencies to bring your charity new donors who are looking to make a sustainable impact.",
  },
  {
    id: 2,
    heading: "Easy setup",
    icon: setupIcon,
    text: "Our team of experts are here to answer any questions that your charity has about decentralized financial products, from accepting donations, to converting donations to USD. We support you through the entire setup.",
  },
  {
    id: 3,
    heading: "Low cost",
    icon: lowCostIcon,
    text: "No monthly fees and no setup costs. We leverage the low-cost of decentralized finance and pass along those savings to you.",
  },
  {
    id: 4,
    heading: "Minimal management",
    icon: mgmtIcon,
    text: "Your endowment is automatically leveraging the highest yield, low-risk decentralized financial products. There’s no need for a fund manager and we provide the investment policy. Your charity dashboard will provide all the information you need.",
  },
];

export default function Specs() {
  return (
    <section className="h-specs grid grid-rows-specs justify-items-center mt-20 font-semibold text-blue-accent">
      <h2 className="text-3xl max-w-5xl text-center">
        Angel Protocol enables your charity to thrive from decentralized
        financial products, without the complexity
      </h2>
      <ul className="grid grid-cols-2 grid-rows-2 items-start justify-items-center gap-16 mt-16">
        {specs.map(({ id, heading, icon, text }) => (
          <li key={id} className="grid grid-cols-highlight  items-start">
            <img src={icon} alt="" className="w-28" />
            <article className="pl-3 max-w-sm">
              <h3 className="font-bold text-angel-grey text-2xl ">{heading}</h3>
              <p className="text-angel-grey font-heading font-light">{text}</p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
