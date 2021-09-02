import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";

const ContactDetails = () => {
  return (
    <div>
      <h3 className="text-3xl font-bold mb-10">
        Let's start with your contact details.
      </h3>
      <p className="text-xl mb-6">
        This information will let us know more about your organization and who
        you are. Once this form is submitted, you will be able to resume your
        registration if it gets interrupted in the future.
      </p>
      <Formik
        initialValues={{
          orgName: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          orgRule: "",
          otherRule: "",
          checkedPolicy: false,
        }}
        validate={(values) => {
          const errors: any = {};
          if (!values.orgName) {
            errors.orgName = "Please enter the name of your organization.";
          }
          if (!values.firstName) {
            errors.firstName = "Please enter your first name.";
          }
          if (!values.lastName) {
            errors.lastName = "Please enter your last name.";
          }
          if (
            !values.email &&
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Please enter correct email address.";
          }
          if (!values.orgRule) {
            errors.orgRule =
              "Please select your role within your organization.";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(true);
          // API integration.
          setSubmitting(false);
        }}
      >
        {({ values, isSubmitting }) => (
          <div className="flex items-center justify-center">
            <Form className="md:w-4/5 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center mb-4">
                <div className="text-left">
                  <span className="text-xl">
                    Name of your organization
                    <span className="text-md text-failed-red">*</span>
                  </span>
                </div>
                <div className="">
                  <div className="mr-5 rounded-md bg-white flex items-center text-black py-2">
                    <Field
                      type="text"
                      className="outline-none border-none w-full px-3"
                      placeholder="Enter your organization name."
                      value={values.orgName}
                      name="orgName"
                    />
                  </div>
                  <ErrorMessage
                    className="text-md text-failed-red"
                    name="orgName"
                    component="div"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center mb-4">
                <div className="text-left">
                  <span className="text-xl text-left">
                    First name<span className="text-md text-failed-red">*</span>
                  </span>
                </div>
                <div className="">
                  <div className="mr-5 rounded-md bg-white flex items-center text-black py-2">
                    <Field
                      type="text"
                      className="outline-none border-none w-full px-3"
                      placeholder="Enter your first name."
                      value={values.firstName}
                      name="firstName"
                    />
                  </div>
                  <ErrorMessage
                    className="text-md text-failed-red"
                    name="firstName"
                    component="div"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center mb-4">
                <div className="text-left">
                  <span className="text-xl text-left">
                    Last name<span className="text-md text-failed-red">*</span>
                  </span>
                </div>
                <div className="">
                  <div className="mr-5 rounded-md bg-white flex items-center text-black py-2">
                    <Field
                      type="text"
                      className="outline-none border-none w-full px-3"
                      placeholder="Enter your last name."
                      value={values.lastName}
                      name="lastName"
                    />
                  </div>
                  <ErrorMessage
                    className="text-md text-failed-red"
                    name="lastName"
                    component="div"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center mb-4">
                <div className="text-left">
                  <span className="text-xl text-left">
                    E-mail address
                    <span className="text-md text-failed-red">*</span>
                  </span>
                </div>
                <div className="">
                  <div className="mr-5 rounded-md bg-white flex items-center text-black py-2">
                    <Field
                      type="text"
                      className="outline-none border-none w-full px-3"
                      placeholder="Enter your email."
                      value={values.email}
                      name="email"
                    />
                  </div>
                  <ErrorMessage
                    className="text-md text-failed-red"
                    name="email"
                    component="div"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center mb-4">
                <div className="text-left">
                  <span className="text-xl text-left">phone number</span>
                </div>
                <div className="">
                  <div className="mr-5 rounded-md bg-white flex items-center text-black py-2">
                    <Field
                      type="text"
                      className="outline-none border-none w-full px-3"
                      placeholder="Enter your phone number."
                      value={values.phone}
                      name="phone"
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center mb-4">
                <div className="text-left">
                  <span className="text-xl text-left">
                    What's your role within the organization?
                    <span className="text-md text-failed-red">*</span>
                  </span>
                </div>
                <div className="">
                  <div className="mr-5 rounded-md bg-white flex items-center text-black py-2">
                    <Field
                      as="select"
                      className="outline-none border-none w-full px-3"
                      placeholder="Please choose one."
                      value={values.orgRule}
                      name="orgRule"
                    >
                      <option value="president">Chairperson / President</option>
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
                    className="text-md text-failed-red"
                    name="orgRule"
                    component="div"
                  />
                </div>
              </div>
              {values.orgRule == "other" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center mb-4">
                  <div className="text-left">
                    <span className="text-xl text-left ml-2">
                      please specify
                      <span className="text-md text-failed-red">*</span>
                    </span>
                  </div>
                  <div className="">
                    <div className="mr-5 rounded-md bg-white flex items-center w-2/5text-black py-2">
                      <Field
                        type="text"
                        className="outline-none border-none w-full px-3 text-black"
                        placeholder="Enter your organization name."
                        value={values.otherRule}
                        name="otherRule"
                      />
                    </div>
                    <ErrorMessage
                      className="text-md text-failed-red"
                      name="otherRule"
                      component="div"
                    />
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 items-center justify-center mb-4">
                <div className="text-left">
                  <div className="mr-5 flex items-center py-2">
                    <Field
                      type="checkbox"
                      name="checked"
                      value="checkedPolicy"
                      className="mr-2"
                    />
                    <span className="text-md">
                      {" "}
                      By checking this box, you declare that you have read and
                      agreed our{" "}
                      <Link to="/privacy-policy" className="underline">
                        Privacy Policy
                      </Link>
                      <span className="text-md text-failed-red">*</span>
                    </span>
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
    </div>
  );
};

export default ContactDetails;
