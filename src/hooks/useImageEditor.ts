import { ChangeEvent, useRef, useState } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import placeHolderImage from "assets/images/home-banner.jpg";
import { useSetModal } from "components/Modal/Modal";
import Popup from "components/Popup/Popup";
import useFleek from "hooks/useFleek";
import optimizeImage from "helpers/optimizeImage";

export default function useImageEditor<T extends FieldValues>(
  fieldName: Path<T>
) {
  const { getValues, setValue, watch } = useFormContext<T>();
  //use to reset input internal state
  const inputRef = useRef<HTMLInputElement>(null);
  const currentImage = watch(fieldName) || placeHolderImage;
  const initialImageRef = useRef<string>(
    getValues(fieldName) || placeHolderImage
  );

  const [loading, setLoading] = useState(false);
  const { upload, isUploading } = useFleek();
  const { showModal } = useSetModal();

  function handleImageReset() {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    //reset to initial imageUrl or placeholder
    setValue(fieldName, initialImageRef.current as any);
  }

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setLoading(true);
    const key = e.target.files[0].name;
    const file = await optimizeImage(e.target.files[0]);
    const url = await upload(key, file);

    if (url) {
      setValue(fieldName, encodeURI(url) as any, {
        shouldDirty: true,
        shouldValidate: true,
      });
    } else {
      showModal(Popup, { message: "Error processing image" });
    }
    setLoading(false);
  }

  return {
    handleFileChange,
    handleImageReset,
    loading: isUploading || loading,
    isInitial: currentImage === initialImageRef.current,
    currentImage,
    inputRef,
  };
}
