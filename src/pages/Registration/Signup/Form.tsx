import { Separator } from "components/Separator";
import { APP_NAME } from "constants/env";
import { appRoutes, regRoutes } from "constants/routes";
import { useAuthenticatedUser } from "contexts/Auth";
import { useErrorContext } from "contexts/ErrorContext";
import { storeRegistrationReference } from "helpers";
import { useRendered } from "hooks/use-rendered";
import { Link, useNavigate } from "react-router-dom";
import { useNewApplicationMutation } from "services/aws/registration";
import { steps } from "../routes";

const NEED_HELP_ARTICLE_ID = 6628120;

export default function Form({ classes = "" }: { classes?: string }) {
  useRendered();
  const user = useAuthenticatedUser();
  const navigate = useNavigate();
  const { handleError } = useErrorContext();
  const [createNewApplication, { isLoading }] = useNewApplicationMutation();

  const openIntercomHelp = () => {
    const w = window as any;
    if ("Intercom" in w) {
      w.Intercom("showArticle", NEED_HELP_ARTICLE_ID);
    }
  };

  async function proceed() {
    try {
      const reg = await createNewApplication({
        registrant_id: user.email,
      }).unwrap();
      storeRegistrationReference(reg.id);
      navigate(`${appRoutes.register}/${regRoutes.steps}/${steps.contact}`, {
        state: reg,
      });
    } catch (err) {
      handleError(err, { context: "Creating registration" });
    }
  }

  return (
    <div
      className={`${classes} justify-center gap-8 padded-container w-full max-w-[37.5rem] grid`}
    >
      <h3 className="text-3xl text-center">
        Register your new {APP_NAME} nonprofit account
      </h3>

      <button
        disabled={isLoading}
        type="button"
        onClick={proceed}
        className="btn-blue btn-reg"
      >
        Start a new application
      </button>
      <Separator classes="before:mr-2 after:ml-2">OR</Separator>

      <Link className="btn-outline-filled  btn-reg" to={regRoutes.resume}>
        Resume your registration
      </Link>

      <button
        type="button"
        className="underline text-blue-d1 justify-self-center text-sm"
        onClick={openIntercomHelp}
      >
        Need Help?
      </button>
    </div>
  );
}
