import { useState } from "react";
import ContentLoader from "components/ContentLoader";
import ImagePlaceholder from "components/ImagePlaceholder";

type Props = {
  src?: string;
  className?: string;
};

export default function Image({ src, className }: Props) {
  const [isLoading, setLoading] = useState(!!src);

  return (
    <>
      {isLoading && <ContentLoader className={`${className} rounded-full`} />}
      {!src && (
        <ImagePlaceholder
          classes={{ container: className, icon: "w-1/2 h-1/2" }}
        />
      )}
      {!!src && (
        <img
          src={src}
          className={`${className} object-contain border border-prim rounded-full ${
            isLoading ? "hidden" : ""
          }`}
          alt=""
          onLoad={() => setLoading(false)}
        />
      )}
    </>
  );
}
