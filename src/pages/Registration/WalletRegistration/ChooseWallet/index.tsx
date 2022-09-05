import { useNavigate } from "react-router-dom";
import { Button } from "pages/Registration/common";
import { useRegistrationQuery } from "services/aws/registration";
import { appRoutes } from "constants/routes";
import routes from "../../routes";
import KeplrConnector from "./KeplrConnector";
import Title from "./Title";

export default function ChooseWallet() {
  const navigate = useNavigate();
  const { charity } = useRegistrationQuery();

  // if wallet registration step is already complete, then this was just data update,
  // so user can be navigated to the dashboard
  const onBackClick = () => {
    const route = charity.Metadata.JunoWallet
      ? routes.dashboard
      : routes.additionalInformation;
    navigate(`${appRoutes.register}/${route}`);
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-center h-full w-full">
      <Title />
      <KeplrConnector />
      <Button className="bg-green-400 w-80 h-10" onClick={onBackClick}>
        Back
      </Button>
    </div>
  );
}
