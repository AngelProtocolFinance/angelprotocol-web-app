import { FormikHelpers } from "formik";
import { useHistory } from "react-router-dom";
import { register } from "types/routes";
import { ContactDetails } from "./ContactDetailsForm";
import {
  CreateNewCharity,
  BuildEmail,
  UpdateContactPerson,
} from "aws-settings.config";
import * as Yup from "yup";
import {
  registerAPIs,
  useCreateNewCharityMutation,
  useRequestEmailMutation,
} from "api/registerAPIs";
import { useDispatch } from "react-redux";
import { UserSlice } from "Redux/slices/userSlice";
import { toast } from "react-toastify";

export const ContactInfoSchema = Yup.object().shape({
  charityName: Yup.string().required(
    "Please enter the name of your organization."
  ),
  firstName: Yup.string().required("Please enter your first name."),
  lastName: Yup.string().required("Please enter your last name"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Please enter your email."),
  orgRole: Yup.string().required(
    "Please select your role within your organization."
  ),
});

export const useContactDetails = () => {
  const [registerCharity, { isLoading }] = useCreateNewCharityMutation();
  const [resendEmail] = useRequestEmailMutation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { updateUserData } = UserSlice.actions;

  async function saveContactInfo(
    contactData: ContactDetails,
    actions: FormikHelpers<ContactDetails>
  ) {
    actions.setSubmitting(true);
    // call API to add or update contact details information(contactData)
    const is_create = !contactData?.uniqueID;
    console.log("is create flag => ", is_create);
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
        Role:
          contactData.orgRole !== "Other"
            ? contactData.orgRole
            : contactData.otherRole,
      },
    };

    let result: any = {};
    if (is_create) {
      result = await CreateNewCharity(postData);
      // result = await registerCharity(postData);   /// use registerAPIs hook
    } else {
      result = await UpdateContactPerson(postData);
    }

    if (result.UUID || result.message === "Updated successfully!") {
      dispatch(
        updateUserData({
          ...postData.ContactPerson,
          CharityName: postData.Registration.CharityName,
          RegistrationDate: new Date().toISOString(),
          RegistrationStatus: "Not Complete",
          EmailVerified: false,
          PK: result.UUID,
        })
      );
      if (is_create) {
        toast.success(result.message);
      } else {
        // await resendEmail({
        //   uuid: result.UUID,
        //   type: "verify-email",
        //   body: {
        //     ...postData.ContactPerson,
        //     CharityName: postData.Registration.CharityName,
        //   },
        // });   /// use API hook
        await BuildEmail({
          uuid: result.UUID,
          type: "verify-email",
          body: {
            ...postData.ContactPerson,
            CharityName: postData.Registration.CharityName,
          },
        });
        history.push(register.confirm);
      }
    } else {
      toast.error(result.message);
    }

    actions.setSubmitting(false);
  }
  return { saveContactInfo };
};
