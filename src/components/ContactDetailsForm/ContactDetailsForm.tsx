import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { registration, site, web } from "types/routes";
import {
  ContactDetails,
  ContactInfoSchema,
  useContactDetails,
} from "./useContactDetails";
import { userRoles } from "../../constants/userRoles";
import { Selector } from "../../components/Selector/Selector";
import Action from "components/ActionButton/Action";

export const ContactDetailsForm = (props: any) => {
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
      checkedPolicy: props.contactData ? true : false,
      uniqueID: props.contactData?.PK || "",
    },
  });

  const onSumbitContactDetails = async (values: ContactDetails) => {
    setIsLoading(true);
    await saveContactInfo(values);
    setIsLoading(false);
  };
  return (
    <div className="flex items-center justify-center">
      <form
        className="md:w-4/5 text-left"
        onSubmit={handleSubmit(onSumbitContactDetails)}
      >
        <div className=" grid grid-cols-1 sm:grid-cols-2">
          <div className="">
            <div className="items-center justify-center mb-4">
              <div className="text-left">
                <span className="text-base">
                  Name of your organization
                  <span className="text-base text-failed-red">*</span>
                  <input {...register("uniqueID")} type="hidden" />
                </span>
              </div>
              <div className="">
                <div className="mr-5 rounded-md bg-white flex items-center text-black py-2">
                  <input
                    {...register("charityName")}
                    type="text"
                    className="outline-none border-none w-full px-3"
                    placeholder="Organization"
                    disabled={props.contactData?.PK !== ""}
                  />
                </div>
                <p className="text-sm text-failed-red">
                  {errors.charityName?.message}
                </p>
              </div>
            </div>
            <div className="items-center justify-center mb-4">
              <div className="text-left">
                <span className="text-base text-left">
                  First name
                  <span className="text-base text-failed-red">*</span>
                </span>
              </div>
              <div className="">
                <div className="mr-5 rounded-md bg-white flex items-center text-black py-2">
                  <input
                    {...register("firstName")}
                    type="text"
                    className="outline-none border-none w-full px-3"
                    placeholder="First Name"
                  />
                </div>
                <p className="text-sm text-failed-red">
                  {errors.firstName?.message}
                </p>
              </div>
            </div>
            <div className="items-center justify-center mb-4">
              <div className="text-left">
                <span className="text-base text-left">
                  Last name
                  <span className="text-base text-failed-red">*</span>
                </span>
              </div>
              <div className="">
                <div className="mr-5 rounded-md bg-white flex items-center text-black py-2">
                  <input
                    {...register("lastName")}
                    type="text"
                    className="outline-none border-none w-full px-3"
                    placeholder="Last Name"
                  />
                </div>
                <p className="text-sm text-failed-red">
                  {errors.lastName?.message}
                </p>
              </div>
            </div>
            <div className="items-center justify-center mb-4">
              <div className="text-left">
                <span className="text-base text-left">
                  E-mail address
                  <span className="text-base text-failed-red">*</span>
                </span>
              </div>
              <div className="">
                <div className="mr-5 rounded-md bg-white flex items-center text-black py-2">
                  <input
                    {...register("email")}
                    type="email"
                    className="outline-none border-none w-full px-3"
                    placeholder="email Address"
                  />
                </div>
                <p className="text-sm text-failed-red">
                  {errors.email?.message}
                </p>
              </div>
            </div>
          </div>
          <div className="">
            <div className="items-center justify-center mb-4">
              <div className="text-left">
                <span className="text-base text-left">phone number</span>
              </div>
              <div className="">
                <div className="mr-5 rounded-md bg-white flex items-center text-black py-2">
                  <input
                    {...register("phone")}
                    type="text"
                    className="outline-none border-none w-full px-3"
                    placeholder="phone Number"
                  />
                </div>
              </div>
            </div>
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
              <div className="items-center justify-center mb-4">
                <div className="text-left">
                  <span className="text-base text-left">
                    please specify
                    <span className="text-base text-failed-red">*</span>
                  </span>
                </div>
                <div className="">
                  <div className="mr-5 rounded-md bg-white flex items-center w-2/5text-black py-2">
                    <input
                      {...register("otherRole")}
                      type="text"
                      className="outline-none border-none w-full px-3 text-black"
                      placeholder="Specify Your Role"
                    />
                  </div>
                  <p className="text-sm text-failed-red">
                    {errors.otherRole?.message}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 items-center justify-center mb-4 mt-10">
          {!props.contactData && (
            <div className="mx-auto">
              <div className="mr-5 items-center pt-2 text-center justify-center">
                <label>
                  <input
                    type="checkbox"
                    name="checkedPolicy"
                    className="mr-2"
                  />
                  <span className="text-base">
                    {" "}
                    By checking this box, you declare that you have read and
                    agreed our{" "}
                    <Link
                      to={`${site.home}${web.privacy}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="underline"
                    >
                      Privacy Policy
                    </Link>
                    <span className="text-base text-failed-red">*</span>
                  </span>
                </label>
              </div>
              <p className="text-sm text-failed-red">
                {errors.checkedPolicy?.message}
              </p>
            </div>
          )}
        </div>
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
              title="Save"
              classes="bg-thin-blue w-48 h-12"
              disabled={isLoading}
              isLoading={isLoading}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
