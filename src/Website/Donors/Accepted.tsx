import useObserve from "hooks/useObserver";
import transitionIn, { Direction } from "../../helpers/transitionIn";
import ustIcon from "assets/images/terra_usd.png";

export default function Accepted() {
  const { ref, isVisible } = useObserve({ threshold: 0.5 });
  return (
    <section
      ref={ref}
      className="bg-gradient-to-tr from-blue-accent to-angel-blue  grid lg:items-center grid-rows-a1 grid-cols-1 lg:grid-cols-2 lg:grid-rows-1 lg:h-info p-8  justify-items-center"
    >
      <img
        src={ustIcon}
        alt=""
        className={`${transitionIn(
          isVisible,
          Direction.fromLeft
        )} p-4 w-28 lg:w-60 lg:p-10 rounded-sm mb-4 lg:mb-0 bg-white  rounded-full bg-opacity-80 shadow-xl`}
      />
      <div className="justify-self-center">
        <article
          className={`${transitionIn(
            isVisible,
            Direction.fromRight
          )} justify-self-center lg:justify-self-start max-w-2xl mt-5 lg:mt-0 lg:pl-2`}
        >
          <h3 className="uppercase text-2xl sm:text-3xl font-bold text-white font-body mb-3 relative transition-all">
            Accepted Cryptocurrency
          </h3>
          <p className="text-white-grey mb-3 text-xl">
            Angel Protocol currently accepts donations to charitable
            organizations in TerraUSD <span className="font-bold">UST</span>.
            Our team is working to offer donation capability for other
            cryptocurrencies.
          </p>
        </article>
      </div>
    </section>
  );
}
