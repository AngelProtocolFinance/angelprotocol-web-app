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

export default function SubmitSection(props: Props) {
  const { walletAddress, isSubmitting, onClick } = props;

  return (
    <>
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
          disabled={isSubmitting}
          isLoading={isSubmitting}
          onClick={onClick}
        />
      </div>
      <Link
        to={`${site.app}/${app.register}/${routes.status}`}
        className="uppercase text-bright-blue text-sm hover:underline"
      >
        Click here to go back to the registration dashboard
      </Link>
    </>
  );
}
