import Icon from "components/Icon";
import Split from "./Split";

type Props = {
  toggleAdvancedOptions(): void;
  isOptionsShown: boolean;
  classes?: string;
};

export default function AdvancedOptions({
  toggleAdvancedOptions,
  isOptionsShown,
  classes = "",
}: Props) {
  return (
    <div
      className={`grid ${classes} ${
        isOptionsShown ? "p-3 rounded-md bg-gray-l3 shadow-inner-white" : ""
      }`}
    >
      <button
        type="button"
        onClick={toggleAdvancedOptions}
        className="justify-self-start flex items-center text-gray-d2 hover:text-blue font-semibold  cursor-pointer"
      >
        <Icon
          type="Settings"
          size={20}
          style={{ animationDuration: "4s" }}
          className={`${isOptionsShown ? "animate-spin" : ""}`}
        />
        <span className="uppercase text-sm pb-0.5 ml-0.5">
          {isOptionsShown ? "Hide options" : "Advanced Options"}
        </span>
      </button>
      {isOptionsShown && <Split />}
    </div>
  );
}
