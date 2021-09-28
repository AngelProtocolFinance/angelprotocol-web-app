import yellowBoatIcon from "assets/images/yellow_boat.png";
import useObserve from "hooks/useObserver";
import transitionIn, { Direction } from "../../helpers/transitionIn";

export default function Testimonials() {
  const { ref, isVisible } = useObserve({ threshold: 1 });
  return (
    <section
      ref={ref}
      className="h-auto md:h-96 grid justify-items-center px-5"
    >
      <h3
        className={`${transitionIn(
          isVisible,
          Direction.fromBottom
        )} text-3xl text-blue-accent mt-16 text-center`}
      >
        "Angel Protocol is a revolutionary idea for sustainable giving and
        sustainable impact"
      </h3>
      <div className="grid justify-items-center content-start mb-5 md:mb-0">
        <img className="w-32 animate-bounce" src={yellowBoatIcon} alt="" />
        <p className="text-center text-2xl font-semibold mb-2 text-angel-grey">
          Jay Jaboneta
        </p>
        <p className="text-center text-xl text-angel-grey">
          Yellow Boat of Hope Foundation
        </p>
      </div>
    </section>
  );
}
