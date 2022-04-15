import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "pages/Registration/store";
import { updateUser } from "pages/Registration/store";
import {
  useCreateNewCharityMutation,
  useRequestEmailMutation,
  useUpdatePersonDataMutation,
} from "services/aws/registration";
import { ContactDetailsData } from "services/aws/types";
import { useSetModal } from "components/Modal/Modal";
import Popup, { PopupProps } from "components/Popup/Popup";
import { useGetter, useSetter } from "store/accessors";
import { app, site } from "constants/routes";
import routes from "../../routes";
import { ContactDetails } from "./types";

export default function useSaveContactDetails() {
  const [registerCharity] = useCreateNewCharityMutation();
  const [resendEmail] = useRequestEmailMutation();
  const [updateContactPerson] = useUpdatePersonDataMutation();
  const navigate = useNavigate();
  const dispatch = useSetter();
  const user = useGetter((state) => state.user);
  const [error, setError] = useState(false);
  const { showModal } = useSetModal();

  const handleUpdateUser = useCallback(
    (postData: ContactDetailsData) => {
      const newUserData: User = {
        ...user,
        ContactPerson: {
          ...user.ContactPerson,
          ...postData.ContactPerson,
          EmailVerified: false,
        },
        Registration: {
          ...user.Registration,
          CharityName: postData.Registration.CharityName,
          RegistrationDate: new Date().toISOString(),
          RegistrationStatus: "Not Complete",
        },
      };
      dispatch(updateUser(newUserData));
    },
    [dispatch, user]
  );

  const saveContactDetails = useCallback(
    async (contactData: ContactDetails) => {
      // call API to add or update contact details information(contactData)
      setError(false);
      const is_create = !contactData?.uniqueID;
      const postData: ContactDetailsData = {
        PK: contactData.uniqueID,
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

      const response: any = is_create
        ? await registerCharity(postData)
        : await updateContactPerson(postData);
      const result = response.data ? response.data : response.error.data;

      if (result.UUID || result.message === "Updated successfully!") {
        handleUpdateUser(postData);
        if (!is_create) {
          console.log(result.message);
          navigate(`${site.app}/${app.register}/${routes.dashboard}`);
        } else {
          await resendEmail({
            uuid: result.UUID,
            type: "verify-email",
            body: {
              ...postData.ContactPerson,
              CharityName: postData.Registration.CharityName,
            },
          });
          navigate(`${site.app}/${app.register}/${routes.confirm}`);
        }
      } else {
        setError(true);
        showModal<PopupProps>(Popup, {
          message: `${result.message} Please check your email for the registration reference.`,
        });
      }
    },
    [
      navigate,
      registerCharity,
      resendEmail,
      showModal,
      updateContactPerson,
      handleUpdateUser,
    ]
  );

  return {
    error,
    saveContactDetails,
  };
}
