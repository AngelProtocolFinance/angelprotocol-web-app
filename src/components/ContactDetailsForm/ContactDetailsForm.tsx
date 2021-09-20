import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { routes } from "types/types";
import { ContactInfoSchema, useContactDetails } from "./useContactDetails";

export type ContactDetails = {
  charityName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  orgRole: string;
  otherRole: string;
  checkedPolicy: boolean;
  uniqueID: string;
};
export const ContactDetailsForm = (props: any) => {
  const { saveContactInfo } = useContactDetails();
  console.log(props.contactData);
  return (
    <Formik
      initialValues={{
        charityName: props.contactData?.charityName || "",
        firstName: props.contactData?.firstName || "",
        lastName: props.contactData?.lastName || "",
        email: props.contactData?.email || "",
        phone: props.contactData?.phone || "",
        orgRole: props.contactData?.orgRole || "ceo",
        otherRole: props.contactData?.otherRole || "",
        checkedPolicy: false,
        uniqueID: props.contactData?.uniqueID || "",
      }}
      validationSchema={ContactInfoSchema}
      onSubmit={saveContactInfo}
    >
      {({ values, isSubmitting }) => (
        <div className="flex items-center justify-center">
          <Form className="md:w-4/5 text-left">
            <div className=" grid grid-cols-1 sm:grid-cols-2">
              <div className="">
                <div className="items-center justify-center mb-4">
                  <div className="text-left">
                    <span className="text-md">
                      Name of your organization
                      <span className="text-md text-failed-red">*</span>
                      <Field
                        type="hidden"
                        value={values.uniqueID}
                        name="uniqueID"
                      />
                    </span>
                  </div>
                  <div className="">
                    <div className="mr-5 rounded-md bg-white flex items-center text-black py-2">
                      <Field
                        type="text"
                        className="outline-none border-none w-full px-3"
                        placeholder="Organization"
                        value={values.charityName}
                        name="charityName"
                      />
                    </div>
                    <ErrorMessage
                      className="text-sm text-failed-red"
                      name="charityName"
                      component="div"
                    />
                  </div>
                </div>
                <div className="items-center justify-center mb-4">
                  <div className="text-left">
                    <span className="text-md text-left">
                      First name
                      <span className="text-md text-failed-red">*</span>
                    </span>
                  </div>
                  <div className="">
                    <div className="mr-5 rounded-md bg-white flex items-center text-black py-2">
                      <Field
                        type="text"
                        className="outline-none border-none w-full px-3"
                        placeholder="First Name"
                        value={values.firstName}
                        name="firstName"
                      />
                    </div>
                    <ErrorMessage
                      className="text-sm text-failed-red"
                      name="firstName"
                      component="div"
                    />
                  </div>
                </div>
                <div className="items-center justify-center mb-4">
                  <div className="text-left">
                    <span className="text-md text-left">
                      Last name
                      <span className="text-md text-failed-red">*</span>
                    </span>
                  </div>
                  <div className="">
                    <div className="mr-5 rounded-md bg-white flex items-center text-black py-2">
                      <Field
                        type="text"
                        className="outline-none border-none w-full px-3"
                        placeholder="Last Name"
                        value={values.lastName}
                        name="lastName"
                      />
                    </div>
                    <ErrorMessage
                      className="text-sm text-failed-red"
                      name="lastName"
                      component="div"
                    />
                  </div>
                </div>
                <div className="items-center justify-center mb-4">
                  <div className="text-left">
                    <span className="text-md text-left">
                      E-mail address
                      <span className="text-md text-failed-red">*</span>
                    </span>
                  </div>
                  <div className="">
                    <div className="mr-5 rounded-md bg-white flex items-center text-black py-2">
                      <Field
                        type="text"
                        className="outline-none border-none w-full px-3"
                        placeholder="Email Address"
                        value={values.email}
                        name="email"
                      />
                    </div>
                    <ErrorMessage
                      className="text-sm text-failed-red"
                      name="email"
                      component="div"
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="items-center justify-center mb-4">
                  <div className="text-left">
                    <span className="text-md text-left">phone number</span>
                  </div>
                  <div className="">
                    <div className="mr-5 rounded-md bg-white flex items-center text-black py-2">
                      <Field
                        type="text"
                        className="outline-none border-none w-full px-3"
                        placeholder="Phone Number"
                        value={values.phone}
                        name="phone"
                      />
                    </div>
                  </div>
                </div>
                <div className="items-center justify-center mb-4">
                  <div className="text-left">
                    <span className="text-md text-left">
                      What's your role within the organization?
                      <span className="text-md text-failed-red">*</span>
                    </span>
                  </div>
                  <div className="">
                    <div className="mr-5 rounded-md bg-white flex items-center text-black py-2">
                      <Field
                        as="select"
                        className="outline-none border-none w-full px-3"
                        placeholder="Role"
                        value={values.orgRole}
                        defaultValue="ceo"
                        name="orgRole"
                      >
                        <option value="president">
                          Chairperson / President
                        </option>
                        <option value="vice-president">
                          Vice-chairperson / Vice president
                        </option>
                        <option value="secretary">Secretary</option>
                        <option value="treasurer">Treasurer</option>
                        <option value="ceo">CEO</option>
                        <option value="cfo">CFO</option>
                        <option value="other">Other</option>
                      </Field>
                    </div>
                    <ErrorMessage
                      className="text-sm text-failed-red"
                      name="orgRole"
                      component="div"
                    />
                  </div>
                </div>
                {values.orgRole === "other" && (
                  <div className="items-center justify-center mb-4">
                    <div className="text-left">
                      <span className="text-md text-left">
                        please specify
                        <span className="text-md text-failed-red">*</span>
                      </span>
                    </div>
                    <div className="">
                      <div className="mr-5 rounded-md bg-white flex items-center w-2/5text-black py-2">
                        <Field
                          type="text"
                          className="outline-none border-none w-full px-3 text-black"
                          placeholder="Specify Your Role"
                          value={values.otherRole}
                          name="otherRole"
                        />
                      </div>
                      <ErrorMessage
                        className="text-sm text-failed-red"
                        name="otherRole"
                        component="div"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 items-center justify-center mb-4 mt-10">
              <div className="flex text-center justify-center">
                <div className="mr-5 flex items-center py-2">
                  <label>
                    <Field
                      type="checkbox"
                      name="checkedPolicy"
                      className="mr-2"
                    />
                    <span className="text-md">
                      {" "}
                      By checking this box, you declare that you have read and
                      agreed our{" "}
                      <Link to={routes.privacy_policy} className="underline">
                        Privacy Policy
                      </Link>
                      <span className="text-md text-failed-red">*</span>
                    </span>
                  </label>
                </div>
                <ErrorMessage
                  className="text-md text-failed-red"
                  name="checkedPolicy"
                  component="div"
                />
              </div>
            </div>
            <div className="text-center">
              <button
                className="bg-orange w-48 h-12 rounded-xl uppercase text-md font-bold text-white"
                type="submit"
                disabled={isSubmitting}
              >
                continue
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};
