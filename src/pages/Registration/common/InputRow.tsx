import { InputProps } from "./types";
import InfoIcon from "./InfoIcon";

export function InputRow(props: InputProps) {
  return (
    <div className={`grid grid-cols-2 gap-2 ${props.classes ?? ""}`}>
      <div className="flex items-center gap-2 h-8">
        <label
          htmlFor={props.htmlFor}
          className={`${props.htmlFor ? "cursor-pointer" : ""} text-dark-grey`}
        >
          {props.label}
          {props.required && <span className="text-failed-red ml-0.5">*</span>}
        </label>
        {!!props.infoModal && <InfoIcon modal={props.infoModal} />}
      </div>
      <div className="flex flex-col justify-center gap-1 w-full">
        {props.children}
      </div>
    </div>
  );
}
