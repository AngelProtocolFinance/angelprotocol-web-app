import { useModalContext } from "contexts/ModalContext";
import type { MouseEventHandler } from "react";
import type { DropzoneOptions } from "react-dropzone";
import ImgCropper from "./ImgCropper";
import type { ControlledProps } from "./types";

export default function useImgEditor({
  value: curr,
  onSet,
  onSave,
  aspect,
  accept,
  rounded,
}: ControlledProps) {
  const { showModal } = useModalContext();

  const roundedClasses = rounded ? "[&_.cropper-view-box]:rounded-full" : "";

  const handleCropResult = (cropped: File) =>
    onSave({
      file: cropped,
      name: cropped.name,
      preview: URL.createObjectURL(cropped),
      publicUrl: "",
    });

  const onDrop: DropzoneOptions["onDrop"] = (files: File[]) => {
    const newFile = files[0];
    if (!newFile) return;

    if (!accept.includes(newFile.type as any)) {
      //don't show cropper, render blank preview
      return onSet({
        file: newFile,
        name: newFile.name,
        preview: "broken preview url",
        publicUrl: "",
      });
    }

    // set the file, and validate immediately
    onSet({
      file: newFile,
      name: newFile.name,
      preview: URL.createObjectURL(newFile),
      publicUrl: "",
    });

    showModal(
      ImgCropper,
      {
        file: newFile,
        aspect,
        onSave: handleCropResult,
        classes: roundedClasses,
      },
      { isDismissible: false }
    );
  };

  const handleOpenCropper: MouseEventHandler<HTMLButtonElement> = (e) => {
    //prevent container dropzone from catching click event
    e.stopPropagation();
    showModal(ImgCropper, {
      file: curr.file ?? new File([], "default file"),
      aspect,
      onSave: handleCropResult,
      classes: roundedClasses,
    });
  };

  return { onDrop, handleOpenCropper };
}
