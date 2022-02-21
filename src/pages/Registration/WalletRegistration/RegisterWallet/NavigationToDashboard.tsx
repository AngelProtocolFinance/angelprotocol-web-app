import LinkButton from "components/LinkButton";
import { app, site } from "constants/routes";
import routes from "../../routes";

type Props = { walletAddress: string };

export default function NavigationToDashboard(props: Props) {
  const { walletAddress } = props;

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
