import { Values } from "components/Donater/types";
import { useFormContext } from "react-hook-form";
import { AiOutlineInfoCircle } from "react-icons/ai";

export default function Status() {
  const { watch } = useFormContext<Values>();
  const error = watch("form_error");

  if (!error) {
    return null;
  }

  return (
    <div className="bg-red-400 bg-opacity-20 p-2 rounded-md text-angel-grey mb-2">
      <AiOutlineInfoCircle className="inline mb-1 text-lg mr-1" /> {error}
    </div>
  );
}
