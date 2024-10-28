import type { Benefit } from "content/benefits";

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
      <p className="text-center max-w-3xl justify-self-center mt-8 text-xl px-4">
        We pride ourselves in helping fellow nonprofits like yours save money
        with free donation processing, save time by handling all admin &
        reporting work, and save for your future with simple but powerful
        high-yield savings and investment options.
      </p>
    </div>
  );
};

export default Carousel;
