import { useState } from "react";
import ContentLoader from "../ContentLoader";
import ImagePlaceholder from "./ImagePlaceholder";

type Props = {
  src?: string;
  className?: string;
};

export default function Image({ src, className }: Props) {
  const [isLoading, setLoading] = useState(!!src);

  if (!src) {
    return <ImagePlaceholder className={className} />;
  }

  return (
    <>
      {isLoading && <ContentLoader className={className} />}
      <img
        src={src}
        className={`${className} object-contain ${isLoading ? "hidden" : ""}`}
        alt=""
        onLoad={() => setLoading(false)}
      />
    </>
  );
}
