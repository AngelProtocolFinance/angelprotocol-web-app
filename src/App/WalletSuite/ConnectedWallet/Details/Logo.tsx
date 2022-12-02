import { useState } from "react";
import ContentLoader from "components/ContentLoader";
import LogoPlaceholder from "components/LogoPlaceholder";

type Props = {
  src?: string;
  className?: string;
};

export default function Logo({ src, className }: Props) {
  const [isLoading, setLoading] = useState(!!src);

  return (
    <>
      {isLoading && <ContentLoader className={`${className} rounded-full`} />}
      {!src && (
        <LogoPlaceholder
          classes={{ container: className, icon: "w-1/2 h-1/2" }}
        />
      )}
      {!!src && (
        <img
          src={src}
          className={`${className} object-contain border border-gray-l2 dark:border-bluegray rounded-full ${
            isLoading ? "hidden" : ""
          }`}
          alt=""
          onLoad={() => setLoading(false)}
        />
      )}
    </>
  );
}
