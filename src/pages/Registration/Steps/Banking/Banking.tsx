import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FormValues as FV } from "./types";
import { Label } from "components/form";
import { FileDropzone, LoadText } from "components/registration";
import { steps } from "../../routes";
import { useRegState, withStepGuard } from "../StepGuard";
import useSubmit from "./useSubmit";

function Banking() {
  const { data } = useRegState<5>();
  const methods = useForm<FV>({
    defaultValues: data.banking?.BankStatementPDF
      ? {
          bankStatement: {
            previews: [data.banking?.BankStatementPDF],
            files: [],
          },
        }
      : {
          bankStatement: { previews: [], files: [] },
        },
  });
  const { submit, isSubmitting } = useSubmit(methods);

  return (
    <FormProvider {...methods}>
      <form className="w-full" onSubmit={submit}>
        <Label required className="mb-2 mt-1">
          Bank statement
        </Label>
        <FileDropzone<FV, "bankStatement">
          name="bankStatement"
          tooltip="Valid types are: PDF, JPG, PNG and WEBP. File should be less than 1 MB."
        />

        <div className="grid grid-cols-2 sm:flex gap-2 mt-8">
          <Link
            aria-disabled={isSubmitting}
            to={`../${steps.docs}`}
            state={data.init}
            className="py-3 min-w-[8rem] btn-outline-filled btn-reg"
          >
            Back
          </Link>
          <button
            disabled={isSubmitting}
            type="submit"
            className="py-3 min-w-[8rem] btn-orange btn-reg"
          >
            <LoadText isLoading={isSubmitting}>Continue</LoadText>
          </button>
        </div>
      </form>
    </FormProvider>
  );
}

export default withStepGuard(Banking);
