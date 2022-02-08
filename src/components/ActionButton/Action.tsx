import Loader from "components/Loader/Loader";
import { MouseEventHandler } from "react";

type Props = {
  submit?: true | never;
  disabled?: boolean;
  title: string;
  classes?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
  // TODO: tooltip is actually the 'title' prop of the <button>, this component should be updated appropriately
  tooltip?: string;
};

export default function Action(props: Props) {
  return (
    <button
      className={`disabled:bg-gray-300 disabled:cursor-auto rounded-xl uppercase font-bold text-white ${props.classes}`}
      type={props.submit ? "submit" : "button"}
      disabled={props.disabled}
      onClick={props.onClick}
      title={props.tooltip}
    >
      {props.isLoading ? (
        <Loader bgColorClass="bg-white" widthClass="w-3" gapClass="gap-1" />
      ) : (
        props.title
      )}
    </button>
  );
}
