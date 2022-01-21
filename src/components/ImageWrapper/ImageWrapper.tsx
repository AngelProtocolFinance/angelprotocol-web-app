import ContentLoader from "components/ContentLoader/ContentLoader";
import { useState } from "react";

type Props = {
  src?: string;
  alt: string;
  classes: string;
  altSrc?: string;
  width?: string;
  height?: string;
};

export default function ImageWrapper(props: Props) {
  const [isLoading, setIsLoading] = useState(true);

  const removePlaceHolder = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <ContentLoader width={props.width} height={props.height} />}
      <img
        alt={props.alt}
        src={props.src || props.altSrc}
        className={`${props.classes} ${isLoading ? "hidden" : "block"}`}
        onLoad={removePlaceHolder}
        onError={removePlaceHolder}
      />
    </>
  );
}
