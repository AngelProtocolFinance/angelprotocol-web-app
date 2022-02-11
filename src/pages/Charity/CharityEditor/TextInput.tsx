import { EditableProfileAttr } from "./types";
import { useFormContext } from "react-hook-form";
import Label from "./Label";

type Props = {
  id: keyof EditableProfileAttr;
  label: string;
  placeholder: string;
};
export default function TextInput(props: Props) {
  const { register } = useFormContext<EditableProfileAttr>();
  return (
    <div className="grid content-start mb-6">
      <Label text={props.label} id={props.id} />
      <input
        placeholder={props.placeholder}
        autoComplete="off"
        {...register(props.id)}
        id={props.id}
        type="text"
        className="bg-white bg-opacity-10 rounded-md shadow-inner p-3 mt-1 text-white text-opacity-80 focus:outline-none placeholder-white-grey placeholder-opacity-10"
      />
    </div>
  );
}
