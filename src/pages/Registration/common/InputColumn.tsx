import { InputProps } from "./types";
import InfoIcon from "./InfoIcon";

export default function InputColumn(props: InputProps) {
  return (
    <div className="flex flex-col gap-2 w-full items-start">
      <div className="flex items-center gap-2 h-8">
        <label htmlFor={props.htmlFor} className="cursor-pointer">
          {props.label}
          {props.required && <span className="text-failed-red ml-0.5">*</span>}
        </label>
        {!!props.infoModal && <InfoIcon modal={props.infoModal} />}
      </div>
      {props.children}
    </div>
  );
}
