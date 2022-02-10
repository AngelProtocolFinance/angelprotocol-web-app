import LinkButton from "components/LinkButton";
import { Link } from "react-router-dom";
import { app, registration, site } from "types/routes";

type Props = {
  isSuccess: boolean;
  walletAddress: string;
};

export default function NavigationToDashboard(props: Props) {
  const { isSuccess, walletAddress } = props;

  return !isSuccess ? (
    <Link
      to={`${site.app}/${app.register}/${registration.status}`}
      className="uppercase text-bright-blue text-sm hover:underline"
    >
      Click here to go back to the registration dashboard
    </Link>
  ) : (
    <>
      <div>
        <p>Thanks for registering your wallet:</p>
        <p>your address is</p>
        <p className="font-bold">{walletAddress}</p>
      </div>
      <LinkButton
        to={`${site.app}/${app.register}/${registration.status}`}
        className="w-60 h-10 mt-8"
        bgColorClass="bg-angel-blue"
      >
        Back to dashboard
      </LinkButton>
    </>
  );
}
