import { yupResolver } from "@hookform/resolvers/yup";
import LoadText from "components/LoadText";
import { Field } from "components/form";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { alphanumeric, requiredString } from "schemas/string";
import { object } from "yup";
import { steps } from "../../../routes";
import { useRegState } from "../../StepGuard";
import type { FormValues as FV, Props } from "./types";
import useSubmit from "./useSubmit";

export default function NonFSA(props: Props) {
  const { data } = useRegState<4>();
  const claimEin = data.init.claim?.ein;
  const { doc } = props;
  const methods = useForm<FV>({
    resolver: yupResolver(
      object({
        EIN: requiredString.matches(
          alphanumeric,
          "must only contain numbers and letters"
        ),
      })
    ),
    defaultValues: doc
      ? doc
      : {
          EIN: claimEin ?? "",
        },
  });
  const { submit, isSubmitting } = useSubmit({ props, form: methods });

  return (
    <FormProvider {...methods}>
      <form className="w-full" onSubmit={submit}>
        <Field<FV>
          /** claimer should not change EIN */
          disabled={!!claimEin}
          name="EIN"
          label="EIN# (numbers and letters only)"
          required
          classes={{ container: "mb-6 mt-1" }}
          placeholder="e.g. xxxxxxxxxxxx"
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
