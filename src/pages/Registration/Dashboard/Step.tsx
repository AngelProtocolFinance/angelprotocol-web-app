import Button from "../Button";

type Props = {
  title: string;
  completed?: true | boolean;
  disabled: boolean;
  statusComplete?: string | false;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Step(props: Props) {
  const { title, completed, disabled, onClick, statusComplete } = props;

  return (
    <div className="flex justify-end items-center w-full font-bold">
      <p className="mr-auto">{title}</p>
      {completed ? (
        <p className="uppercase text-green-500 w-40">
          {statusComplete || "Complete"}
        </p>
      ) : (
        <p className="uppercase text-yellow-500 w-40">Missing</p>
      )}
      {completed ? (
        <Button
          className="bg-yellow-blue w-40 h-10"
          onClick={onClick}
          disabled={disabled}
        >
          Change
        </Button>
      ) : (
        <Button className="bg-thin-blue w-40 h-10" onClick={onClick}>
          Continue
        </Button>
      )}
    </div>
  );
}
