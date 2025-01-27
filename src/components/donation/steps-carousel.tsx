import Image from "components/Image";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { type FC, useEffect, useState } from "react";
import checkout from "./screenshots/checkout.webp";
import form from "./screenshots/form.webp";
import result from "./screenshots/result.webp";

const screenshots = [form, checkout, result];

type Embla = NonNullable<UseEmblaCarouselType[1]>;

interface DotButtonProps {
  selected: boolean;
  onClick: () => void;
}

const DotButton: FC<DotButtonProps> = ({ selected, onClick }) => (
  <button
    className={`w-2 h-2 rounded-full border-blue-d1 border mx-1 transition-all ${
      selected ? "bg-blue-d1" : ""
    }`}
    type="button"
    onClick={onClick}
    aria-label="Navigation dot"
  />
);

interface StepsCarouselProps {
  classes?: string;
}

export function StepsCarousel({
  classes = "",
}: StepsCarouselProps): JSX.Element {
  const [ref, embla] = useEmblaCarousel({
    loop: false,
    align: "start",
    skipSnaps: false,
  });

  const [idx, setIdx] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!embla) return;
    const onInit = (mbl: Embla) => setSnaps(mbl.scrollSnapList());
    const onSelect = (mbl: Embla) => setIdx(mbl.selectedScrollSnap());
    onInit(embla);
    onSelect(embla);
    embla.on("reInit", onInit);
    embla.on("reInit", onSelect);
    embla.on("select", onSelect);

    return () => {
      embla.off("reInit", onInit);
      embla.off("reInit", onSelect);
      embla.off("select", onSelect);
    };
  }, [embla]);

  return (
    <div className={`${classes} relative pt-8`}>
      <div className="overflow-hidden" ref={ref}>
        <div className="flex">
          {screenshots.map((screenshot, idx) => (
            <div className="flex-[0_0_100%]" key={idx}>
              <Image
                src={screenshot}
                className="rounded-xl border border-gray-l4 overflow-clip"
                alt={`Step ${idx + 1}`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-1 left-0 right-0 flex justify-center">
        {snaps.map((_, i) => (
          <DotButton
            key={i}
            selected={i === idx}
            onClick={() => embla?.scrollTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
