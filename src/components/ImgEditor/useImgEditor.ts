import { DropzoneOptions } from "react-dropzone";
import { FieldValues, useController, useFormContext } from "react-hook-form";
import { ImgLink, Props } from "./types";
import { useModalContext } from "contexts/ModalContext";
import ImgCropper from "./ImgCropper";

type Key = keyof ImgLink;
const fileKey: Key = "file";
const previewKey: Key = "preview";

export default function useImgEditor<T extends FieldValues, K extends keyof T>({
  name,
  aspect,
  accept,
}: Props<T, K>) {
  const filePath: any = `${String(name)}.${fileKey}`;
  const previewPath: any = `${String(name)}.${previewKey}`;

  const { setValue, watch } = useFormContext<T>();
  const { showModal, closeModal } = useModalContext();
  const {
    field: { value: currFile, onChange: onFileChange },
  } = useController<T>({ name: filePath });

  const { publicUrl, preview }: ImgLink = watch(name as any);
  const isInitial = preview === publicUrl;

  const onDrop: DropzoneOptions["onDrop"] = (files: File[]) => {
    const newFile = files[0];
    if (newFile) {
      //preview & crop valid format only
      if (accept.includes(newFile.type)) {
        const preview = URL.createObjectURL(newFile);
        setValue(previewPath, preview as any);

        showModal(ImgCropper, {
          preview,
          aspect,
          onSave(blob) {
            if (!blob) return;
            const cropped = URL.createObjectURL(blob);
            setValue(previewPath, cropped as any);
            closeModal();
            onFileChange(
              new File([blob], newFile.name, { type: newFile.type })
            );
          },
        });
      }
      onFileChange(newFile);
    }
  };

  function handleOpenCropper() {
    showModal(ImgCropper, {
      preview,
      aspect,
      onSave(blob) {
        if (!blob) return;
        const cropped = URL.createObjectURL(blob);
        setValue(previewPath, cropped as any);
        closeModal();
        onFileChange(
          new File([blob], currFile.name, {
            type: currFile.type,
          })
        );
      },
    });
  }

  function handleReset() {
    setValue(previewPath, publicUrl as any, { shouldValidate: false });
    setValue(filePath, [] as any, { shouldValidate: false });
  }

  return { onDrop, handleOpenCropper, isInitial, handleReset, preview };
}
