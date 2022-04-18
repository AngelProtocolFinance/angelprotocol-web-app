import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateNewCharityMutation,
  useRequestEmailMutation,
  useUpdatePersonDataMutation,
} from "services/aws/registration";
import { ContactDetailsData, ContactDetailsRequest } from "services/aws/types";
import { useSetModal } from "components/Modal/Modal";
import Popup, { PopupProps } from "components/Popup/Popup";
import { useGetter, useSetter } from "store/accessors";
import { app, site } from "constants/routes";
import routes from "../../routes";
import { User, updateUser } from "../../store";
import { ContactDetails } from "./types";

export default function useSaveContactDetails() {
  const [registerCharity] = useCreateNewCharityMutation();
  const [resendEmail] = useRequestEmailMutation();
  const [updateContactPerson] = useUpdatePersonDataMutation();
  const navigate = useNavigate();
  const dispatch = useSetter();
  const user = useGetter((state) => state.user);
  const [isError, setError] = useState(false);
  const { showModal } = useSetModal();

  const handleUpdateUser = useCallback(
    (result: ContactDetailsData) => {
      const newUserData: User = {
        ...user,
        ContactPerson: {
          ...user.ContactPerson,
          ...result.ContactPerson,
        },
        Registration: {
          ...user.Registration,
          CharityName: result.Registration.CharityName,
          RegistrationDate: new Date().toISOString(),
          RegistrationStatus: "Not Complete",
        },
      };
      dispatch(updateUser(newUserData));
    },
    [dispatch, user]
  );

  const saveContactDetails = useCallback(
    async (contactData: ContactDetails) => {
      // call API to add or update contact details information(contactData)
      setError(false);
      const is_create = !contactData?.uniqueID;
      const postData: ContactDetailsRequest = {
        PK: contactData.uniqueID,
        body: {
          Registration: {
            CharityName: contactData.charityName,
          },
          ContactPerson: {
            FirstName: contactData.firstName,
            LastName: contactData.lastName,
            Email: contactData.email,
            PhoneNumber: contactData.phone,
            Role: contactData.orgRole,
            OtherRole: contactData.otherRole,
          },
        },
      };

      const result = is_create
        ? await registerCharity(postData)
        : await updateContactPerson(postData);

      const dataResult = result as {
        data: ContactDetailsData;
        error: FetchBaseQueryError | SerializedError;
      };

      if (!!dataResult.error) {
        setError(true);
        const resultError =
          dataResult.error ||
          (dataResult.error as FetchBaseQueryError).data ||
          (dataResult as SerializedError).message;

        showModal<PopupProps>(Popup, {
          message: `${resultError} Please check your email for the registration reference.`,
        });
        return;
      }

      handleUpdateUser(dataResult.data);

      if (!is_create) {
        navigate(`${site.app}/${app.register}/${routes.dashboard}`);
        return;
      }

      await resendEmail({
        uuid: dataResult.data.ContactPerson.PK,
        type: "verify-email",
        body: {
          ...dataResult.data.ContactPerson,
          CharityName: dataResult.data.Registration.CharityName,
        },
      });
      navigate(`${site.app}/${app.register}/${routes.confirm}`);
    },
    [
      navigate,
      registerCharity,
      resendEmail,
      showModal,
      updateContactPerson,
      handleUpdateUser,
    ]
  );

  return {
    isError,
    saveContactDetails,
  };
}
