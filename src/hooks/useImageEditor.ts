import optimizeImage from "pages/CharityEdit/optimizeImage";
import { ChangeEvent, useState, useRef, useEffect } from "react";
import { useFormContext, Path } from "react-hook-form";
import useFleek from "hooks/useFleek";
import { useSetModal } from "components/Modal/Modal";
import Popup, { PopupProps } from "components/Popup/Popup";

export default function useImageEditor<T extends object>(fieldName: Path<T>) {
  //TODO: make this reusable with other image changer on different context
  const { getValues, setValue } = useFormContext<T>();
  //use to reset input internal state
  const inputRef = useRef<HTMLInputElement>(null);
  const currImageRef = useRef<string>(getValues(fieldName));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>();
  const { upload, isUploading } = useFleek();
  const { showModal } = useSetModal();

  useEffect(() => {
    if (!imageUrl) {
      setValue(fieldName, currImageRef.current as any);
      return;
    }
    //eslint-disable-next-line
  }, [imageUrl]);

  function handleImageReset() {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setImageUrl("");
  }

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setLoading(true);
    const key = e.target.files[0].name;
    const file = await optimizeImage(e.target.files[0]);
    setLoading(false);

    const url = await upload(key, file);
    if (url) {
      setValue(fieldName, url as any, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setImageUrl(url);
    } else {
      showModal<PopupProps>(Popup, { message: "Error processing image" });
    }
  }

  return {
    handleFileChange,
    handleImageReset,
    loading: isUploading || loading,
    error,
    isInitial: !imageUrl,
    inputRef,
  };
}
