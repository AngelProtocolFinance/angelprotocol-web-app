import { useState } from "react";
import ContentLoader from "components/ContentLoader";
import LogoPlaceholder from "./LogoPlaceholder";

type Props = { isSrcLoading?: boolean; src?: string; className?: string };

export default function Logo({ isSrcLoading = false, src, className }: Props) {
  const [isLoading, setLoading] = useState(true);

  if (!isSrcLoading && !src) {
    return <LogoPlaceholder className={className} />;
  }

  return (
    <>
      {isLoading && <ContentLoader className={`${className} rounded-full`} />}
      {!isSrcLoading && (
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
