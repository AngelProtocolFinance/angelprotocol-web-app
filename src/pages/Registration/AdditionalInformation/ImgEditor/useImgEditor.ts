import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FileWrapper } from "components/FileDropzone/types";
import { useModalContext } from "components/ModalContext/ModalContext";
import { FormValues } from "../types";
import ImgCropper from "./ImgCropper";

export default function useImgEditor(name: keyof FormValues) {
  //TODO: make this reusable with other image changer on different context
  const { showModal } = useModalContext();
  const { getValues, setValue, watch } = useFormContext<FormValues>();

  //use to reset input internal state
  const initialImageRef = useRef<string | FileWrapper | boolean>(
    getValues(name)
  );
  const imageUrl = watch(name);
  const inputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    function handleFileLoad(e: ProgressEvent<FileReader>) {
      // fileReader.readAsDataURL is only ran if there's file
      setValue(name, e.target!.result as string, {
        shouldDirty: true,
      });
      setLoading(false);
    }

    function handleFileError() {
      setError("failed to load image");
      setLoading(false);
    }

    if (imageFile === null) {
      setValue(name, initialImageRef.current);
      return;
    }

    setLoading(true);

    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageFile);
    fileReader.onload = handleFileLoad;
    fileReader.onerror = handleFileError;
    //no need to remove  for will be garbage collected
  }, [imageFile, name, setValue]);

  function handleImageReset() {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setImageFile(null);
  }

  function handleOpenCropper() {
    //cropper is disabled when imageFile is null
    showModal(ImgCropper, {
      src: imageUrl! as string,
      setCropedImage: (dataURL) => {
        setValue(name, dataURL);
      },
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
