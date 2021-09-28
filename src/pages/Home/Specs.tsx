import donorIcon from "assets/icons/administrator.svg";
import setupIcon from "assets/icons/rocket.svg";
import lowCostIcon from "assets/icons/piggy_bank.svg";
import mgmtIcon from "assets/icons/gear.svg";
import useObserve from "hooks/useObserver";
import transitionIn, { Direction } from "../../helpers/transitionIn";

export default function Specs() {
  const { ref, isVisible } = useObserve({ threshold: 0.2 });
  return (
    <section
      ref={ref}
      className="grid grid-rows-a1 justify-items-center text-blue-accent px-10 py-16"
    >
      <h3
        className={`${transitionIn(
          isVisible,
          Direction.fromDot
        )} font-semibold text-xl sm:text-2xl md:text-3xl max-w-5xl text-center`}
      >
        Angel Protocol enables your charity to thrive from decentralized
        financial products, without the complexity
      </h3>
      <ul
        className={`${transitionIn(
          isVisible,
          Direction.fromRight
        )} grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2  gap-16 mt-16`}
      >
        {specs.map(({ id, heading, icon, text }) => (
          <li
            key={id}
            className="grid grid-rows-a1 xl:grid-rows-1 xl:grid-cols-1a justify-items-center "
          >
            <img
              src={icon}
              alt=""
              className="w-24 h-24 mb-4 xl:mb-0 self-center"
            />
            <article className="xl:grid xl:grid-rows-a1 xl:pl-6 max-w-sm mt-2 lg:mt-0">
              <h3 className="text-center text-xl sm:text-2xl xl:text-left font-bold text-angel-grey mb-1">
                {heading}
              </h3>
              <p className="self-center text-center xl:text-left text-angel-grey font-heading font-light">
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
