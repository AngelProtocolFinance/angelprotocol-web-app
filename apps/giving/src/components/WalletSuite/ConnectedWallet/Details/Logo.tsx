import ContentLoader from "@giving/components/ContentLoader";
import LogoPlaceholder from "@giving/components/LogoPlaceholder";
import { useState } from "react";

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
