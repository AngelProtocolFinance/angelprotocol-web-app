import { IoMdSettings } from "react-icons/io";
import Split from "./Split";
export default function AdvancedOptions(props: {
  toggleAdvancedOptions: () => void;
  isOptionsShown: boolean;
}) {
  return (
    <div className="grid p-3 pl-2 rounded-md bg-light-grey shadow-inner-white-grey mt-2">
      <button
        type="button"
        onClick={props.toggleAdvancedOptions}
        className="justify-self-start flex items-center text-md text-grey-accent font-semibold hover:text-angel-grey cursor-pointer"
      >
        <IoMdSettings
          size={20}
          style={{ animationDuration: "4s" }}
          className={`${props.isOptionsShown ? "animate-spin" : ""}`}
        />
        <span className="uppercase text-sm pb-0.5 ml-0.5">
          {props.isOptionsShown ? "Hide options" : "Advanced Options"}
        </span>
      </button>
      {props.isOptionsShown && <Split />}
    </div>
  );
}
