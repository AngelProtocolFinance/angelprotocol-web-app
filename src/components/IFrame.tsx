import { useEffect, useState } from "react";
import Loader from "./Loader";

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
        <div className={className}>
          <Loader
            bgColorClass="bg-blue dark:bg-white"
            gapClass="gap-2"
            widthClass="w-4"
          />
        </div>
      )}
      <iframe
        {...rest}
        src={src}
        title={title}
        className={`${isLoading ? "hidden" : ""} ${className}`}
        onLoad={(e) => {
          onLoad && onLoad(e);
          setLoading(false);
        }}
      ></iframe>
    </>
  );
}
