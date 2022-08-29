import { useNavigate } from "react-router-dom";
import { Button } from "pages/Registration/common";
import { useRegistrationState } from "services/aws/registration";
import { appRoutes } from "constants/routes";
import { default as registerRoutes } from "../../routes";
import KeplrConnector from "./KeplrConnector";
import Title from "./Title";

export default function ChooseWallet() {
  const navigate = useNavigate();
  const { charity } = useRegistrationState();

  const onClick = () => {
    const url = charity.Metadata.JunoWallet
      ? `${appRoutes.register}/${registerRoutes.dashboard}`
      : `${appRoutes.register}/${registerRoutes.additionalInformation}`;
    navigate(url);
  };

  return (
    <div className="flex flex-col gap-5 items-center">
      <Title />
      <KeplrConnector />
      <Button className="bg-green-400 w-80 h-10" onClick={onClick}>
        Back
      </Button>
    </div>
  );
}
