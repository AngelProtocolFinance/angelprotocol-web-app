import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { BaseProps, FileWrapper } from "./types";
import Dropzone from "./Dropzone";

export default function FileDropzone<T extends FieldValues>(
  props: BaseProps<T>
) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Dropzone<T>
          {...props}
          value={value}
          onDrop={(acceptedFiles) => {
            const files = acceptedFiles.map<FileWrapper>((x) => ({
              file: x,
              name: x.name,
            }));
            onChange(props.multiple ? files : files[0]);
          }}
        />
      )}
    />
  );
}
