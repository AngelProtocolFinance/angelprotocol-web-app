import { Controller, useFormContext } from "react-hook-form";
import EditorComponent from "./EditorComponent";

type Props = {
  name: string;
  disabled?: true | boolean;
  placeholder?: string;
};

export default function RichTextEditor(props: Props) {
  const { name, disabled, placeholder } = props;
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <EditorComponent
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
        />
      )}
    />
  );
}
