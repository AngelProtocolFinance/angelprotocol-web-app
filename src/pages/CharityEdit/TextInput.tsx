import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { EditableProfileAttr } from "services/aws/endowments/types";
import Label from "./Label";

type Props = {
  id: keyof EditableProfileAttr;
  label: string;
  placeholder: string;
};
export default function TextInput(props: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext<EditableProfileAttr>();
  return (
    <div className="grid content-start mb-6">
      <Label text={props.label} id={props.id} />
      <input
        placeholder={props.placeholder}
        autoComplete="off"
        {...register(props.id)}
        id={props.id}
        type="text"
        className="bg-white/10 rounded-md shadow-inner p-3 mt-1 text-white/80 focus:outline-none placeholder-white-grey/20"
      />
      <ErrorMessage
        errors={errors}
        name={props.id}
        as="p"
        className="text-red-300/80 text-xs mb-1 mt-0.5 leading-normal"
      />
    </div>
  );
}
