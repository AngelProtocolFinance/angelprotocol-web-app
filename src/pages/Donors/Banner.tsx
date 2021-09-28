import useObserve from "hooks/useObserver";
import wingImage from "../../assets/images/angelprotocol-wings-wht.png";
import transitionIn, { Direction } from "../../helpers/transitionIn";

export default function Banner() {
  const { ref, isVisible } = useObserve({ threshold: 0.5 });

  return (
    <section
      ref={ref}
      className="grid items-center bg-banner-donors bg-no-repeat w-full bg-cover bg-center h-banner"
    >
      <div className="container mx-auto  grid grid-cols-1a items-center">
        <section
          className={`max-w-3xl p-5 ${transitionIn(
            isVisible,
            Direction.fromBottom
          )}`}
        >
          <h1 className="uppercase font-bold text-4xl sm:text-5xl sm:leading-snug md:text-5xl text-white md:leading-normal">
            Give once,
            <span className="block text-angel-orange font-bold">
              Give forever
            </span>
          </h1>
        </section>
        <img
          src={wingImage}
          alt=""
          className={`hidden lg:w-80 lg:block ${transitionIn(
            isVisible,
            Direction.fromTop
          )}`}
        />
      </div>
    </section>
  );
}
