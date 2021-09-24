import useObserve from "hooks/useObserver";
import transitionIn, { Direction } from "../../helpers/transitionIn";
import growthImage from "assets/images/growth.png";

export default function Info() {
  const { ref, isVisible } = useObserve({ threshold: 0.5 });
  return (
    <section
      ref={ref}
      className="bg-gradient-to-bl from-blue-accent to-angel-blue grid lg:items-center grid-rows-2 grid-cols-1 lg:grid-cols-2 lg:grid-rows-1 lg:h-info p-8  justify-items-end "
    >
      <div className="justify-self-center">
        <img
          src={growthImage}
          alt=""
          className={`${transitionIn(
            isVisible,
            Direction.fromLeft
          )} w-96 rounded-sm shadow-lg mb-4 lg:mb-0`}
        />
      </div>
      <article
        className={`${transitionIn(
          isVisible,
          Direction.fromRight
        )} justify-self-center lg:justify-self-start max-w-2xl mt-5 lg:mt-0 lg:pl-2`}
      >
        <h3
          className={`text-xl sm:text-2xl font-semibold text-white font-body mb-3 relative transition-all uppercase`}
        >
          High-yield, low-risk
        </h3>
        <p className={`text-white-grey mb-3 text-xl`}>
          Angel Protocol leverages decentralized financial products and offers
          them to charities through a simple platform. Your endowment earns{" "}
          <span className="font-semibold">~20%</span> interest through a savings
          product and is held in a cryptocurrency that is pegged to the US
          Dollar, reducing the risk of crypto volatility.
        </p>
      </article>
    </section>
  );
}
