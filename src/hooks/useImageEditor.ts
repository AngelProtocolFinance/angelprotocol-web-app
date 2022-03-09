import { ChangeEvent, useState, useRef, useEffect } from "react";
import { useFormContext, Path } from "react-hook-form";

export default function useImageEditor<T extends object>(fieldName: Path<T>) {
  //TODO: make this reusable with other image changer on different context
  const { getValues, setValue } = useFormContext<T>();

  //use to reset input internal state
  const inputRef = useRef<HTMLInputElement>(null);
  const currImageRef = useRef<string>(getValues(fieldName));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileList, setFileList] = useState<FileList | null>(null);

  useEffect(() => {
    setLoading(true);
    if (fileList === null) {
      setValue(fieldName, currImageRef.current as any);
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
    setValue(fieldName, e.target!.result as any, {
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
