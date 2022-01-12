import Action from "components/ActionButton/Action";

type Props = {
  className: string;
  onDonate: () => void;
  onShare: () => void;
};

export default function ButtonSection({ className, onDonate, onShare }: Props) {
  return (
    <div
      className={`${className} flex justify-center lg:justify-start gap-4 lg:gap-0 lg:flex-col`}
    >
      <Action
        title="Donate"
        classes="bg-orange w-2/5 sm:w-52 h-12"
        onClick={onDonate}
      />
      <Action
        title="Share"
        classes="bg-angel-blue w-2/5 sm:w-52 h-12"
        onClick={onShare}
      />
    </div>
  );
}
