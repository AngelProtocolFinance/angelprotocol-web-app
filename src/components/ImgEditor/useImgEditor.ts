import { useModalContext } from "contexts/ModalContext";
import type { MouseEventHandler } from "react";
import type { DropzoneOptions } from "react-dropzone";
import { useController, useFormContext } from "react-hook-form";
import type { Path } from "react-hook-form";
import ImgCropper from "./ImgCropper";
import type { ImgLink, Props } from "./types";

type Base = { [index: string]: ImgLink };

export default function useImgEditor<T extends Base, K extends Path<T>>({
  name,
  aspect,
  accept,
}: Props<T, K>) {
  const path = (sub: Path<ImgLink>): Path<T> => `${name}.${sub}` as any;

  const { setValue, watch, resetField, trigger } = useFormContext<T>();
  const { showModal } = useModalContext();
  const {
    field: {
      value: currFile = new File([], "default file"),
      onChange: onFileChange,
      ref,
    },
  } = useController<Base, `${string}.file`>({
    name: `${name}.file`,
  });

  const { publicUrl, preview }: ImgLink = watch(name as any);
  const isInitial = preview === publicUrl;
  const noneUploaded = !publicUrl && !preview;

  const onDrop: DropzoneOptions["onDrop"] = (files: File[]) => {
    const newFile = files[0];
    if (!newFile) return;

    // set the file, and validate immediately
    onFileChange(newFile);
    trigger(name);

    //don't show cropper if file is unsupported, render blank preview
    if (!accept.includes(newFile.type as any)) {
      return setValue(path("preview"), "" as any);
    }

    //set pre-crop file preview
    setValue(path("preview"), URL.createObjectURL(newFile) as any);

    showModal(ImgCropper, {
      file: newFile,
      aspect,
      type: newFile.type,
      onSave: handleCropResult,
    });
  };

  const handleOpenCropper: MouseEventHandler<HTMLButtonElement> = (e) => {
    //prevent container dropzone from catching click event
    e.stopPropagation();
    showModal(ImgCropper, {
      file: currFile,
      aspect,
      onSave: handleCropResult,
    });
  };

  function handleCropResult(cropped: File) {
    setValue(path("preview"), URL.createObjectURL(cropped) as any);
    onFileChange(cropped);
    trigger(name);
  }

  const handleReset: MouseEventHandler<HTMLButtonElement> = (e) => {
    //prevent container dropzone from catching click event
    e.stopPropagation();
    resetField(name);
    resetField(path("file"));
  };

  return {
    onDrop,
    handleOpenCropper,
    isInitial,
    noneUploaded,
    handleReset,
    preview,
    file: currFile,
    filePath: path("file") as any,
    ref,
  };
}
