import wingImage from "assets/images/angelprotocol-wings-wht.png";
import useObserve from "hooks/useObserver";
import transitionIn, { Direction } from "helpers/transitionIn";

export default function Banner() {
  const { ref, isVisible } = useObserve({ threshold: 0.5 });

  return (
    <section
      ref={ref}
      className="grid items-center bg-banner-charities bg-no-repeat w-full bg-cover bg-center lg:bg-top h-banner"
    >
      <div className="container mx-auto  grid grid-cols-1a items-center">
        <section
          className={`max-w-3xl p-5 ${transitionIn(
            isVisible,
            Direction.fromLeft
          )}`}
        >
          <h1 className="font-semibold text-3xl sm:text-4xl sm:leading-snug md:text-5xl text-white md:leading-normal">
            Think that endowments are too complex for your charity?
            <span className="block text-angel-orange font-bold">
              Meet Angel Protocol
            </span>
          </h1>
        </section>
        <img
          src={wingImage}
          alt=""
          className={`hidden lg:w-80 lg:block ${transitionIn(
            isVisible,
            Direction.fromRight
          )}`}
        />
      </div>
    </section>
  );
}
