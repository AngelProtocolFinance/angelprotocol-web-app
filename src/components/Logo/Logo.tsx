import { useState } from "react";
import ContentLoader from "components/ContentLoader";
import LogoPlaceholder from "./LogoPlaceholder";

type Props = { src?: string; className?: string };

export default function Logo({ src, className }: Props) {
  const [isLoading, setLoading] = useState(true);

  return !src ? (
    <LogoPlaceholder className={className} />
  ) : (
    <>
      {isLoading && <ContentLoader className={`${className} rounded-full`} />}
      <img
        src={src}
        className={`${className} object-contain border border-prim rounded-full ${
          isLoading ? "hidden" : ""
        }`}
        alt=""
        onLoad={() => setLoading(false)}
      />
    </>
  );
}
