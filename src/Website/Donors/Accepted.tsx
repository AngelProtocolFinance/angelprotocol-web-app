import bnbIcon from "assets/images/bnb-logo.png";
import ethIcon from "assets/images/ethereum-eth-logo.png";
import lunaIcon from "assets/images/terra-luna-logo.png";
import ustIcon from "assets/images/terra_usd.png";
import useObserve from "hooks/useObserver";
import transitionIn, { Direction } from "helpers/transitionIn";

const supportedCurrencies = [ustIcon, lunaIcon, ethIcon, bnbIcon];
export default function Accepted() {
  const { ref, isVisible } = useObserve({ threshold: 0.5 });
  return (
    <section
      ref={ref}
      className="bg-gradient-to-tr from-blue-accent to-angel-blue  grid lg:items-center grid-rows-a1 grid-cols-1 lg:grid-cols-2 lg:grid-rows-1 lg:h-info p-8  justify-items-center"
    >
      <div className="grid grid-cols-4 lg:grid-cols-2 gap-5 lg:gap-10 items-center justify-between">
        {supportedCurrencies.map((icon, i) => (
          <img
            key={i}
            src={icon}
            alt=""
            className={`${transitionIn(
              isVisible,
              Direction.fromLeft
            )} p-4 w-20 lg:w-40 lg:p-10 rounded-sm mb-4 lg:mb-0 bg-white/80 rounded-full shadow-xl`}
          />
        ))}
      </div>
      <div className="justify-self-center">
        <article
          className={`${transitionIn(
            isVisible,
            Direction.fromRight
          )} justify-self-center lg:justify-self-start max-w-2xl mt-5 lg:mt-0 lg:pl-2`}
        >
          <h3 className="text-center uppercase text-2xl sm:text-3xl font-bold text-white font-body mb-3 relative transition-all">
            Accepted Cryptocurrency
          </h3>
          <p className="text-center text-white-grey mb-3 text-xl">
            Angel Protocol currently accepts donations to charitable
            organizations in multiple cryptocurrencies. Our team is working to
            expand our donation capabilities to include even more
            cryptocurrencies.
          </p>
        </article>
      </div>
    </section>
  );
}
