import { useNavigate } from "react-router-dom";
import { useLazyRegQuery } from "services/aws/registration";
import Icon from "components/Icon";
import { getSavedRegistrationReference } from "helpers";
import { appRoutes } from "constants/routes";
import { getRegistrationState } from "../Steps/getRegistrationState";
import routes from "../routes";

export default function Success() {
  const [checkPrevRegistration, { isLoading }] = useLazyRegQuery();
  const navigate = useNavigate();

  //redirect page from anvil has no information about the registration
  const proceed = async () => {
    try {
      const reference = getSavedRegistrationReference();
      if (!reference) return navigate(appRoutes.register);
      const savedRegistration = await checkPrevRegistration(reference).unwrap();
      const { state, nextStep } = getRegistrationState(savedRegistration);
      navigate(`${appRoutes.register}/${routes.steps}/${nextStep}`, {
        state: state.data.init,
      });
    } catch (err) {
      navigate(appRoutes.register);
    }
  };

  return (
    <>
      <Icon type="CheckCircle" className="text-green" size={70} />
      <h1 className="text-2xl uppercase text-center mt-10 mb-4">
        Fiscal Sponsorship Agreement signature was successfully saved!
      </h1>

      <button
        disabled={isLoading}
        className="w-full max-w-[26.25rem] btn-orange btn-reg mt-4"
        onClick={proceed}
      >
        {isLoading ? "Loading..." : "Continue"}
      </button>
    </>
  );
}
