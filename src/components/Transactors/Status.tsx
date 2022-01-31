import { AiOutlineInfoCircle } from "react-icons/ai";
import { useGetter } from "store/accessors";

export default function Status() {
  const { form_error } = useGetter((state) => state.transaction);
  if (!form_error) {
    return null;
  }

  return (
    <div className="bg-red-400 bg-opacity-20 p-2 rounded-md text-angel-grey mb-2">
      <AiOutlineInfoCircle className="inline mb-1 text-lg mr-1" /> {form_error}
    </div>
  );
}
