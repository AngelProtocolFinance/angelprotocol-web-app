import { yupResolver } from "@hookform/resolvers/yup";
import LoadText from "components/LoadText";
import { Field } from "components/form";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { requiredString } from "schemas/string";
import { object } from "yup";
import { steps } from "../../../routes";
import { useRegState } from "../../StepGuard";
import { FormValues as FV, Props } from "./types";
import useSubmit from "./useSubmit";

export default function NonFSA(props: Props) {
  const { data } = useRegState<4>();
  const { doc } = props;
  const methods = useForm<FV>({
    resolver: yupResolver(object({ EIN: requiredString.trim() })),
    defaultValues: doc
      ? doc
      : {
        EIN: "",
      },
  });
  const { submit, isSubmitting } = useSubmit({ props, form: methods });

  return (
    <FormProvider {...methods}>
      <form className="w-full" onSubmit={submit}>
        <Field<FV>
          name="EIN"
          label="EIN#"
          required
          classes={{ container: "mb-6 mt-1" }}
          placeholder="e.g. xx-xxxxxxxxxx"
        />

        <div className="grid grid-cols-2 sm:flex gap-2 mt-8">
          <Link
            aria-disabled={isSubmitting}
            to={`../${steps.fsaInquiry}`}
            state={data.init}
            className="py-3 min-w-[8rem] btn-outline-filled btn-reg"
          >
            Back
          </Link>
          <button
            disabled={isSubmitting}
            type="submit"
            className="py-3 min-w-[8rem] btn-blue btn-reg"
          >
            <LoadText isLoading={isSubmitting}>Continue</LoadText>
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
