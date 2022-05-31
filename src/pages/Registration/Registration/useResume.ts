import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckPreviousRegistrationMutation } from "services/aws/registration";
import { useSetter } from "store/accessors";
import { appRoutes, siteRoutes } from "constants/routes";
import { createCharityWithStepOneData } from "../helpers";
import routes from "../routes";
import { updateCharity } from "../store";
import useHandleError from "../useHandleError";

export default function useResume() {
  const [checkData] = useCheckPreviousRegistrationMutation();
  const dispatch = useSetter();
  const navigate = useNavigate();
  const handleError = useHandleError();

  const resume = useCallback(
    async (values: { refer: string }) => {
      const result = await checkData(values.refer);

      if ("error" in result) {
        return handleError(
          result.error,
          "No active charity application found with this registration reference"
        );
      }

      const charity = createCharityWithStepOneData(result.data);
      dispatch(updateCharity(charity));

      if (charity.ContactPerson.EmailVerified) {
        navigate(`${siteRoutes.app}/${appRoutes.register}/${routes.dashboard}`);
      } else {
        navigate(`${siteRoutes.app}/${appRoutes.register}/${routes.confirm}`, {
          state: { is_sent: true },
        });
      }
    },
    [checkData, dispatch, handleError, navigate]
  );

  return resume;
}
