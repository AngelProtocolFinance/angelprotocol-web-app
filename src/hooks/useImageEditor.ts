import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Path, useFormContext } from "react-hook-form";
import optimizeImage from "pages/CharityEdit/optimizeImage";

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

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const file = await optimizeImage(e.target.files[0]);
    const files = (file ? [file] : e.target.files) as FileList;
    setFileList(files);
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
