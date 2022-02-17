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
        className="bg-white bg-opacity-10 rounded-md shadow-inner p-3 mt-1 text-white text-opacity-80 focus:outline-none placeholder-white-grey placeholder-opacity-20"
      />
      <ErrorMessage
        errors={errors}
        name={props.id}
        as="p"
        className="font-mono text-red-300 text-xs mb-1 mt-1 text-opacity-80"
      />
    </div>
  );
}

export function PrependedInput(props: Props & { prependText: string }) {
  const {
    register,
    formState: { errors },
  } = useFormContext<EditableProfileAttr>();
  return (
    <div className="grid content-start mb-6">
      <Label text={props.label} id={props.id} />
      <div className="grid grid-cols-a1 items-center mt-1 rounded-md overflow-hidden text-opacity-80 text-white ">
        <p className="p-3 font-mono bg-white bg-opacity-30 w-52">
          {props.prependText}
        </p>
        <input
          placeholder={props.placeholder}
          autoComplete="off"
          {...register(props.id)}
          id={props.id}
          type="text"
          className="bg-white bg-opacity-10 shadow-inner p-3 focus:outline-none placeholder-white-grey placeholder-opacity-20"
        />
      </div>

      <ErrorMessage
        errors={errors}
        name={props.id}
        as="p"
        className="font-mono text-red-300 text-xs mb-1 mt-1 text-opacity-80"
      />
    </div>
  );
}
