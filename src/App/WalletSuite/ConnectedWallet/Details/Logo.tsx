import { useState } from "react";
import ContentLoader from "components/ContentLoader";

type Props = {
  src?: string;
  className?: string;
};

export default function Logo({ src, className }: Props) {
  const [isLoading, setLoading] = useState(!!src);

  return (
    <>
      {isLoading && <ContentLoader className={`${className} rounded-full`} />}
      <img
        src={src}
        className={`${className} object-contain border border-gray-l2 dark:border-bluegray rounded-full ${
          isLoading ? "hidden" : ""
        }`}
        alt=""
        onLoad={() => setLoading(false)}
      />
    </>
  );
}
