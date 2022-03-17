import { Controller, FieldValues, useFormContext } from "react-hook-form";
import Dropzone from "./Dropzone";
import { BaseProps } from "./types";

export default function FileDropzone<T extends FieldValues>(
  props: BaseProps<T>
) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Dropzone<T> {...props} onDrop={onChange} value={value} />
      )}
    />
  );
}
