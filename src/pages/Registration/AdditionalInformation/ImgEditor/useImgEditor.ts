import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { AdditionalInfoValues } from "pages/Registration/types";
import { useModalContext } from "contexts/ModalContext";
import { FileWrapper } from "components/FileDropzone";
import { logger } from "helpers";
import ImgCropper from "./ImgCropper";

export default function useImgEditor() {
  //TODO: make this reusable with other image changer on different context
  const { showModal } = useModalContext();
  const { getValues, setValue } = useFormContext<AdditionalInfoValues>();

  //use to reset input internal state
  const initialImageRef = useRef<AdditionalInfoValues["banner"]>(
    getValues("banner")
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileWrapper, setFileWrapper] = useState<FileWrapper>(
    initialImageRef.current
  );
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    (async function () {
      if (!fileWrapper.name) {
        return;
      }

      setLoading(true);

      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        // fileReader.readAsDataURL is only ran if there's file
        setImageUrl(e.target?.result as string);
        setLoading(false);
      };
      fileReader.onerror = (e) => {
        logger.error("Failed to load image", e.target?.error?.message);
        setError("failed to load image");
        setLoading(false);
      };

      if (fileWrapper.file) {
        fileReader.readAsDataURL(fileWrapper.file);
        return;
      }

      if (fileWrapper.publicUrl) {
        const blob = await fetch(fileWrapper.publicUrl).then((x) => x.blob());
        fileReader.readAsDataURL(blob);
      }
    })();

    //no need to remove  for will be garbage collected
  }, [fileWrapper, setValue]);

  function handleImageReset() {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setFileWrapper(initialImageRef.current);
  }

  function handleOpenCropper() {
    //cropper is disabled when imageFile is null
    showModal(ImgCropper, {
      src: imageUrl,
      setCropedImage: (blob) => {
        setValue("banner", {
          file: new File([blob], fileWrapper?.name),
          name: fileWrapper.name,
        });
      },
    });
  }

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setFileWrapper({ file: e.target.files[0], name: e.target.files[0].name });
    }
  }

  return {
    handleFileChange,
    handleImageReset,
    handleOpenCropper,
    loading,
    error,
    isInitial: !fileWrapper.name,
    inputRef,
    currentImage: imageUrl,
  };
}
