import donorIcon from "assets/icons/administrator.svg";
import setupIcon from "assets/icons/rocket.svg";
import lowCostIcon from "assets/icons/piggy_bank.svg";
import mgmtIcon from "assets/icons/gear.svg";

export default function Specs() {
  return (
    <section className="h-auto lg:h-specs grid grid-rows-a1 justify-items-center mt-16  text-blue-accent px-10 pb-10 lg:pb-0">
      <h3 className="font-semibold text-xl sm:text-2xl md:text-3xl max-w-5xl text-center">
        Angel Protocol enables your charity to thrive from decentralized
        financial products, without the complexity
      </h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 items-start justify-items-center gap-16 mt-16">
        {specs.map(({ id, heading, icon, text }) => (
          <li
            key={id}
            className="grid justify-items-center lg:grid-cols-1a items-start"
          >
            <img src={icon} alt="" className="w-28 mb-4 lg:mb-0" />
            <article className="lg:pl-6 max-w-sm mt-2 lg:mt-0">
              <h3 className="text-center text-xl sm:text-2xl lg:text-left font-bold text-angel-grey mb-1">
                {heading}
              </h3>
              <p className="text-center lg:text-left text-angel-grey font-heading font-light">
                {text}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

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
