import targetIcon from "assets/icons/08_marketing_idea.svg";
import checkIcon from "assets/icons/07_bank_check_payment.svg";
import futureIcon from "assets/icons/10_future_possibility.svg";
import lockIcon from "assets/icons/16_security_lock.svg";
import trackIcon from "assets/icons/market_analytics_dark.svg";
import receiptIcon from "assets/icons/09_signing_contract.svg";
import useObserve from "hooks/useObserver";
import transitionIn, { Direction } from "../../helpers/transitionIn";

export default function Specs() {
  const { ref, isVisible } = useObserve({ threshold: 0.15 });
  return (
    <section
      ref={ref}
      className="xl:container xl:mx-auto h-auto grid grid-rows-a1 justify-items-center text-blue-accent py-16 px-10"
    >
      <h3
        className={`${transitionIn(
          isVisible,
          Direction.fromFront
        )} font-semibold text-xl sm:text-2xl md:text-3xl max-w-5xl text-center`}
      >
        We provide the tools for your charity to achieve financial
        sustainability through endowments leveraging decentralized finance.
      </h3>
      <ul
        className={`${transitionIn(
          isVisible,
          Direction.fromBottom
        )} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-20 mt-16`}
      >
        {specs.map(({ id, heading, icon, text }) => (
          <li
            key={id}
            className="max-w-md grid justify-items-center grid-rows-a1 items-start 2xl:grid-cols-a1"
          >
            <img
              src={icon}
              alt=""
              className="w-24 h-24 mb-4 2xl:self-center 2xl:mr-4"
            />
            <article className="grid items-start 2xl:grid-rows-a1 2xl:items-center">
              <h3 className="text-xl font-bold text-angel-grey sm:text-2xl mb-2 text-center 2xl:text-left">
                {heading}
              </h3>
              <p className="text-angel-grey font-heading font-light text-center 2xl:text-left">
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
    heading: "Endowment Goal",
    icon: targetIcon,
    text: "Identify how much your endowment will need to raise in order to cover your charity’s operating costs into perpetuity and choose the appropriate investment strategy.",
  },
  {
    id: 2,
    heading: "Investment Policy",
    icon: checkIcon,
    text: "Our endowments come with a ready-made investment policy for your charity to share with its board or stakeholders.",
  },
  {
    id: 3,
    heading: "No Management Needed",
    icon: futureIcon,
    text: "Unlike most endowments, there is no need for a fund manager. Your endowment earns high-yield through a low-risk savings product powered by decentralized finance.",
  },
  {
    id: 4,
    heading: "Security",
    icon: lockIcon,
    text: "Your endowment is protected through blockchain technology with optional insurance plans to recover assets in case of cybersecurity attack.",
  },
  {
    id: 5,
    heading: "Donation Tracking",
    icon: trackIcon,
    text: "You’ll have access to all donations made to your endowment, including donor information, amounts, and provided contact information.",
  },
  {
    id: 6,
    heading: "Donation Receipts",
    icon: receiptIcon,
    text: "Donors are provided with simple transaction receipts. Our team is working on an advanced tool to allow your charity to issue donation receipts.",
  },
];
