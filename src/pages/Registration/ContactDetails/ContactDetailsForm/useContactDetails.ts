import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContactDetails } from "pages/Registration/types";
import { ContactDetailsRequest } from "types/aws";
import { GENERIC_ERROR_MESSAGE } from "pages/Registration/constants";
import {
  useCreateNewCharityMutation,
  useRegistrationQuery,
  useUpdatePersonDataMutation,
} from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { storeRegistrationReference } from "helpers";
import { appRoutes } from "constants/routes";
import routes from "../../routes";

export default function useSaveContactDetails() {
  const [registerCharity] = useCreateNewCharityMutation();
  const [updateContactPerson] = useUpdatePersonDataMutation();
  const { charity: originalCharityData } = useRegistrationQuery();
  const navigate = useNavigate();
  const [isError, setError] = useState(false);
  const { handleError } = useErrorContext();

  const saveContactDetails = useCallback(
    async (contactData: ContactDetails) => {
      // call API to add or update contact details information(contactData)
      try {
        setError(false);
        const is_create = !contactData?.uniqueID;
        // the submitted email is considered 'verified' only if it:
        // 1. was already verified
        // 2. is the same as the the pre-contact-details-update email
        const isEmailVerified =
          !!originalCharityData.ContactPerson.EmailVerified &&
          originalCharityData.ContactPerson.Email === contactData.email;

        const postData: ContactDetailsRequest = {
          PK: contactData.uniqueID,
          body: {
            Registration: {
              OrganizationName: contactData.organizationName,
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
              EmailVerified: is_create ? undefined : isEmailVerified,
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
            handleError(result.error, GENERIC_ERROR_MESSAGE);
          }

          return;
        }

        // if the user is updating contact details, that means they navigated to step 1 from the dashboard
        // return them back there
        if (!is_create && isEmailVerified) {
          return navigate(`${appRoutes.register}/${routes.dashboard}`);
        }

        // otherwise they are submitting the data for the first time, so save the reg. reference
        // and navigate to the next registration step
        storeRegistrationReference(result.data.ContactPerson.PK || "");
        navigate(`${appRoutes.register}/${routes.confirmEmail}`);
      } catch (error) {
        handleError(error, GENERIC_ERROR_MESSAGE);
      }
    },
    [
      originalCharityData,
      handleError,
      navigate,
      registerCharity,
      updateContactPerson,
    ]
  );

  return {
    isError,
    saveContactDetails,
  };
}
