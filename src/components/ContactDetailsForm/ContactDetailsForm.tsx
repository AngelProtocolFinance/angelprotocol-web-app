import { yupResolver } from "@hookform/resolvers/yup";
import Action from "components/ActionButton/Action";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { registration } from "types/routes";
import { Selector } from "../../components/Selector/Selector";
import { userRoles } from "../../constants/userRoles";
import PrivacyPolicyCheckbox from "./PrivacyPolicyCheckbox";
import Input from "./Input";
import {
  ContactDetails,
  ContactInfoSchema,
  useContactDetails,
} from "./useContactDetails";

export default function ContactDetailsForm(props: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [orgRole, setOrgRole] = useState(props.contactData?.Role || "");
  const { saveContactInfo } = useContactDetails();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(ContactInfoSchema),
    defaultValues: {
      charityName: props.contactData?.CharityName || "",
      firstName: props.contactData?.FirstName || "",
      lastName: props.contactData?.LastName || "",
      email: props.contactData?.Email || "",
      phone: props.contactData?.PhoneNumber || "",
      orgRole: props.contactData?.Role || "ceo",
      otherRole: props.contactData?.otherRole || "",
      checkedPolicy: false,
      uniqueID: props.contactData?.PK || "",
    },
  });

  const onSumbitContactDetails = useCallback(
    async (values: ContactDetails) => {
      setIsLoading(true);
      await saveContactInfo(values);
      setIsLoading(false);
    },
    [saveContactInfo]
  );

  console.log(control._formValues);

  return (
    <div className="flex items-center justify-center">
      <form
        className="md:w-4/5 text-left"
        onSubmit={handleSubmit(onSumbitContactDetails)}
      >
        <div className=" grid grid-cols-1 sm:grid-cols-2">
          <div className="">
            <Input
              label="Name of your organization"
              placeholder="Organization"
              registerReturn={register("charityName")}
              errorMessage={errors.charityName?.message}
              required
            />
            <Input
              label="First name"
              placeholder="First name"
              registerReturn={register("firstName")}
              errorMessage={errors.firstName?.message}
              required
            />
            <Input
              label="Last name"
              placeholder="Last name"
              registerReturn={register("lastName")}
              errorMessage={errors.lastName?.message}
              required
            />
            <Input
              type="email"
              label="E-mail address"
              placeholder="E-mail address"
              registerReturn={register("email")}
              errorMessage={errors.email?.message}
              required
            />
          </div>
          <div className="">
            <Input
              label="Phone number"
              placeholder="Phone number"
              registerReturn={register("phone")}
            />
            <div className="items-center justify-center mb-4">
              <div className="text-left">
                <span className="text-base text-left">
                  What's your role within the organization?
                  <span className="text-base text-failed-red">*</span>
                </span>
              </div>
              <div className="">
                <div className="mr-5 rounded-md bg-white flex items-center text-black">
                  <Selector
                    name="orgRole"
                    placeholder="Role"
                    options={userRoles}
                    control={control}
                    register={register}
                    onChange={(value: string) => setOrgRole(value)}
                  />
                </div>
                <p className="text-sm text-failed-red">
                  {errors.orgRole?.message}
                </p>
              </div>
            </div>
            {orgRole === "other" && (
              <Input
                label="Specify your role"
                placeholder="Specify your role"
                registerReturn={register("otherRole")}
                errorMessage={errors.otherRole?.message}
                required
              />
            )}
          </div>
        </div>
        <PrivacyPolicyCheckbox
          error={errors.checkedPolicy?.message}
          registerReturn={register("checkedPolicy")}
        />
        <div className="text-center flex justify-center">
          {props.contactData?.PK && (
            <div className="mr-2">
              <button
                className="disabled:bg-gray-300 bg-dark-grey w-48 h-12 rounded-xl uppercase text-base font-bold text-white"
                onClick={() => history.push(registration.status)}
                disabled={isLoading}
              >
                back
              </button>
            </div>
          )}
          <div className="mr-2">
            <Action
              submit
              title="Continue"
              classes="bg-thin-blue w-48 h-12"
              disabled={isLoading}
              isLoading={isLoading}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
