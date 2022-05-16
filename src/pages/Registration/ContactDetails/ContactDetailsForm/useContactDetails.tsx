import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContactValues } from "@types-page/registration";
import { ContactDetailsRequest } from "@types-server/aws";
import useHandleError from "pages/Registration/useHandleError";
import {
  useCreateNewCharityMutation,
  useRequestEmailMutation,
  useUpdatePersonDataMutation,
} from "services/aws/registration";
import { useModalContext } from "contexts/ModalContext/ModalContext";
import Popup from "components/Popup/Popup";
import { useGetter, useSetter } from "store/accessors";
import { appRoutes, siteRoutes } from "constants/routes";
import routes from "../../routes";
import { updateCharity } from "../../store";

export default function useSaveContactDetails() {
  const [registerCharity] = useCreateNewCharityMutation();
  const [resendEmail] = useRequestEmailMutation();
  const [updateContactPerson] = useUpdatePersonDataMutation();
  const navigate = useNavigate();
  const dispatch = useSetter();
  const charity = useGetter((state) => state.charity);
  const [isError, setError] = useState(false);
  const handleError = useHandleError();
  const { showModal } = useModalContext();

  const saveContactDetails = useCallback(
    async (contactData: ContactValues) => {
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
        const resultError =
          (result.error as FetchBaseQueryError) ||
          (result as SerializedError).message;

        if (resultError.status === 409) {
          showModal(Popup, {
            message: `${resultError.data} Please check your email for the registration reference.`,
          });
        } else if (resultError.status !== 409) {
          showModal(Popup, {
            message: `${resultError.data}`,
          });
        } else {
          showModal(Popup, {
            message: `${resultError}`,
          });
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
        return navigate(
          `${siteRoutes.app}/${appRoutes.register}/${routes.dashboard}`
        );
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
      navigate(`${siteRoutes.app}/${appRoutes.register}/${routes.confirm}`);
    },
    [
      charity,
      dispatch,
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
