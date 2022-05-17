import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateNewCharityMutation,
  useRequestEmailMutation,
  useUpdatePersonDataMutation,
} from "services/aws/registration";
import { ContactDetailsRequest } from "services/aws/types";
import { useModalContext } from "components/ModalContext/ModalContext";
import Popup from "components/Popup/Popup";
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

      if ("error" in result) {
        setError(true);

        const fetchError = result.error as FetchBaseQueryError;
        if (fetchError) {
          if (fetchError.status === 409) {
            handleError(
              fetchError,
              `${fetchError.data} Please check your email for the registration reference.`
            );
          } else {
            handleError(fetchError, `${fetchError.data}`);
          }
        } else {
          handleError(result.error, FORM_ERROR);
        }

        return;
      }

      const { data } = result;

      dispatch(
        updateCharity({
          ...charity,
          ContactPerson: {
            ...charity.ContactPerson,
            ...data.ContactPerson,
          },
          Registration: {
            ...charity.Registration,
            ...data.Registration,
          },
        })
      );

      if (!is_create) {
        return navigate(`${site.app}/${app.register}/${routes.dashboard}`);
      }

      // Extracting SK, EmailVerified so that 'contactPerson' does not include them
      const { PK, SK, EmailVerified, ...contactPerson } = data.ContactPerson;

      await resendEmail({
        uuid: PK,
        type: "verify-email",
        body: {
          ...contactPerson,
          CharityName: data.Registration.CharityName,
        },
      });
      navigate(`${site.app}/${app.register}/${routes.confirm}`);
    },
    [
      charity,
      dispatch,
      showModal,
      handleError,
      navigate,
      registerCharity,
      resendEmail,
      updateContactPerson,
    ]
  );

  return {
    isError,
    saveContactDetails,
  };
}
