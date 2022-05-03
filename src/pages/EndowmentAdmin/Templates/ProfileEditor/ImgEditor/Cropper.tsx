import { useState } from "react";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export default function Cropper(props: { src: string }) {
  const [crop, setCrop] = useState<Crop>();
  return (
    <div className="fixed-center max-w-lg z-20">
      <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
        <img src={props.src} />
      </ReactCrop>
    </div>
  );
}
