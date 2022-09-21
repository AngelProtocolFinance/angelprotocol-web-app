import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { useModalContext } from "contexts/ModalContext";
import { FileWrapper } from "components/FileDropzone";
import { logger } from "helpers";
import ImgCropper from "./ImgCropper";

export default function useImgEditor<T extends FieldValues>(
  fieldName: Path<T> & keyof T,
  aspectRatio: number
) {
  const { showModal } = useModalContext();
  const {
    watch,
    setValue,
    control,
    formState: { isSubmitting },
  } = useFormContext<T>();

  const banner = watch(fieldName);

  const initialImageRef = useRef<FileWrapper>(banner); //use to reset input internal state
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
      aspectRatio,
      setCropedImage: (blob) => {
        setValue(fieldName, {
          file: new File([blob], fileWrapper.name),
          name: fileWrapper.name,
        } as any);
      },
    });
  }

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileWrapper({ file, name: file.name });
      setUncroppedImgUrl(""); // will be read once the new file is read in FileReader
    }
  }

  return {
    handleFileChange,
    handleImageReset,
    handleOpenCropper,
    control,
    error,
    inputRef,
    imageUrl,
    isLoading: isLoading || isSubmitting,
    isInitial: !initialImageRef.current.name,
  };
}
