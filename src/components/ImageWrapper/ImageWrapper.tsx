import placeHolderImage from "assets/images/home-banner.jpg";
import React, { useRef } from "react";

export default function ImageWrapper(
  props: React.ImgHTMLAttributes<HTMLImageElement>
) {
  const imageRef = useRef<HTMLImageElement>(null);
  const handleImageLoadError = () => {
    imageRef.current?.setAttribute("src", placeHolderImage);
  };
  return <img {...props} alt={props.alt} onError={handleImageLoadError} />;
}
