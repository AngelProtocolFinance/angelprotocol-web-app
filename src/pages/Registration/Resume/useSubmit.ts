import { useErrorContext } from "contexts/ErrorContext";
import { useFormContext } from "react-hook-form";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import type { UserV2 } from "types/auth";
import { getRegState } from "../data/step-loader";
import { nextStep } from "../routes";
import type { FormValues } from "./types";

export default function useSubmit() {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<FormValues>();
  const user = useRouteLoaderData("reg") as UserV2;

  const navigate = useNavigate();
  const { handleError } = useErrorContext();

  const onSubmit = async ({ reference }: FormValues) => {
    try {
      const { data, step } = await getRegState(reference, user);
      navigate(`../${data.init.id}/${nextStep[step]}`);
    } catch (err) {
      handleError(err, { context: "resuming registration" });
    }
  };

  return { submit: handleSubmit(onSubmit), isSubmitting };
}
