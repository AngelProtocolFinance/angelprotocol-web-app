import { IoCloseOutline } from "react-icons/io5";

export type Handler = () => void;

export interface Props {
  message: string;
  //function to run before the Modal and Popup is closed
  acknowledge: Handler;
  //function to run inside Popup e.g share / redirect etc
  action?: Handler;
}

export default function Popup(props: Props) {
  console.log("renders");

  return (
    <div className="p-4 grid grid-rows-1a place-items-center  bg-white-grey w-72 rounded-xl shadow-lg overflow-hidden relative">
      <button className={`absolute top-3 right-3`} onClick={props.acknowledge}>
        <IoCloseOutline className="text-angel-grey" />
      </button>
      <p className="text-angel-grey text-center h-40 grid place-items-center">
        {props.message}
      </p>
      <div className="grid gap-3">
        <button
          onClick={props.acknowledge}
          className="bg-angel-blue py-2 px-11 rounded-lg shadow-sm 
                font-bold font-heading text-white text-sm"
        >
          OK
        </button>
        {props?.action && (
          <button
            onClick={props.action}
            className="bg-angel-blue py-2 px-11 rounded-lg shadow-sm 
                font-bold font-heading text-white text-sm uppercase"
          >
            Share
          </button>
        )}
      </div>
    </div>
  );
}
