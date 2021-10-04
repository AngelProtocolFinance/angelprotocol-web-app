import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useHistory, useRouteMatch } from "react-router-dom";
import { register } from "types/routes";
import * as Yup from "yup";
import banner1 from "assets/images/banner-register-1.jpg";
import { useCheckPreviousRegistrationMutation } from "api/registerAPIs";

export type ReferInfo = {
  refer: string;
};

const Registration = () => {
  const [checkData, { isLoading }] = useCheckPreviousRegistrationMutation();
  //url -> app/register
  const { url } = useRouteMatch();
  const history = useHistory();
  const userData: any = JSON.parse(localStorage.getItem("userData") || "{}");
  const FormInfoSchema = Yup.object().shape({
    refer: Yup.string().required("Please enter your registration reference."),
  });

  const onResumeRefer = async (
    values: ReferInfo,
    actions: FormikHelpers<ReferInfo>
  ) => {
    actions.setSubmitting(true);
    // API integration.
    let response = await checkData(values.refer);
    console.log(response);
    if (!response) {
      // set error
      actions.setFieldError(
        "refer",
        "Can not find a registration file with this reference!"
      );
    } else {
      history.push({
        pathname: `${url}/${register.confirm}`,
        state: { is_sent: true },
      });
    }
    actions.setSubmitting(false);
  };
  if (userData?.email) {
    history.push({
      pathname: `${url}/${register.confirm}`,
      state: { is_sent: true },
    });
  }

  return (
    <div>
      <div className="rounded-xl mb-5">
        <img src={banner1} width="100%" className="rounded-xl" alt="banner" />
      </div>
      <div>
        <span className="text-2xl font-bold">
          Thank you for registering, we'd love to have you on board!
        </span>
      </div>
      <div className="my-10">
        <span className="text-md">
          First, we need to collect information about you and your organization
          to prevent fraud. The registration only takes a few minutes and it can
          be interrupted and resumed as many times as necessary. We’ll be making
          it easy for you to come back to it.
        </span>
      </div>
      <div className="mb-2">
        <button
          className="bg-orange w-48 h-12 rounded-xl uppercase text-base font-bold text-white mb-3"
          onClick={() => history.push(`${url}/${register.detail}`)}
        >
          Start
        </button>
        <div className="cursor-pointer mb-3">
          <p className="text-xl font-bold">OR</p>
        </div>
      </div>
      <div className="">
        <Formik
          initialValues={{ refer: "" }}
          validationSchema={FormInfoSchema}
          onSubmit={onResumeRefer}
        >
          {({ values, isSubmitting }) => (
            <div>
              <Form>
                <div className="flex items-center justify-center mb-2">
                  <div className="rounded-md bg-white flex items-center w-3/5 md:w-2/5 text-black py-2">
                    <Field
                      type="text"
                      className="outline-none border-none w-full px-3"
                      placeholder="Enter your registration reference"
                      value={values.refer}
                      name="refer"
                    />
                  </div>
                </div>
                <ErrorMessage
                  className="text-base text-failed-red"
                  name="refer"
                  component="div"
                />
                <button
                  className="disabled:bg-gray-300 bg-thin-blue w-48 h-12 rounded-xl uppercase text-base font-bold text-white mt-3"
                  type="submit"
                  disabled={isLoading || isSubmitting}
                >
                  Resume
                </button>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Registration;
