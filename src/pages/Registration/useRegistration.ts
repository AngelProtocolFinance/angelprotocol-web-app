import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Charity } from "@types-server/aws";
import { useCheckPreviousRegistrationMutation } from "services/aws/registration";
import { useModalContext } from "contexts/ModalContext/ModalContext";
import Popup from "components/Popup/Popup";
import { useSetter } from "store/accessors";
import { appRoutes, siteRoutes } from "constants/routes";
import { createInitializedCharity } from "./helpers";
import routes from "./routes";
import { updateCharity } from "./store";

type ReferInfo = { refer: string };

export const FormInfoSchema = Yup.object().shape({
  refer: Yup.string().required("Please enter your registration reference."),
});

export const useRegistration = () => {
  const [checkData] = useCheckPreviousRegistrationMutation();
  const dispatch = useSetter();
  const navigate = useNavigate();
  const { showModal } = useModalContext();

  const onResume = async (values: ReferInfo) => {
    const result = await checkData(values.refer);

    const dataResult = result as {
      data: Charity;
      error: FetchBaseQueryError | SerializedError;
    };

    if (dataResult.error) {
      showModal(Popup, {
        message:
          "No active charity application found with this registration reference",
      });
      return console.log(dataResult.error);
    }

    const charity = createInitializedCharity(dataResult.data);
    dispatch(updateCharity(charity));

    if (charity.ContactPerson.EmailVerified) {
      navigate(`${siteRoutes.app}/${appRoutes.register}/${routes.dashboard}`);
    } else {
      navigate(`${siteRoutes.app}/${appRoutes.register}/${routes.confirm}`, {
        state: { is_sent: true },
      });
    }
  };

  return { onResume };
};
