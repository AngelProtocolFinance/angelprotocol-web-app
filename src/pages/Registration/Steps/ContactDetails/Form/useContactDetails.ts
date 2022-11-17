import { FormValues } from "../types";
import { ContactRoles, ReferralMethods } from "types/aws";
import { useUpdateRegMutation } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { handleMutationResult } from "helpers";

export default function useSaveContactDetails() {
  const [updateReg] = useUpdateRegMutation();
  const { handleError } = useErrorContext();

  const saveContactDetails = async (fv: FormValues) => {
    handleMutationResult(
      await updateReg({
        type: "contact details",
        reference: fv.ref,
        ContactPerson: {
          FirstName: fv.firstName,
          LastName: fv.lastName,
          Email: fv.email,
          Goals: fv.goals,
          PhoneNumber: fv.phone,
          ReferralMethod: fv.referralMethod as ReferralMethods,
          Role: fv.role as ContactRoles,
        },
        Registration: {
          OrganizationName: fv.orgName,
        },
      }),
      handleError
    );
  };

  return {
    saveContactDetails,
  };
}
