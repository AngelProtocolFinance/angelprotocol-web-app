import { useNavigate } from "react-router-dom";
import { RegistrationState } from "pages/Registration/types";
import { appRoutes, siteRoutes } from "constants/routes";
import routes from "../../routes";
import Step from "./Step";

type Props = {
  disabled: boolean;
  registrationState: RegistrationState;
};

export default function Steps({ disabled, registrationState }: Props) {
  const navigate = useNavigate();

  return (
    <div className="w-full md:w-2/3 flex flex-col items-center gap-4">
      <Step
        title="Step #1: Contact Details"
        onClick={() =>
          navigate(
            `${siteRoutes.app}/${appRoutes.register}/${routes.contactDetails}`
          )
        }
        disabled={disabled}
        completed
      />
      <Step
        title="Step #2: Wallet Address"
        onClick={() =>
          navigate(`${siteRoutes.app}/${appRoutes.register}/${routes.wallet}`)
        }
        disabled={disabled}
        completed={registrationState.stepTwo.completed}
      />
      <Step
        title="Step #3: Documentation"
        onClick={() =>
          navigate(
            `${siteRoutes.app}/${appRoutes.register}/${routes.documentation}`
          )
        }
        disabled={disabled}
        completed={registrationState.stepThree.completed}
        statusComplete={
          registrationState.stepThree.completed &&
          `Level ${registrationState.stepThree.tier}`
        }
      />
      <Step
        title="Step #4: Additional Information"
        onClick={() =>
          navigate(
            `${siteRoutes.app}/${appRoutes.register}/${routes.additionalInformation}`
          )
        }
        disabled={disabled}
        completed={registrationState.stepFour.completed}
      />
    </div>
  );
}
