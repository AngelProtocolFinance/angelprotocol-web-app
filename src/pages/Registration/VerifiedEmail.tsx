import jwtDecode from "jwt-decode";
import { Location, Navigate, useLocation } from "react-router-dom";
import { InitApplication } from "services/aws/registration/regtypes";
import { InitReg } from "services/aws/registration/types";
import { useRequestEmailMutation } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import Icon from "components/Icon";
import { BtnPrim } from "components/registration";
import { handleMutationResult, logger } from "helpers";
import { appRoutes } from "constants/routes";
import routes, { steps } from "./routes";

type JwtData = InitApplication & {
  authorization: string;
  exp: number;
  iat: number;
  user: string;
};

export default function VerifiedEmail() {
  const location = useLocation();
  const { handleError } = useErrorContext();
  const [requestEmail, { isLoading }] = useRequestEmailMutation();

  const data = extractJwtData(location);
  if (!data) {
    /** if JWT data is tampered in URL */
    return <Navigate to={".."} />;
  }

  const {
    application: { ContactPerson: c },
    isExpired,
  } = data;

  if (isExpired) {
    return (
      <div className="flex flex-col gap-10 items-center">
        <Icon type="Info" className="text-4xl text-red" />
        <p className="text-2xl font-bold">
          Your verification link has expired. Please resend the verification
          email.
        </p>
        <BtnPrim
          className="btn-orange w-64 h-12 text-sm"
          onClick={async () => {
            handleMutationResult(
              await requestEmail({ uuid: c.PK, email: c.Email }),
              handleError
            );
          }}
          disabled={isLoading}
        >
          Resend verification email
        </BtnPrim>
      </div>
    );
  }

  const state: InitReg = {
    reference: c.PK,
    email: c.Email,
    isEmailVerified: true,
    lastVerified: c.EmailVerificationLastSentDate,
  };

  return (
    <div className="flex flex-col gap-10 items-center">
      <Icon type="Check" className="text-4xl text-green-l1" />
      <h1>Your email address is confirmed!</h1>
      <p>
        Thank you for your interest in Angel Protocol! Your endowment is just a
        few steps away.
      </p>
      <BtnPrim
        as="link"
        to={`${appRoutes.register}/${routes.steps}/${steps.contact}`}
        state={state}
      >
        Continue Registration
      </BtnPrim>
    </div>
  );
}

function extractJwtData(
  location: Location
): { application: InitApplication; isExpired: boolean } | undefined {
  try {
    const pathNames = location.pathname.split("/");
    const jwtToken = pathNames[pathNames.length - 1];
    const jwtData = jwtDecode<JwtData>(jwtToken);
    const { authorization, exp, iat, user, ...application } = jwtData;
    const isExpired = Math.floor(Date.now() / 1000) >= exp;
    return { application, isExpired };
  } catch (err) {
    logger.error(err);
    return undefined;
  }
}
