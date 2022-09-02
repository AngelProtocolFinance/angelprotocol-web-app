import { Button } from "../common";

type Props = {
  buttonLabel?: string;
  customStatus?: string;
  disabled: boolean;
  title: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Step(props: Props) {
  return (
    <div className="grid grid-cols-[2fr_1fr_auto] items-center w-full font-bold">
      <p className="mr-auto text-left">{props.title}</p>
      <p className="uppercase text-green-500 w-40">
        {props.customStatus || "Completed"}
      </p>
      <Button
        className="bg-yellow-blue w-40 h-10"
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.buttonLabel || "Update"}
      </Button>
    </div>
  );
}
