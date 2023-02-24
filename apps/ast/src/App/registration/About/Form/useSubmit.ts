import { SubmitHandler, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function useSubmit() {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<any>();

  const navigate = useNavigate();

  const submit: SubmitHandler<any> = async (fv) => {
    navigate("../step2"); // go to latest step
  };

  return { submit: handleSubmit(submit), isSubmitting };
}
