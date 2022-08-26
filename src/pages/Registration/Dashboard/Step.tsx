import { Button } from "../common";

type Props = {
  title: string;
  completed?: true | boolean;
  disabled: boolean;
  statusComplete?: string | false;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Step(props: Props) {
  return (
    <div className="grid grid-cols-[2fr_1fr_auto] items-center w-full font-bold">
      <p className="mr-auto text-left">{props.title}</p>
      {props.completed ? (
        <p className="uppercase text-green-500 w-40">
          {props.statusComplete || "Completed"}
        </p>
      ) : (
        <p className="uppercase text-yellow-500 w-40">Missing</p>
      )}
      {props.completed ? (
        <Button
          className="bg-yellow-blue w-40 h-10"
          onClick={props.onClick}
          disabled={props.disabled}
        >
          Change
        </Button>
      ) : (
        <Button className="bg-thin-blue w-40 h-10" onClick={props.onClick}>
          Continue
        </Button>
      )}
    </div>
  );
}
