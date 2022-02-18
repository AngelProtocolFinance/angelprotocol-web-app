import LinkButton from "components/LinkButton";
import { app, site } from "constants/routes";
import { Link } from "react-router-dom";
import routes from "../../routes";

type Props = { isSuccess: boolean; walletAddress: string };

export default function NavigationToDashboard(props: Props) {
  const { isSuccess, walletAddress } = props;

  if (isSuccess) {
    return (
      <>
        <div>
          <p>Thanks for registering your wallet:</p>
          <p>your address is</p>
          <p className="font-bold">{walletAddress}</p>
        </div>
        <LinkButton
          to={`${site.app}/${app.register}/${routes.status}`}
          className="w-60 h-10 mt-8"
          bgColorClass="bg-angel-blue"
        >
          Back to dashboard
        </LinkButton>
      </>
    );
  }

  return (
    <Link
      to={`${site.app}/${app.register}/${routes.status}`}
      className="uppercase text-bright-blue text-sm hover:underline"
    >
      Click here to go back to the registration dashboard
    </Link>
  );
}
