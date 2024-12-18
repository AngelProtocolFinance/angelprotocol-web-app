import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Save } from "lucide-react";
import { useRef } from "react";
import Cropper, { type ReactCropperElement } from "react-cropper";

type Props = {
  classes?: string;
  isOpen: boolean;
  onClose(): void;
  input: File;
  aspect: [number, number];
  onSave(cropped: File): void;
};

export function ImgCropper({
  input,
  aspect: [x, y],
  onSave,
  isOpen,
  onClose,
  classes = "",
}: Props) {
  const cropperRef = useRef<ReactCropperElement>(null);

  async function handleSave() {
    const cropper = cropperRef.current?.cropper;
    const cropped = await new Promise<File>((resolve) => {
      if (!cropper) return resolve(input);
      cropper
        .getCroppedCanvas()
        .toBlob((blob) =>
          blob
            ? resolve(new File([blob], input.name, { type: input.type }))
            : resolve(input)
        );
    });
    return onSave(cropped);
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30 data-[closed]:opacity-0" />
      <DialogPanel
        className={`${classes} grid grid-rows-[auto_1fr] fixed-center z-20 max-w-[90vmax] max-h-[90vmin] border-2 rounded-sm`}
      >
        <div className="bg-white flex items-center justify-end gap-2 p-1">
          <button
            type="button"
            className="text-navy-d4 hover:text-blue"
            onClick={handleSave}
          >
            <Save size={22} />
          </button>
        </div>
        <Cropper
          src={URL.createObjectURL(input)}
          aspectRatio={x / y}
          ref={cropperRef}
          viewMode={1}
          zoomable
          scalable
        />
      </DialogPanel>
    </Dialog>
  );
}
