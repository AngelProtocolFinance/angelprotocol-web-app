import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useRegistrationLazyQuery } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import {
  getSavedRegistrationReference,
  storeRegistrationReference,
} from "helpers";
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
      refer: getSavedRegistrationReference() || "",
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
    storeRegistrationReference(val.refer);
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
        className="rounded-md outline-none border-none w-11/12 px-3 py-2 mb-3 text-black"
        placeholder="Enter your registration reference"
        type="text"
      />
      <p className="text-red">{errors.refer?.message}</p>
      <Button
        submit
        className="btn-secondary w-40 h-10"
        isLoading={isSubmitting}
      >
        Resume
      </Button>
    </form>
  );
}
