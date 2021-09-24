import useObserve from "hooks/useObserver";
import transitionIn, { Direction } from "../../helpers/transitionIn";
import unsdgPoster from "assets/images/unsdg_poster.png";

export default function Alignment() {
  const { ref, isVisible } = useObserve({ threshold: 0.5 });
  return (
    <section
      ref={ref}
      className="bg-gradient-to-bl from-blue-accent to-angel-blue grid lg:items-center grid-rows-a1 grid-cols-1 lg:grid-cols-2 lg:grid-rows-1 lg:h-info p-8  justify-items-end "
    >
      <div className="justify-self-center">
        <img
          src={unsdgPoster}
          alt=""
          className={`${transitionIn(
            isVisible,
            Direction.fromLeft
          )} w-video:sm rounded-sm shadow-lg mb-4 lg:mb-0`}
        />
      </div>
      <article
        className={`${transitionIn(
          isVisible,
          Direction.fromRight
        )} justify-self-center lg:justify-self-start max-w-2xl mt-5 lg:mt-0 lg:pl-4`}
      >
        <h3
          className={`text-xl sm:text-2xl font-semibold text-white font-body mb-3 relative transition-all`}
        >
          Alignment to the United Nations Sustainable Development Goals
        </h3>
        <p className={`text-white-grey mb-3 text-base lg:text-lg`}>
          We are passionate about making the most impact and doing it
          sustainably. Rather than creating our own charitable interest
          categories for donors to choose from, all charities in our donor
          marketplace are aligned to one of the 17 United Nations Sustainable
          Development Goals (UN SDGs).
        </p>
        <p className={`text-white-grey mb-3 text-base lg:text-lg`}>
          The UN SDGs are goals that layout a blueprint for peace and prosperity
          for people and the planet, now and into the future.
        </p>
      </article>
    </section>
  );
}
