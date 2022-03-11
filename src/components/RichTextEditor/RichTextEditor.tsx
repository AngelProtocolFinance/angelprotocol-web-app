import { Controller, useFormContext } from "react-hook-form";
import EditorComponent from "./EditorComponent";

type Props = { name: string; disabled?: true | boolean };

export default function RichTextEditor({ name, disabled }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <EditorComponent
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      )}
    />
  );
}
