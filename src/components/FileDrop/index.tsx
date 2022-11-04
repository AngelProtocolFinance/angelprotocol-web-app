import { useDropzone } from "react-dropzone";
import { FieldValues, Path, useController } from "react-hook-form";
import { FileObject } from "types/aws";

export type FileLink = {
  link: FileObject | null;
  file: File;
};

type BaseFormValue = { [index: string]: FileLink[] };

export default function FileDrop<
  T extends FieldValues,
  K extends Path<T>
>(props: {
  fieldName: T[K] extends FileLink[] ? K : never;
  multiple?: true;
  disabled?: boolean;
}) {
  const {
    field: { value: files, onChange: onFilesChange },
  } = useController<BaseFormValue>({ name: props.fieldName });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => {
      onFilesChange(files);
    },
    multiple: props.multiple,
    disabled: props.disabled,
  });
}
