import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  registrationRefKey,
  useRegistrationLazyQuery,
} from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { Button } from "../common";
import routes from "../routes";

type ResumeValues = { refer: string };
const FormInfoSchema = Yup.object().shape({
  refer: Yup.string().required("Please enter your registration reference."),
});

export default function ResumeForm() {
  const navigate = useNavigate();
  const { handleError } = useErrorContext();
  const [checkPrevRegistration] = useRegistrationLazyQuery();

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

  const onResume = async (val: ResumeValues) => {
    const { isError, error, data } = await checkPrevRegistration(val.refer);
    if (isError || !data) {
      handleError(
        error,
        "No active charity application found with this registration reference"
      );
      return;
    }
    localStorage.setItem(registrationRefKey, val.refer);
    //go to dashboard and let guard handle further routing
    navigate(routes.dashboard);
  };

  return (
    <form
      onSubmit={handleSubmit(onResume)}
      className="flex flex-col items-center gap-2 w-full lg:w-5/6 mb-5"
    >
      <input
        {...register("refer")}
        className="rounded-md outline-none border-none w-full px-3 py-2 text-black"
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
  );
}
