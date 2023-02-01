import { Dialog } from "@headlessui/react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
import { useCallback, useRef } from "react";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";

type Props = {
  preview: string;
  aspect: [number, number];
  onSave(blob: Blob | null): void;
};

export default function ImgCropper({ preview, aspect: [x, y], onSave }: Props) {
  const { closeModal } = useModalContext();

  const cropperRef = useRef<Cropper>();

  const imgRef = useCallback(
    (node: HTMLImageElement | null) => {
      if (node && !cropperRef.current) {
        cropperRef.current = new Cropper(node, {
          aspectRatio: x / y,
          viewMode: 1,
          zoomable: false,
          scalable: false,
        });
      }
    },
    [x, y]
  );

  function handleSave() {
    if (cropperRef.current) {
      cropperRef.current.getCroppedCanvas().toBlob((blob) => {
        onSave(blob);
        closeModal();
      });
    }
  }

  return (
    <Dialog.Panel className="grid grid-rows-[auto_1fr] fixed-center z-20 max-w-[90vmax] max-h-[90vmin] border-2 rounded-sm">
      <div className="bg-white flex items-center justify-end gap-2 p-1">
        <button
          type="button"
          className="text-gray-d2 hover:text-blue"
          onClick={handleSave}
        >
          <Icon type="Save" size={24} />
        </button>
      </div>
      <img ref={imgRef} src={preview} className="w-full" alt="banner" />
    </Dialog.Panel>
  );
}
