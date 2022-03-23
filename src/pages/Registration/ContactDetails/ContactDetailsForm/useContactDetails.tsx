import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateNewCharityMutation,
  useRequestEmailMutation,
  useUpdatePersonDataMutation,
} from "services/aws/registration";
import { ContactDetailsData } from "services/aws/types";
import { updateUserData } from "services/user/userSlice";
import { useGetter, useSetter } from "store/accessors";
import routes, { registerRootPath } from "../../routes";
import { ContactDetails } from "./types";

export default function useSaveContactDetails() {
  const [registerCharity] = useCreateNewCharityMutation();
  const [resendEmail] = useRequestEmailMutation();
  const [updateContactPerson] = useUpdatePersonDataMutation();
  const navigate = useNavigate();
  const dispatch = useSetter();
  const user = useGetter((state) => state.user);

  const saveContactDetails = useCallback(
    async (contactData: ContactDetails) => {
      // call API to add or update contact details information(contactData)
      const is_create = !contactData?.uniqueID;
      const postData: ContactDetailsData = {
        Registration: {
          CharityName: contactData.charityName,
        },
        ContactPerson: {
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
        postData.ContactPerson.UUID = contactData.uniqueID;
        const response: any = await updateContactPerson(postData);
        result = response.data ? response.data : response.error.data;
      }

      if (result.UUID || result.message === "Updated successfully!") {
        if (!is_create) {
          console.log(result.message);
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
          navigate(`${registerRootPath}/${routes.confirm}`);
        }
      } else {
        console.error(result.message);
      }
    },
    [
      dispatch,
      navigate,
      registerCharity,
      resendEmail,
      updateContactPerson,
      user,
    ]
  );

  return saveContactDetails;
}
