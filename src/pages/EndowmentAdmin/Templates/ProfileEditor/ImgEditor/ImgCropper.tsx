import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
import { useEffect, useRef } from "react";

export default function ImgCropper(props: {
  src: string;
  saveCroppedImageHandler: () => void;
}) {
  const imageRef = useRef<HTMLImageElement>(null);

  //init cropper
  useEffect(() => {
    //ref is available when this effect runs
    const cropper = new Cropper(imageRef.current!, {
      aspectRatio: 4 / 1,
      viewMode: 1,
      zoomable: false,
      scalable: false,
    });
  }, []);

  return (
    <div className="fixed-center z-20 max-w-[90vmax] max-h-[90vmin] border">
      <img ref={imageRef} src={props.src} className="w-full" />
    </div>
  );
}
