import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckPreviousRegistrationMutation } from "services/aws/registration";
import { useModalContext } from "components/ModalContext/ModalContext";
import Popup, { PopupProps } from "components/Popup/Popup";
import { useSetter } from "store/accessors";
import { app, site } from "constants/routes";
import { createCharityWithStepOneData } from "./helpers";
import routes from "./routes";
import { updateCharity } from "./store";

export default function useResume() {
  const [checkData] = useCheckPreviousRegistrationMutation();
  const dispatch = useSetter();
  const navigate = useNavigate();
  const { showModal } = useModalContext();

  const resume = useCallback(
    async (values: { refer: string }) => {
      const result = await checkData(values.refer);

      if ("error" in result) {
        console.log(result.error);
        return showModal<PopupProps>(Popup, {
          message:
            "No active charity application found with this registration reference",
        });
      }

      const charity = createCharityWithStepOneData(result.data);
      dispatch(updateCharity(charity));

      if (charity.ContactPerson.EmailVerified) {
        navigate(`${site.app}/${app.register}/${routes.dashboard}`);
      } else {
        navigate(`${site.app}/${app.register}/${routes.confirm}`, {
          state: { is_sent: true },
        });
      }
    },
    [checkData, showModal, dispatch, navigate]
  );

  return resume;
}
