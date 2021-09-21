import useObserve from "hooks/useObserver";
import wingImage from "../../assets/images/angelprotocol-wings-wht.png";
import transitionIn, { Direction } from "./transitionIn";
import useTypeWriter from "./useTypeWritter";

export default function Banner() {
  const { ref, isVisible } = useObserve({ threshold: 0.5 });
  const [typedText, cursorShown] = useTypeWriter(
    [
      "have funding, forever.",
      "focus on impact.",
      "spend less on fundraising.",
    ],
    70,
    1000
  );

  return (
    <section
      ref={ref}
      className="grid items-center bg-banner bg-no-repeat w-full bg-cover h-banner"
    >
      <div className="container mx-auto  grid grid-cols-1a items-center">
        <section
          className={`max-w-3xl p-5 ${transitionIn(
            isVisible,
            Direction.fromTop
          )}`}
        >
          <h1 className="font-semibold text-3xl sm:text-4xl sm:leading-snug md:text-5xl text-white md:leading-normal">
            Simplified endowments that empower charities to{" "}
            <span
              className={`ml-1 inline font-bold text-angel-orange border-r-4 transition-all ${
                cursorShown ? "border-white-grey" : "border-transparent"
              }`}
            >
              {typedText}
            </span>
          </h1>
        </section>
        <img
          src={wingImage}
          alt=""
          className={`hidden lg:w-80 lg:block ${transitionIn(
            isVisible,
            Direction.fromBottom
          )}`}
        />
      </div>
    </section>
  );
}
