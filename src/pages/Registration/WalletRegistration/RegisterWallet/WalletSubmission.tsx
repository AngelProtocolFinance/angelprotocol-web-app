import FormInput from "components/FormInput";
import { app, site } from "constants/routes";
import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import Action from "../../Action";
import routes from "../../routes";

type Props = {
  walletAddress: string;
  isSubmitting: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default function WalletSubmission(props: Props) {
  const { walletAddress, isSubmitting, onClick } = props;

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <p className="text-3xl font-bold">Register your wallet</p>
      <p className="my-10">
        ### EXPLANATION ABOUT WHAT REGISTERING THE WALLET DOES ###
      </p>
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
          classes="bg-thin-blue w-48 h-10 mb-10"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          onClick={onClick}
        >
          Submit
        </Action>
      </div>
      <Link
        to={`${site.app}/${app.register}/${routes.status}`}
        className="uppercase text-bright-blue text-sm hover:underline"
      >
        Click here to go back to the registration dashboard
      </Link>
    </div>
  );
}
