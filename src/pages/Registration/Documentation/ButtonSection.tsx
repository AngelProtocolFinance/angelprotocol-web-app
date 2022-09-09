import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegistrationQuery } from "services/aws/registration";
import Loader from "components/Loader";
import { appRoutes } from "constants/routes";
import { Button } from "../common";
import routes from "../routes";

export default function ButtonSection() {
  const { charity } = useRegistrationQuery();
  const navigate = useNavigate();
  const {
    formState: { isSubmitting },
  } = useFormContext();

  // if wallet registration step is already complete, then this was just data update,
  // so user can be navigated to the dashboard
  const onBackClick = () => {
    const route = charity.Metadata.JunoWallet
      ? routes.dashboard
      : routes.contactDetails;
    navigate(`${appRoutes.register}/${route}`);
  };

  return (
    <div className="flex justify-center mt-10">
      {isSubmitting ? (
        <Loader bgColorClass="bg-white" widthClass="w-4" gapClass="gap-1" />
      ) : (
        <>
          <Button
            className="btn-outline-secondary w-48 h-12 mr-2"
            onClick={onBackClick}
          >
            Back
          </Button>
          <Button submit className="btn-primary w-48 h-12">
            Upload
          </Button>
        </>
      )}
    </div>
  );
}
