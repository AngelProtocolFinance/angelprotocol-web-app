import { useState } from "react";
import ContentLoader from "components/ContentLoader";

type Props = {
  logo?: string;
  className?: string;
};

export default function Logo({ logo, className }: Props) {
  const [isLoading, setLoading] = useState(true);

  return (
    <>
      {isLoading && <ContentLoader className={`${className} rounded-full`} />}
      <img
        src={logo}
        className={`${className} object-contain border border-gray-l2 dark:border-bluegray rounded-full ${
          isLoading ? "hidden" : ""
        }`}
        alt=""
        onLoad={() => setLoading(false)}
      />
    </>
  );
}
