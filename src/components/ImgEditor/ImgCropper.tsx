import Icon from "components/Icon";
import Image from "components/Image";
import Modal from "components/Modal";
import { useModalContext } from "contexts/ModalContext";
import Cropper from "cropperjs";
import { useCallback, useRef } from "react";

type Props = {
  file: File;
  aspect: [number, number];
  onSave(cropped: File): void;
};

export default function ImgCropper({ file, aspect: [x, y], onSave }: Props) {
  const { closeModal } = useModalContext();

  const cropperRef = useRef<Cropper>();

  const imgRef = useCallback(
    (node: HTMLImageElement | null) => {
      if (node && !cropperRef.current) {
        cropperRef.current = new Cropper(node, {
          aspectRatio: x / y,
          viewMode: 1,
          zoomable: true,
          scalable: false,
        });
      }
    },
    [x, y]
  );

  function handleSave() {
    if (!cropperRef.current) return onSave(file);
    cropperRef.current.getCroppedCanvas().toBlob((blob) => {
      //nothing is cropped
      if (!blob) return onSave(file);
      onSave(new File([blob], file.name, { type: file.type }));
      closeModal();
    }, file.type);
  }

  return (
    <Modal className="grid grid-rows-[auto_1fr] fixed-center z-20 max-w-[90vmax] max-h-[90vmin] border-2 rounded-sm">
      <div className="bg-white flex items-center justify-end gap-2 p-1">
        <button
          type="button"
          className="text-navy-d4 hover:text-blue"
          onClick={handleSave}
        >
          <Icon type="Save" size={24} />
        </button>
      </div>
      <Image
        ref={imgRef}
        alt="banner"
        src={URL.createObjectURL(file)}
        className="w-full"
      />
    </Modal>
  );
}
