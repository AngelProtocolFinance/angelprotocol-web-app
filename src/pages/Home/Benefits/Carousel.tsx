import { Slide } from "./types";

type Props = { slides: Slide[]; classes?: string };
const Carousel = ({ slides, classes = "" }: Props) => {
  return (
    <div className={`grid gap-5 font-body ${classes} px-8`}>
      {slides.map((slide, index) => {
        return (
          <div
            className={`${slide.bgColorClass} grid justify-items-center p-8 rounded-4xl md:rounded-5xl shadow-black/5 `}
            key={index}
          >
            <img src={slide.img_src} alt="logo" className="size-56 mb-8" />
            <p className="text-[20px] text-center md:text-[28px] text-black font-bold mb-3">
              {slide.title}
            </p>
            <p className="md:text-xl text-center">{slide.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Carousel;
