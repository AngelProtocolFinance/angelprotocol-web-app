import Cropper from "cropperjs";
import { useCallback, useRef } from "react";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import Image from "components/Image";
import Modal from "components/Modal";

type Props = {
  preview: string;
  type: string; // original file type, will be the same for blob in `onSave(blob: Blob)`
  aspect: [number, number];
  onSave(blob: Blob | null): void; // blob.type is the same as Props.type
};

export default function ImgCropper({
  preview,
  type,
  aspect: [x, y],
  onSave,
}: Props) {
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
    [x, y],
  );

  function handleSave() {
    if (cropperRef.current) {
      cropperRef.current.getCroppedCanvas().toBlob((blob) => {
        onSave(blob);
        closeModal();
      }, type);
    }
  }

  return (
    <Modal className="grid grid-rows-[auto_1fr] fixed-center z-20 max-w-[90vmax] max-h-[90vmin] border-2 rounded-sm">
      <div className="bg-white flex items-center justify-end gap-2 p-1">
        <button
          type="button"
          className="text-gray-d2 hover:text-blue"
          onClick={handleSave}
        >
          <Icon type="Save" size={24} />
        </button>
      </div>
      <Image ref={imgRef} alt="banner" src={preview} className="w-full" />
    </Modal>
  );
}
