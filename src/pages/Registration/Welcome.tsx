import Icon from "components/Icon";
import LoaderRing from "components/LoaderRing";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import { APP_NAME } from "constants/env";
import { appRoutes, regRoutes } from "constants/routes";
import { useAuthenticatedUser } from "contexts/Auth";
import { useErrorContext } from "contexts/ErrorContext";
import { storeRegistrationReference } from "helpers";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNewApplicationMutation } from "services/aws/registration";
import { steps } from "./routes";
import { InitReg } from "./types";

export default function Welcome({ classes = "" }: { classes?: string }) {
  const [isLoading, setLoading] = useState(true);
  const [initReg, setInitReg] = useState<InitReg>();

  const [register] = useNewApplicationMutation();
  const { email } = useAuthenticatedUser();
  const { handleError } = useErrorContext();

  useEffect(() => {
    (async () => {
      try {
        const res = await register({ email }).unwrap();
        const newInitReg: InitReg = {
          email: res.ContactPerson.Email,
          reference: res.ContactPerson.PK,
        };
        storeRegistrationReference(newInitReg.reference);
        setInitReg(newInitReg);
      } catch (error) {
        handleError(error, GENERIC_ERROR_MESSAGE);
      } finally {
        setLoading(false);
      }
    })();
  }, [email, register, handleError]);

  if (isLoading) {
    return (
      <div className={`${classes} grid place-items-center`}>
        <LoaderRing thickness={10} classes="w-8" />
      </div>
    );
  }

  return (
    <div className={`${classes} grid justify-items-center`}>
      <Icon type="CheckCircle" className="text-green" size={80} />
      <h1 className="text-[2rem] mt-10 text-center">
        Thank you for joining {APP_NAME}!
      </h1>
      <p className="text-center text-gray-d1 dark:text-white/75 w-full text-lg max-w-lg mt-4 mb-8">
        Your fundraising profile & account are just few steps away 😇
      </p>
      <Link
        className="w-full max-w-[26.25rem] btn-orange btn-reg"
        to={`${appRoutes.register}/${regRoutes.steps}/${steps.contact}`}
        state={initReg}
      >
        Continue Registration
      </Link>
      <p className="text-sm italic text-gray-d1 dark:text-gray mt-8 text-center">
        Note: Registration is quick, but we've sent an email link if you need to
        pause and resume at any point.
      </p>
    </div>
  );
}
