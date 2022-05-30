import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
import React, { useEffect, useRef, useState } from "react";
import Icon, { IconTypes } from "components/Icon";
import { useModalContext } from "components/ModalContext/ModalContext";

export default function ImgCropper(props: {
  src: string;
  setCropedImage: (dataUrl: string) => void;
}) {
  const { closeModal } = useModalContext();
  const [error, setError] = useState<string>();
  const cropperRef = useRef<Cropper>();
  const imageRef = useRef<HTMLImageElement>(null);

  //init cropper
  useEffect(() => {
    //imageRef.current is available when this effect runs
    cropperRef.current = new Cropper(imageRef.current!, {
      aspectRatio: 4 / 1,
      viewMode: 1,
      zoomable: false,
      scalable: false,
    });

    return () => {
      setError(undefined);
    };
  }, []);

  function handleSave() {
    setError(undefined);
    if (cropperRef.current) {
      const dataUrl = cropperRef.current.getCroppedCanvas().toDataURL();
      props.setCropedImage(dataUrl);
      closeModal();
    }
  }

  return (
    <div className="grid grid-rows-a1 fixed-center z-20 max-w-[90vmax] max-h-[90vmin] border-2 rounded-sm">
      <div className="bg-white flex items-center justify-end gap-2 p-1">
        {error && (
          <p className="mr-auto text-red-400 font-mono text-xs">{error}</p>
        )}
        <Button iconType={"Save"} onClick={handleSave} />
        <Button iconType={"Close"} onClick={closeModal} />
      </div>
      <img ref={imageRef} src={props.src} className="w-full" alt="banner" />
    </div>
  );
}

type RB = React.ButtonHTMLAttributes<HTMLButtonElement>;
function Button({
  iconType,
  ...restProps
}: Omit<RB, "className" | "type"> & { iconType: IconTypes }) {
  return (
    <button
      {...restProps}
      type="button"
      className="text-angel-grey hover:text-angel-blue"
    >
      <Icon type={iconType} size={24} />
    </button>
  );
}
