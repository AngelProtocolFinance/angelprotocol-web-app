import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useCheckPreviousRegistrationMutation } from "services/aws/registration";
import { CharityData } from "services/aws/types";
import { UserTypes } from "services/user/types";
import { updateUserData } from "services/user/userSlice";
import { useSetModal } from "components/Modal/Modal";
import Popup, { PopupProps } from "components/Popup/Popup";
import { useSetter } from "store/accessors";
import createAuthToken from "helpers/createAuthToken";
import { app, site } from "constants/routes";
import createUserData from "./createUserData";
import routes from "./routes";

export type ReferInfo = { refer: string };

export const FormInfoSchema = Yup.object().shape({
  refer: Yup.string().required("Please enter your registration reference."),
});

export const useRegistration = () => {
  const [checkData] = useCheckPreviousRegistrationMutation();
  const dispatch = useSetter();
  const navigate = useNavigate();
  const { showModal } = useSetModal();

  const onResume = async (values: ReferInfo) => {
    const result = await checkData(values.refer);

    const dataResult = result as {
      data: CharityData;
      error: FetchBaseQueryError | SerializedError;
    };

    if (dataResult.error) {
      showModal<PopupProps>(Popup, {
        message:
          "No active charity application found with this registration reference",
      });
      return console.log(dataResult.error);
    }

    const { data } = dataResult;

    const token = createAuthToken(UserTypes.CHARITY_OWNER);
    const userData = createUserData(data, token);
    dispatch(updateUserData(userData));
    localStorage.setItem("userData", JSON.stringify(userData));
    if (userData.ContactPerson.EmailVerified) {
      navigate(`${site.app}/${app.register}/${routes.dashboard}`);
    } else {
      navigate(`${site.app}/${app.register}/${routes.confirm}`, {
        state: { is_sent: true },
      });
    }
  };

  return { onResume };
};
