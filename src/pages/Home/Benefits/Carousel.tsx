import type { Benefit } from "content/benefits";
import { PreCta } from "./common";

type Props = { slides: Benefit[]; classes?: string };
const Carousel = ({ slides, classes = "" }: Props) => {
  return (
    <div className={`grid gap-5 font-body ${classes} px-8`}>
      {slides.map((slide, index) => {
        return (
          <div
            className={`${slide.cardBgClass} grid justify-items-center p-8 rounded-4xl md:rounded-5xl shadow-black/5 `}
            key={index}
          >
            <img src={slide.img} alt="logo" className="size-56 mb-8" />
            <p className="font-heading text-lg text-center md:text-xl text-black font-bold">
              {slide.title}
            </p>
            <p className="text-center md:text-lg text-black font-bold mb-3">
              {slide.title2}
            </p>
            <p className="md:text-xl text-center text-navy">
              {slide.description}
            </p>
          </div>
        );
      })}
      <PreCta classes="text-center max-w-3xl justify-self-center mt-8 text-xl px-4" />
    </div>
  );
};

export default Carousel;
