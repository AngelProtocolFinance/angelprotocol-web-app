import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useModalContext } from "components/ModalContext/ModalContext";
import { UpdateProfileValues } from "../profileEditSchema";
import ImgCropper from "./ImgCropper";

export default function useImgEditor() {
  //TODO: make this reusable with other image changer on different context
  const { showModal } = useModalContext();
  const { getValues, setValue, watch } = useFormContext<UpdateProfileValues>();

  //use to reset input internal state
  const initialImageRef = useRef<UpdateProfileValues["image"]>(
    getValues("image")
  );
  const imageUrl = watch("image");
  const inputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (imageFile === null) {
      setValue("image", initialImageRef.current);
      return;
    }
    setLoading(true);

    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageFile);
    fileReader.onload = handleFileLoad;
    fileReader.onerror = handleFileError;
    //no need to remove  for will be garbage collected
  }, [imageFile]);

  function handleFileLoad(e: ProgressEvent<FileReader>) {
    // fileReader.readAsDataURL is only ran if there's file
    setValue("image", e.target!.result as string, {
      shouldDirty: true,
    });
    setLoading(false);
  }

  function handleFileError() {
    setError("failed to load image");
    setLoading(false);
  }

  function handleImageReset() {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setImageFile(null);
  }

  function handleOpenCropper() {
    //cropper is disabled when image is not new
    showModal(ImgCropper, {
      src: imageUrl!,
      saveCroppedFile: (file) => setImageFile(file),
    });
  }

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  }

  return {
    handleFileChange,
    handleImageReset,
    handleOpenCropper,
    loading,
    error,
    isInitial: imageFile === null,
    inputRef,
    currentImage: imageUrl,
  };
}
