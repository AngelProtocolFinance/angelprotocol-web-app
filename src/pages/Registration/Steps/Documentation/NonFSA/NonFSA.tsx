import { valibotResolver } from "@hookform/resolvers/valibot";
import LoadText from "components/LoadText";
import { Field } from "components/form";
import { toWithState } from "helpers/state-params";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { steps } from "../../../routes";
import { useRegState } from "../../StepGuard";
import { type FormValues as FV, type Props, schema } from "./types";
import useSubmit from "./useSubmit";

export default function NonFSA(props: Props) {
  const { data } = useRegState<4>();
  const claimEin = data.init.claim?.ein;
  const { doc } = props;
  const methods = useForm<FV>({
    resolver: valibotResolver(schema),
    defaultValues: doc
      ? doc
      : {
          ein: claimEin ?? "",
        },
  });
  const { submit, isSubmitting } = useSubmit({ props, form: methods });

  return (
    <FormProvider {...methods}>
      <form className="w-full" onSubmit={submit}>
        <Field<FV>
          /** claimer should not change EIN */
          disabled={!!claimEin}
          name="ein"
          label="EIN# (numbers and letters only)"
          required
          classes={{ container: "mb-6 mt-1" }}
          placeholder="e.g. xxxxxxxxxxxx"
        />

        <div className="grid grid-cols-2 sm:flex gap-2 mt-8">
          <Link
            aria-disabled={isSubmitting}
            to={toWithState(`../${steps.fsaInquiry}`, data.init)}
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
