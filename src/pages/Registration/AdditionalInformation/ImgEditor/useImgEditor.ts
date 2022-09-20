import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { AdditionalInfoValues } from "pages/Registration/types";
import { useModalContext } from "contexts/ModalContext";
import { FileWrapper } from "components/FileDropzone";
import { logger } from "helpers";
import ImgCropper from "./ImgCropper";

export default function useImgEditor() {
  const { showModal } = useModalContext();
  const { watch, setValue } = useFormContext<AdditionalInfoValues>();

  const banner = watch("banner");

  const initialImageRef = useRef<AdditionalInfoValues["banner"]>(banner); //use to reset input internal state
  const inputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileWrapper, setFileWrapper] = useState<FileWrapper>(banner);
  const [imageUrl, setImageUrl] = useState("");
  const [uncroppedImgUrl, setUncroppedImgUrl] = useState(""); // to use uncropped img version when cropping

  const fileReader = useMemo(() => {
    const fr = new FileReader();

    fr.onload = (e) => {
      const newImgUrl = e.target?.result?.toString() ?? "";

      setImageUrl(newImgUrl);
      if (!uncroppedImgUrl) {
        setUncroppedImgUrl(newImgUrl);
      }

      setLoading(false);
    };

    fr.onerror = (e) => {
      logger.error("Failed to load image", e.target?.error?.message);
      setError("failed to load image");
      setLoading(false);
    };

    return fr;
  }, [uncroppedImgUrl]);

  useEffect(() => {
    if (banner !== fileWrapper) {
      setFileWrapper(banner);
    }
  }, [banner, fileWrapper]);

  useEffect(() => {
    (async function () {
      if (!fileWrapper.name) {
        return;
      }

      setLoading(true);

      if (fileWrapper.file) {
        fileReader.readAsDataURL(fileWrapper.file);
        return;
      }

      if (fileWrapper.publicUrl) {
        const blob = await fetch(fileWrapper.publicUrl).then((x) => x.blob());
        fileReader.readAsDataURL(blob);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileWrapper]);

  function handleImageReset() {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setFileWrapper(initialImageRef.current);
  }

  function handleOpenCropper() {
    //cropper is disabled when imageFile is null
    showModal(ImgCropper, {
      src: uncroppedImgUrl,
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
      setUncroppedImgUrl("");
    }
  }

  return {
    handleFileChange,
    handleImageReset,
    handleOpenCropper,
    loading: isLoading,
    error,
    isInitial: !fileWrapper.name,
    inputRef,
    currentImage: imageUrl,
  };
}
