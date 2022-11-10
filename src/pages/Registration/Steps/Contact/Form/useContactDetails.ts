import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FormValues } from "../types";
import {
  ContactDetailsRequest,
  ContactRoles,
  ReferralMethods,
} from "types/aws";
import { GENERIC_ERROR_MESSAGE } from "pages/Registration/constants";
import {
  useCreateNewApplicationMutation,
  useRegistrationQuery,
  useUpdatePersonDataMutation,
} from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";

export default function useSaveContactDetails() {
  const [registerCharity] = useCreateNewApplicationMutation();
  const [updateContactPerson] = useUpdatePersonDataMutation();
  const { application: originalApplication } = useRegistrationQuery();
  const navigate = useNavigate();
  const { handleError } = useErrorContext();

  const saveContactDetails = useCallback(
    async (fv: FormValues) => {
      // call API to add or update contact details information(contactData)
      try {
        const postData: ContactDetailsRequest = {
          PK: fv.ref,
          body: {
            Registration: {
              OrganizationName: fv.orgName,
            },
            ContactPerson: {
              FirstName: fv.firstName,
              LastName: fv.lastName,
              Email: fv.email,
              Goals: fv.goal,
              OtherReferralMethod: "",
              OtherRole: fv.orgRole,
              PhoneNumber: fv.phone,
              ReferralMethod: fv.referralMethod as ReferralMethods,
              Role: fv.orgRole as ContactRoles,
              EmailVerified: true,
            },
          },
        };

        const result = await updateContactPerson(postData);

        if ("error" in result) {
          alert("error saving contact details");
        }
      } catch (error) {
        handleError(error, GENERIC_ERROR_MESSAGE);
      }
    },
    [
      originalApplication,
      handleError,
      navigate,
      registerCharity,
      updateContactPerson,
    ]
  );

  return {
    saveContactDetails,
  };
}
