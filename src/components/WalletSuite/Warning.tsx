import { AiOutlineInfoCircle } from "react-icons/ai";

export type Props = { text: string };
export default function Warning(props: Props) {
  return (
    <div className="grid justify-items-center p-5 text-angel-grey">
      <AiOutlineInfoCircle className="text-3xl  mb-2" />
      <p className="text-center">{props.text}</p>
      <button className="text-sm bg-blue-accent hover:bg-angel-blue px-8 py-0.5 rounded-full text-white mt-3">
        OK
      </button>
    </div>
  );
}
