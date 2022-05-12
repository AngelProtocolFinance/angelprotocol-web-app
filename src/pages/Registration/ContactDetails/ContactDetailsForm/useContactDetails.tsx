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
import { useModalContext } from "components/ModalContext/ModalContext";
import Popup, { PopupProps } from "components/Popup/Popup";
import { useGetter, useSetter } from "store/accessors";
import { app, site } from "constants/routes";
import routes from "../../routes";
import { updateCharity } from "../../store";
import { ContactDetails } from "./types";

export default function useSaveContactDetails() {
  const [registerCharity] = useCreateNewCharityMutation();
  const [resendEmail] = useRequestEmailMutation();
  const [updateContactPerson] = useUpdatePersonDataMutation();
  const navigate = useNavigate();
  const dispatch = useSetter();
  const charity = useGetter((state) => state.charity);
  const [isError, setError] = useState(false);
  const { showModal } = useModalContext();

  const handleUpdateCharity = useCallback(
    (result: ContactDetailsData) => {
      dispatch(
        updateCharity({
          ...charity,
          ContactPerson: {
            ...charity.ContactPerson,
            ...result.ContactPerson,
          },
          Registration: {
            ...charity.Registration,
            ...result.Registration,
          },
        })
      );
    },
    [dispatch, charity]
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
            OtherRole: contactData.otherRole,
            PhoneNumber: contactData.phone,
            Role: contactData.role,
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
          (dataResult.error as FetchBaseQueryError) ||
          (dataResult as SerializedError).message;

        if (resultError.status === 409) {
          showModal<PopupProps>(Popup, {
            message: `${resultError.data} Please check your email for the registration reference.`,
          });
        } else if (resultError.status !== 409) {
          showModal<PopupProps>(Popup, {
            message: `${resultError.data}`,
          });
        } else {
          showModal<PopupProps>(Popup, {
            message: `${resultError}`,
          });
        }

        return;
      }

      handleUpdateCharity(dataResult.data);

      if (!is_create) {
        navigate(`${site.app}/${app.register}/${routes.dashboard}`);
        return;
      }

      // Extracting SK, EmailVerified so that 'contactPerson' does not include them
      const { PK, SK, EmailVerified, ...contactPerson } =
        dataResult.data.ContactPerson;

      await resendEmail({
        uuid: PK,
        type: "verify-email",
        body: {
          ...contactPerson,
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
      handleUpdateCharity,
    ]
  );

  return {
    isError,
    saveContactDetails,
  };
}
