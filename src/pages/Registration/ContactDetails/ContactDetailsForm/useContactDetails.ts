import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContactDetails } from "pages/Registration/types";
import { ContactDetailsRequest } from "types/server/aws";
import { FORM_ERROR } from "pages/Registration/constants";
import {
  registrationRefKey,
  useCreateNewCharityMutation,
  useRequestEmailMutation,
  useUpdatePersonDataMutation,
} from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { appRoutes, siteRoutes } from "constants/routes";
import routes from "../../routes";

export default function useSaveContactDetails() {
  const [registerCharity] = useCreateNewCharityMutation();
  const [resendEmail] = useRequestEmailMutation();
  const [updateContactPerson] = useUpdatePersonDataMutation();
  const navigate = useNavigate();
  const [isError, setError] = useState(false);
  const { handleError } = useErrorContext();

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
            Goals: contactData.goals,
            OtherReferralMethod: contactData.otherReferralMethod,
            OtherRole: contactData.otherRole,
            PhoneNumber: contactData.phone,
            ReferralMethod: contactData.referralMethod,
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

      if (!is_create) {
        return navigate(
          `${siteRoutes.app}/${appRoutes.register}/${routes.dashboard}`
        );
      }

      const { data } = result;
      // Extracting SK, EmailVerified so that 'contactPerson' does not include them
      const { PK, SK, EmailVerified, ...contactPerson } = data.ContactPerson;
      //save ref before invalidating empty cache to retrigger fetch
      localStorage.setItem(registrationRefKey, PK || "");
      //sending this email invalidated registration query cache
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
    [handleError, navigate, registerCharity, resendEmail, updateContactPerson]
  );

  return {
    isError,
    saveContactDetails,
  };
}
