import { useModalContext } from "contexts/ModalContext";
import type { MouseEventHandler } from "react";
import type { DropzoneOptions } from "react-dropzone";
import ImgCropper from "./ImgCropper";
import type { ControlledProps } from "./types";

export default function useImgEditor({
  value: curr,
  onChange,
  aspect,
  accept,
  rounded,
}: ControlledProps) {
  const { showModal } = useModalContext();

  const handleCropResult = (cropped: File) =>
    onChange({
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
      return onChange({
        file: newFile,
        name: newFile.name,
        preview: "broken preview url",
        publicUrl: "",
      });
    }

    // set the file, and validate immediately
    onChange({
      file: newFile,
      name: newFile.name,
      preview: URL.createObjectURL(newFile),
      publicUrl: "",
    });

    showModal(ImgCropper, {
      file: newFile,
      aspect,
      onSave: handleCropResult,
      classes: rounded
        ? "[&_.cropper-crop-box,_.cropper-view-box]:border-full"
        : "",
    });
  };

  const handleOpenCropper: MouseEventHandler<HTMLButtonElement> = (e) => {
    //prevent container dropzone from catching click event
    e.stopPropagation();
    showModal(ImgCropper, {
      file: curr.file ?? new File([], "default file"),
      aspect,
      onSave: handleCropResult,
    });
  };

  return { onDrop, handleOpenCropper };
}
