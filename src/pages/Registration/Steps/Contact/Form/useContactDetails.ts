import { FormValues } from "../types";
import {
  ContactDetailsRequest,
  ContactRoles,
  ReferralMethods,
} from "types/aws";
import { GENERIC_ERROR_MESSAGE } from "pages/Registration/constants";
import { useUpdatePersonDataMutation } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";

export default function useSaveContactDetails() {
  const [updateContactPerson] = useUpdatePersonDataMutation();
  const { handleError } = useErrorContext();

  const saveContactDetails = async (fv: FormValues) => {
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
  };

  return {
    saveContactDetails,
  };
}
