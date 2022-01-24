import ContentLoader from "components/ContentLoader/ContentLoader";
import { useState } from "react";
import image from "assets/images/home-banner.jpg";

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
  const [error, setError] = useState(false);

  const removePlaceHolder = () => {
    setIsLoading(false);
  };

  const errorCallback = () => {
    setIsLoading(false);
    setError(true);
  };

  const imageUrl = error ? image : props.src;
  return (
    <>
      {isLoading && <ContentLoader width={props.width} height={props.height} />}
      <img
        alt={props.alt}
        src={imageUrl}
        className={`${props.classes} ${
          isLoading && !error ? "hidden" : "block"
        }`}
        onLoad={removePlaceHolder}
        onError={errorCallback}
      />
    </>
  );
}
