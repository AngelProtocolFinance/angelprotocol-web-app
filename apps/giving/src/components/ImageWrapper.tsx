import React, { useRef, useState } from "react";
import placeHolderImage from "assets/images/home-banner.jpg";
import Loader from "./Loader";

export default function ImageWrapper({
  className,
  ...rest
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [isLoading, setLoading] = useState(true);
  const imageRef = useRef<HTMLImageElement>(null);
  const handleImageLoadError = () => {
    imageRef.current?.setAttribute("src", placeHolderImage);
  };
  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <>
      <Loader
        bgColorClass="bg-white"
        widthClass="w-4"
        gapClass="gap-1"
        className={`${className} ${isLoading ? "block" : "hidden"}`}
      />
      <img
        {...rest}
        //setting src to undefined doesn't trigger load error
        src={rest.src || placeHolderImage}
        alt={rest.alt}
        className={`${className} ${isLoading ? "hidden" : "block"}`}
        onError={handleImageLoadError}
        onLoad={handleLoad}
      />
    </>
  );
}
