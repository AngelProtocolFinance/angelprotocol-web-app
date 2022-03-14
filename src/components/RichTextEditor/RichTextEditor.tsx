import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import EditorComponent from "./EditorComponent";

type Props<T extends FieldValues> = {
  // we get common props with this intersection,
  // which are only props from T
  // (Path<T> returns all possible paths through T)
  name: Path<T> & keyof T;
  disabled?: true | boolean;
  placeholder?: string;
};

export default function RichTextEditor<T extends FieldValues>(props: Props<T>) {
  const { name, disabled, placeholder } = props;
  const { control } = useFormContext<T>();

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
