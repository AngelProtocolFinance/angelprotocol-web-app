import Action from "components/ActionButton/Action";

type Props = {
  title: string;
  isComplete?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Step(props: Props) {
  const { title, isComplete, onClick } = props;

  return (
    <div className="flex justify-between md:w-3/5 xl:w-1/2">
      <div className="text-left font-bold">
        <p>{title}</p>
        {isComplete ? (
          <p className="uppercase text-green-500">Complete</p>
        ) : (
          <p className="uppercase text-yellow-500">Missing</p>
        )}
      </div>
      {isComplete ? (
        <Action
          classes="bg-yellow-blue w-40 h-10"
          onClick={onClick}
          title="Change"
        />
      ) : (
        <Action
          classes="bg-thin-blue w-40 h-10"
          onClick={onClick}
          title="Continue"
        />
      )}
    </div>
  );
}
