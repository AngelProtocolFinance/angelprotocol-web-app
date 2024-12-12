import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "components/Image";
import Cropper from "cropperjs";
import { Save } from "lucide-react";
import { useCallback, useRef } from "react";

type Props = {
  classes?: string;
  isOpen: boolean;
  input: File;
  aspect: [number, number];
  onSave(cropped: File): void;
};

export function ImgCropper({
  input,
  aspect: [x, y],
  onSave,
  isOpen,
  classes = "",
}: Props) {
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

  async function handleSave() {
    const cropped = await new Promise<File>((resolve) => {
      if (!cropperRef.current) return resolve(input);
      cropperRef.current
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
    <Dialog
      open={isOpen}
      onClose={() => onSave(input)}
      className="relative z-50"
    >
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
        <Image
          ref={imgRef}
          alt="banner"
          src={URL.createObjectURL(input)}
          className="w-full"
        />
      </DialogPanel>
    </Dialog>
  );
}
