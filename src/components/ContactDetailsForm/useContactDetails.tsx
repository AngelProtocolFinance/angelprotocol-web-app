import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useCreateNewCharityMutation,
  useRequestEmailMutation,
  useUpdatePersonDataMutation,
} from "services/aws/registration";
import { updateUserData } from "services/user/userSlice";
import { useGetter, useSetter } from "store/accessors";
import { registration } from "types/routes";
import { ContactDetails } from "./types";

export default function useContactDetails() {
  const [registerCharity] = useCreateNewCharityMutation();
  const [resendEmail] = useRequestEmailMutation();
  const [updateContactPerson] = useUpdatePersonDataMutation();
  const history = useHistory();
  const dispatch = useSetter();
  const user = useGetter((state) => state.user);

  const saveContactInfo = useCallback(
    async (contactData: ContactDetails) => {
      // call API to add or update contact details information(contactData)
      const is_create = !contactData?.uniqueID;
      const postData = {
        Registration: {
          CharityName: contactData.charityName,
        },
        ContactPerson: {
          UUID: contactData.uniqueID,
          FirstName: contactData.firstName,
          LastName: contactData.lastName,
          Email: contactData.email,
          PhoneNumber: contactData.phone,
          Role: contactData.orgRole,
          OtherRole: contactData.otherRole || "",
        },
      };

      let result: any = {};
      if (is_create) {
        const response: any = await registerCharity(postData);
        result = response.data ? response.data : response.error.data;
      } else {
        const response: any = await updateContactPerson(postData);
        result = response.data ? response.data : response.error.data;
      }

      if (result.UUID || result.message === "Updated successfully!") {
        if (!is_create) {
          toast.success(result.message);
        } else {
          await resendEmail({
            uuid: result.UUID,
            type: "verify-email",
            body: {
              ...postData.ContactPerson,
              CharityName: postData.Registration.CharityName,
            },
          });
          dispatch(
            updateUserData({
              ...user,
              ...postData.ContactPerson,
              CharityName: postData.Registration.CharityName,
              RegistrationDate: new Date().toISOString(),
              RegistrationStatus: "Not Complete",
              EmailVerified: false,
              PK: result.UUID || contactData.uniqueID,
            })
          );
          history.push(registration.confirm);
        }
      } else {
        toast.error(result.message);
      }
    },
    [dispatch, history, registerCharity, resendEmail, updateContactPerson, user]
  );

  return { saveContactInfo };
}
