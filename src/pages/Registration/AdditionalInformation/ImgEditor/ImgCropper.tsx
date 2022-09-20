import { Dialog } from "@headlessui/react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
import React, { useCallback, useRef, useState } from "react";
import { useModalContext } from "contexts/ModalContext";
import Icon, { IconTypes } from "components/Icon";

export default function ImgCropper(props: {
  src: string;
  aspectRatio: number;
  setCropedImage: (blob: Blob) => void;
}) {
  const { closeModal } = useModalContext();
  const [error, setError] = useState<string>();
  const cropperRef = useRef<Cropper>();

  const imgRef = useCallback(
    (node: HTMLImageElement | null) => {
      if (node && !cropperRef.current) {
        cropperRef.current = new Cropper(node, {
          aspectRatio: props.aspectRatio,
          viewMode: 1,
          zoomable: false,
          scalable: false,
        });
      }
    },
    [props.aspectRatio]
  );

  function handleSave() {
    setError(undefined);
    if (cropperRef.current) {
      cropperRef.current.getCroppedCanvas().toBlob((blob) => {
        if (!blob) {
          setError("Cropping the file failed.");
        } else {
          props.setCropedImage(blob);
          closeModal();
        }
      });
    }
  }

  return (
    <Dialog.Panel className="grid grid-rows-[auto_1fr] fixed-center z-20 max-w-[90vmax] max-h-[90vmin] border-2 rounded-sm">
      <div className="bg-white flex items-center justify-end gap-2 p-1">
        {error && (
          <p className="mr-auto text-red-400 font-mono text-xs">{error}</p>
        )}
        <Button iconType={"Save"} onClick={handleSave} />
        <Button iconType={"Close"} onClick={closeModal} />
      </div>
      <img ref={imgRef} src={props.src} className="w-full" alt="banner" />
    </Dialog.Panel>
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
