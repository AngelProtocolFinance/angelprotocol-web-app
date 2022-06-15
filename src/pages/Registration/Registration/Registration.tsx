import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import banner1 from "assets/images/banner-register-1.jpg";
import {
  invalidateRegistrationTags,
  registrationRefKey,
  updateRegQueryData,
  useRegistrationQuery,
} from "services/aws/registration";
import { adminTags, awsTags } from "services/aws/tags";
import { useSetter } from "store/accessors";
import { Button } from "../common";
import routes from "../routes";
import ButtonMailTo from "./ButtonMailTo";

type ResumeValues = { refer: string };
const FormInfoSchema = Yup.object().shape({
  refer: Yup.string().required("Please enter your registration reference."),
});

export default function Registration() {
  /** run initial query, so that other guards don't have to to wait for loading
   *  this is the homebase, no programmatic redirection should be done from here
   *  so we can always go back here, from dashboard
   */
  const dispatch = useSetter();
  const { refetch } = useRegistrationQuery("old");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResumeValues>({
    defaultValues: {
      //pre-fill with old registartion reference
      refer: localStorage.getItem(registrationRefKey) || "",
    },
    resolver: yupResolver(FormInfoSchema),
  });

  const handleStart = () => {
    localStorage.removeItem(registrationRefKey);
    //clear cache data
    navigate(routes.contactDetails, { state: { is_new: true } });
  };

  const onResume = (val: ResumeValues) => {
    /**
     * set querier params, and re-run the query
     */
    localStorage.setItem(registrationRefKey, val.refer);
    refetch();
    //go to dashboard and let guard handle further routing
    navigate(routes.dashboard);
  };

  return (
    <div className="flex flex-col gap-3 items-center">
      <img src={banner1} width="100%" className="rounded-xl" alt="banner" />
      <span className="text-3xl font-bold">
        Thank you for registering, we'd love to have you on board!
      </span>
      <span className="text-xl mb-5">
        You're just steps away from bringing all the benefits of endowments to
        your organization.
      </span>
      <Button onClick={handleStart} className="bg-orange w-48 h-12">
        Start
      </Button>
      <p className="text-xl font-bold text-thin-blue">OR</p>
      <form
        onSubmit={handleSubmit(onResume)}
        className="flex flex-col items-center gap-2 w-full mb-5"
      >
        <input
          {...register("refer")}
          className="rounded-md outline-none border-none w-3/5 md:w-2/5 px-3 py-2 text-black"
          placeholder="Enter your registration reference"
          type="text"
        />
        <p className="text-failed-red">{errors.refer?.message}</p>
        <Button
          submit
          className="bg-thin-blue w-48 h-12"
          isLoading={isSubmitting}
        >
          Resume
        </Button>
      </form>
      <ButtonMailTo
        label="Having trouble resuming your registration?"
        mailTo="support@angelprotocol.io"
        subject="Charity Registration: Trouble with confirmation email"
      />
    </div>
  );
}
