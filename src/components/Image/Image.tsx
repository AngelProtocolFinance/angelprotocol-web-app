import { useRef, useState } from "react";
import ContentLoader from "../ContentLoader";
import ImagePlaceholder from "./ImagePlaceholder";

type Props = {
  src?: string;
  className?: string;
};

export default function Image({ src, className }: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const [isLoading, setLoading] = useState(!!src);

  if (!src) {
    return (
      <ImagePlaceholder
        classes={{ container: className, icon: "w-1/2 h-1/2" }}
      />
    );
  }

  const shouldLoad = !ref.current?.complete && isLoading;

  return (
    <>
      {shouldLoad && <ContentLoader className={className} />}
      <img
        ref={ref}
        src={src}
        className={`${className} object-contain ${shouldLoad ? "hidden" : ""}`}
        alt=""
        onLoad={() => setLoading(false)}
      />
    </>
  );
}
