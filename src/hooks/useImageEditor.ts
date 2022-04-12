import optimizeImage from "helpers/optimizeImage";
import { ChangeEvent, useState, useRef } from "react";
import { useFormContext, Path, FieldValues } from "react-hook-form";
import placeHolderImage from "assets/images/home-banner.jpg";
import useFleek from "hooks/useFleek";
import { useSetModal } from "components/Modal/Modal";
import Popup, { PopupProps } from "components/Popup/Popup";

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
      setValue(fieldName, encodeURI(url) as any);
    } else {
      showModal<PopupProps>(Popup, { message: "Error processing image" });
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
