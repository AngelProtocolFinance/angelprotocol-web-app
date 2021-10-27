import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useHistory, useRouteMatch } from "react-router-dom";
import { register } from "types/routes";
import * as Yup from "yup";
import banner1 from "assets/images/banner-register-1.jpg";
import { useCheckPreviousRegistrationMutation } from "api/registerAPIs";
import { toast, ToastContainer } from "react-toastify";
import { UserSlice } from "../../Redux/slices/userSlice";
import { useDispatch } from "react-redux";
import Action from "./Action";
import { useGetLambdaAuthTokenMutation } from "api/lambdaAuthAPIs";

export type ReferInfo = {
  refer: string;
};

const Registration = () => {
  const dispatch = useDispatch();
  const [checkData, { isLoading }] = useCheckPreviousRegistrationMutation();
  const [getTokenData] = useGetLambdaAuthTokenMutation();
  const { updateUserData } = UserSlice.actions;
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
    let response: any = await checkData(values.refer);
    if (response.error) {
      // set error
      toast.error(response.error.data.message);
      actions.setFieldError(
        "refer",
        "Can not find a registration file with this reference!"
      );
    } else {
      const token: any = await getTokenData(values.refer);
      console.log("token => ", token);
      const data = {
        ...response.data.ContactPerson,
        CharityName: response.data.Registration.CharityName,
        CharityName_ContactEmail:
          response.data.Registration.CharityName_ContactEmail,
        RegistrationDate: response.data.Registration.RegistrationDate,
        RegistrationStatus: response.data.Registration.RegistrationStatus,
        token: token.data,
      };
      dispatch(updateUserData(data));
      if (response.data.ContactPerson.EmailVerified)
        history.push({
          pathname: `${url}/${register.status}`,
        });
      else
        history.push({
          pathname: `${url}/${register.confirm}`,
          state: { is_sent: true },
        });
    }
    actions.setSubmitting(false);
  };

  if (userData && userData.EmailVerified === false) {
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
        <Action
          onClick={() => history.push(`${url}/${register.detail}`)}
          title="Start"
          classes="bg-orange w-48 h-12"
        />
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
                <Action
                  submit
                  title="Resume"
                  classes="bg-thin-blue w-48 h-12"
                  disabled={isLoading || isSubmitting}
                />
              </Form>
            </div>
          )}
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Registration;
