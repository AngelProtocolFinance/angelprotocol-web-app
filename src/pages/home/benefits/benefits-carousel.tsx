import type { Benefit } from "content/benefits";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PreCta } from "./common";

type Props = { slides: Benefit[]; classes?: string };

const BenefitsCarousel = ({ slides, classes = "" }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    slidesToScroll: 1,
  });

  return (
    <div className={`grid relative ${classes}`}>
      <div className="overflow-hidden relative" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div key={index} className="flex-[0_0_100%] px-4">
              <div
                className={`grid justify-items-center py-14 px-10 rounded-5xl mx-auto max-w-3xl @4xl:max-w-4xl ${slide.cardBgClass}`}
              >
                <img
                  src={slide.img}
                  className="size-60 object-cover object-center"
                  alt="Visual representation of the benefit"
                />
                <p className="mt-6 text-2xl font-heading text-[#0D283A] w-full text-center font-bold">
                  {slide.title}
                </p>
                <p className="text-xl text-gray-d1 w-full text-center font-medium">
                  {slide.title2}
                </p>
                <p className="text-center text-balance text-lg mt-4 text-gray-d1">
                  {slide.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          className="p-4 bg-white text-blue-d1 rounded-full shadow-md z-10 absolute top-1/2 -translate-y-1/2 left-1/4"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          className="p-4 bg-white text-blue-d1 rounded-full shadow-md z-10 absolute top-1/2 -translate-y-1/2 right-1/4"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <PreCta classes="text-center max-w-4xl justify-self-center mt-8 text-2xl px-4" />

      <div className="absolute grid bottom-48 left-3/4 z-10 -rotate-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="41"
          height="40"
          viewBox="0 0 41 42"
          fill="none"
        >
          <g opacity="0.6">
            <path
              d="M31.8129 8.36675C29.6118 7.10827 27.2674 6.25922 24.7797 5.81961C22.292 5.38 19.7863 5.38443 17.2626 5.8329C14.2227 6.37311 11.6033 7.40033 9.40426 8.91456C7.20523 10.4288 5.64383 12.2492 4.72006 14.3759C4.56505 14.8016 4.33222 15.17 4.02158 15.4812C3.71094 15.7924 3.32619 15.9888 2.86734 16.0703C2.5232 16.1315 2.23002 16.0342 1.9878 15.7786C1.74558 15.523 1.66428 15.2175 1.74389 14.8621C2.45406 12.0908 4.17761 9.65138 6.91454 7.54383C9.65147 5.43628 12.9414 4.04106 16.7843 3.35815C19.48 2.8791 22.1578 2.84409 24.8176 3.25313C27.4774 3.66216 29.9965 4.49438 32.3749 5.74978L31.9683 3.64624C31.8992 3.28878 31.9639 2.97153 32.1625 2.69448C32.3611 2.41744 32.6468 2.24579 33.0196 2.17954C33.3924 2.11329 33.7233 2.17536 34.0123 2.36577C34.3012 2.55618 34.4802 2.83011 34.5493 3.18758L35.5858 8.54953C35.6761 9.01698 35.587 9.43812 35.3183 9.81295C35.0496 10.1878 34.6715 10.4185 34.184 10.5051L28.5917 11.4989C28.2189 11.5652 27.888 11.5031 27.5991 11.3127C27.3102 11.1223 27.1311 10.8483 27.062 10.4909C26.9929 10.1334 27.0577 9.81616 27.2563 9.53912C27.4549 9.26207 27.7406 9.09042 28.1134 9.02417L31.8129 8.36675ZM23.1803 38.0581C22.492 38.1804 21.8085 38.1739 21.1297 38.0386C20.451 37.9032 19.8227 37.6451 19.2448 37.2643L10.2625 31.3092C9.8886 31.0628 9.65061 30.714 9.54857 30.2629C9.44653 29.8117 9.52135 29.3931 9.77303 29.0071L9.87816 28.8604C10.252 28.3389 10.7326 27.9478 11.3199 27.687C11.9073 27.4262 12.518 27.3247 13.1521 27.3827L16.1428 27.6618L13.5357 14.1745C13.4453 13.707 13.5345 13.2859 13.8031 12.9111C14.0718 12.5362 14.4499 12.3055 14.9374 12.2189C15.425 12.1322 15.8642 12.2177 16.2551 12.4753C16.646 12.7329 16.8867 13.0955 16.977 13.5629L19.2094 25.1117L20.9301 24.806L19.9734 19.8565C19.883 19.389 19.9722 18.9679 20.2409 18.5931C20.5095 18.2182 20.8876 17.9875 21.3752 17.9009C21.8627 17.8142 22.3019 17.8997 22.6929 18.1573C23.0838 18.4149 23.3244 18.7775 23.4148 19.2449L24.3715 24.1944L26.0922 23.8886L25.4544 20.589C25.364 20.1215 25.4532 19.7004 25.7219 19.3255C25.9905 18.9507 26.3686 18.72 26.8562 18.6334C27.3437 18.5467 27.7829 18.6322 28.1739 18.8898C28.5648 19.1474 28.8054 19.51 28.8958 19.9774L29.5336 23.2771L31.2543 22.9713C31.1639 22.5038 31.2531 22.0827 31.5218 21.7079C31.7905 21.3331 32.1686 21.1023 32.6561 21.0157C33.1436 20.929 33.5828 21.0145 33.9738 21.2721C34.3647 21.5298 34.6053 21.8923 34.6957 22.3597L35.9713 28.9591C36.3221 30.7739 35.9485 32.4472 34.8504 33.9791C33.7524 35.511 32.257 36.4451 30.3642 36.7815L23.1803 38.0581Z"
              fill="#1C1B1F"
            />
          </g>
        </svg>
        <p className="font-gochi max-w-[70%] text-center text-lg font-medium text-[#111]">
          Scroll to know more
        </p>
      </div>
    </div>
  );
};

export default BenefitsCarousel;
