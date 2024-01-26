import { useEffect, useState } from "react";
import LoaderRing from "./LoaderRing";

type Props = React.IframeHTMLAttributes<HTMLIFrameElement>;

export default function IFrame({
  src,
  title,
  className = "",
  onLoad,
  ...rest
}: Props) {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => setLoading(true), [src]);

  return (
    <>
      {isLoading && (
        <div
          className={`${className} flex justify-center items-center gap-2`}
          style={{
            height: rest.height ? `${rest.height}px` : undefined,
            width: rest.width ? `${rest.width}px` : undefined,
          }}
        >
          <LoaderRing thickness={10} classes="w-8" />
          Loading...
        </div>
      )}
      <iframe
        {...rest}
        src={src}
        title={title}
        className={`${isLoading ? "hidden" : ""} ${className}`}
        onLoad={(e) => {
          onLoad?.(e);
          setLoading(false);
        }}
      />
    </>
  );
}
