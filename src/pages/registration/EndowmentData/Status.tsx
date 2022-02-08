import maskAddress from "helpers/maskAddress";
import { MouseEventHandler } from "react";
import Action from "../../../components/ActionButton/Action";

type Props = {
  endowmentStep: number;
  walletAddress: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export default function Status(props: Props) {
  const { endowmentStep, walletAddress, onClick, disabled } = props;

  return (
    <div className="flex justify-between md:w-3/5 xl:w-1/2">
      <div className="text-left font-bold">
        <p>Status of Your Endowment</p>
        {endowmentStep === 0 && (
          <p className="uppercase text-yellow-500">Available soon</p>
        )}
        {endowmentStep === 1 && (
          <p className="uppercase text-green-500">Available</p>
        )}
      </div>
      {endowmentStep === 2 ? (
        <p className="text-green-500 uppercase">
          Created: <span>{maskAddress(walletAddress)}</span>
        </p>
      ) : (
        <Action
          classes={
            endowmentStep === 1
              ? "bg-green-500 w-40 h-10"
              : "bg-thin-blue w-40 h-10"
          }
          onClick={onClick}
          title="Create"
          disabled={disabled}
        />
      )}
    </div>
  );
}
