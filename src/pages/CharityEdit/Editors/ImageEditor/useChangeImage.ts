import { ChangeEvent, useState, useRef, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { EditableProfileAttr } from "services/aws/endowments/types";

export default function useChangeImage() {
  //TODO: make this reusable with other image changer on different context
  const { getValues, setValue } = useFormContext<EditableProfileAttr>();

  //use to reset input internal state
  const inputRef = useRef<HTMLInputElement>(null);
  const currImageRef = useRef<EditableProfileAttr["charity_image"]>(
    getValues("charity_image")
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileList, setFileList] = useState<FileList | null>(null);

  useEffect(() => {
    setLoading(true);
    if (fileList === null) {
      setValue("charity_image", currImageRef.current);
      return;
    }
    if (fileList.length > 0) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(fileList[0]);
      fileReader.onload = handleFileLoad;
      fileReader.onerror = handleFileError;
      //no need to remove  for will be garbage collected
    }
    //eslint-disable-next-line
  }, [fileList]);

  function handleFileLoad(e: ProgressEvent<FileReader>) {
    // fileReader.readAsDataURL is only ran if there's file
    setValue("charity_image", e.target!.result as string, {
      shouldDirty: true,
      shouldValidate: true,
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
    setFileList(null);
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    setFileList(e.target.files);
  }

  return {
    fileList,
    handleFileChange,
    handleImageReset,
    loading,
    error,
    isInitial: fileList === null,
    inputRef,
  };
}
