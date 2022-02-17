import ContentLoader from "components/ContentLoader/ContentLoader";
import { useState } from "react";
import image from "assets/images/home-banner.jpg";

type Props = {
  src?: string;
  alt: string;
  classes: string;
  width?: string;
  height?: string;
  rounded?: boolean;
};

export default function ImageWrapper(props: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const removePlaceHolder = () => {
    setIsLoading(false);
    setError(false);
  };

  const errorCallback = () => {
    setIsLoading(false);
    setError(true);
  };

  const imageUrl = error ? image : props.src || image;
  return (
    <>
      {isLoading && (
        <ContentLoader
          width={props.width}
          height={props.height}
          rounded={props.rounded}
        />
      )}
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
