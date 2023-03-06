import { useState } from "react";
import ContentLoader from "../ContentLoader";
import ImagePlaceholder from "./ImagePlaceholder";

type Props = {
  src?: string;
  className?: string;
};

export default function Image({ src, className }: Props) {
  const [isLoading, setLoading] = useState(true);

  if (!src) {
    return (
      <ImagePlaceholder
        classes={{ container: className, icon: "w-1/2 h-1/2" }}
      />
    );
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
