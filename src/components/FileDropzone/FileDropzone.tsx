import { Controller, useFormContext } from "react-hook-form";
import Dropzone from "./Dropzone";
import { BaseProps } from "./types";

export default function FileDropzone(props: BaseProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Dropzone {...props} onDrop={onChange} value={value} />
      )}
    />
  );
}
