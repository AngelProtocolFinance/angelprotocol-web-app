import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { InitReg } from "services/aws/registration/types";
import { useLazyRegQuery } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { BtnPrim, BtnSec } from "components/registration";
import {
  getSavedRegistrationReference,
  storeRegistrationReference,
} from "helpers";
import { asciiSchema } from "schemas/string";
import { Button } from "../common";
import routes, { steps } from "../routes";

type ResumeValues = { refer: string };
const FormInfoSchema = Yup.object().shape({
  refer: asciiSchema.required("Please enter your registration reference."),
});

export default function ResumeForm() {
  const navigate = useNavigate();
  const { handleError } = useErrorContext();
  const [checkPrevRegistration] = useLazyRegQuery();

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
    const {
      isError,
      error,
      data: regState,
    } = await checkPrevRegistration(val.refer);
    if (isError || !regState) {
      handleError(
        error,
        "No active application found with this registration reference"
      );
      return;
    }
    storeRegistrationReference(val.refer);

    const state = regState.data.init;

    if ("data" in regState && !regState.data.init.isEmailVerified) {
      return navigate(`../${routes.confirmEmail}`, { state });
    }

    //go to dashboard and let guard handle further routing
    navigate(`../${routes.steps}/${regState.step}`, { state });
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
      <BtnPrim type="submit" disabled={isSubmitting}>
        Resume
      </BtnPrim>
      <BtnSec as="link" to="..">
        Register new account
      </BtnSec>
    </form>
  );
}
