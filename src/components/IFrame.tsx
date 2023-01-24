import { useState } from "react";

type Props = React.IframeHTMLAttributes<HTMLIFrameElement>;

export default function IFrame({
  title,
  className = "",
  onLoad,
  ...rest
}: Props) {
  const [isLoading, setLoading] = useState(true);

  return (
    <iframe
      {...rest}
      title={title}
      className={`${isLoading ? "hidden" : ""} ${className}`}
      onLoad={(e) => {
        onLoad && onLoad(e);
        setLoading(false);
      }}
    ></iframe>
  );
}
