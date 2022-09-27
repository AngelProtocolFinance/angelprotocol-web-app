import Icon from "components/Icon";
import Split from "./Split";

export default function AdvancedOptions(props: {
  toggleAdvancedOptions: () => void;
  isOptionsShown: boolean;
}) {
  return (
    <div
      className={`grid -ml-0.5 mt-6 ${
        props.isOptionsShown
          ? "p-3 rounded-md bg-light-grey shadow-inner-white"
          : ""
      }`}
    >
      <button
        type="button"
        onClick={props.toggleAdvancedOptions}
        className="justify-self-start flex items-center text-angel-grey hover:text-angel-blue font-semibold  cursor-pointer"
      >
        <Icon
          type="Settings"
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
