import FormInput from "components/FormInput";
import Action from "pages/Registration/Action";
import { MouseEventHandler } from "react";

type Props = {
  walletAddress: string;
  isSubmitting: boolean;
  isSuccess: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default function SubmitSection(props: Props) {
  const { walletAddress, isSubmitting, isSuccess, onClick } = props;

  if (isSuccess) return null;

  return (
    <div className="flex flex-col gap-10 items-center w-3/4">
      <FormInput
        id="walletAddress"
        label="Terra Wallet"
        placeholder="terra1..."
        value={walletAddress}
        disabled
        required
      />
      <Action
        submit
        title="Submit"
        classes="bg-thin-blue w-48 h-10 mb-10"
        disabled={isSubmitting || isSuccess}
        isLoading={isSubmitting}
        onClick={onClick}
      />
    </div>
  );
}
