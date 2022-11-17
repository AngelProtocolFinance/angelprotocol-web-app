import { BtnSec } from "components/registration";

type Props = {
  buttonLabel?: string;
  customStatus?: string;
  disabled: boolean;
  title: string;
  isIncomplete?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Step(props: Props) {
  return (
    <div className="grid grid-cols-[2fr_1fr_auto] items-center w-full font-bold">
      <p className="mr-auto text-left">{props.title}</p>
      {props.isIncomplete ? (
        <p className="uppercase text-orange-l1 w-40">Incomplete</p>
      ) : (
        <p className="uppercase text-green w-40">
          {props.customStatus || "Completed"}
        </p>
      )}
      <BtnSec
        className="min-w-[8rem]"
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.buttonLabel || "Update"}
      </BtnSec>
    </div>
  );
}
