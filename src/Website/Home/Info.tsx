import useObserve from "hooks/useObserver";
import transitionIn, { Direction } from "../../helpers/transitionIn";
import AngelVid from "./AngelVid";

export default function Info() {
  const { ref, isVisible } = useObserve({ threshold: 0.5 });
  return (
    <section
      ref={ref}
      className="grid lg:items-center grid-rows-2a grid-cols-1 lg:grid-cols-2 lg:grid-rows-1 lg:h-info p-8  justify-items-end "
    >
      <div className="justify-self-center">
        <AngelVid isVisible={isVisible} />
      </div>
      <article
        className={`${transitionIn(
          isVisible,
          Direction.fromRight
        )} justify-self-center lg:justify-self-start max-w-2xl mt-5 lg:mt-0 lg:pl-2`}
      >
        <h3 className="text-xl sm:text-2xl font-semibold text-blue-accent font-body mb-3 relative transition-all">
          Endowments are the future of giving
        </h3>
        <p className="text-angel-grey mb-3 leading-relaxed ">
          Less than 60% of charities have enough saved in their reserves to
          cover more than one year of operating costs. Angel Protocol plays a
          critical role in solving this challenge.
        </p>
        <p className="text-angel-grey leading-relaxed relative transition-all">
          Endowments are a powerful tool that charities use to grow their
          donations. However, traditional endowments can be expensive to set up,
          access, and maintain. Angel Protocol has developed a platform
          providing easy access to low-risk, high-yield endowments that provide
          charities financial freedom. Donors give once, and give forever.
        </p>
      </article>
    </section>
  );
}
