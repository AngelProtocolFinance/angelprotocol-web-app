import type { EndowClaim } from "@better-giving/registration/models";
import { valibotResolver } from "@hookform/resolvers/valibot";
import LoadText from "components/LoadText";
import { Field } from "components/form";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router";
import { steps } from "../../../routes";
import { type FormValues as FV, type Props, schema } from "./types";
import useSubmit from "./useSubmit";

export default function NonFSA(
  props: Props & { initClaim: EndowClaim | undefined; regId: string }
) {
  const { doc } = props;
  const methods = useForm<FV>({
    resolver: valibotResolver(schema),
    defaultValues: doc
      ? doc
      : {
          ein: props.initClaim?.ein ?? "",
        },
  });
  const { submit, isSubmitting } = useSubmit({
    props,
    form: methods,
    initClaim: props.initClaim,
  });

  return (
    <FormProvider {...methods}>
      <form className="w-full" onSubmit={submit}>
        <Field<FV>
          /** claimer should not change EIN */
          disabled={!!props.initClaim}
          name="ein"
          label="EIN# (numbers and letters only)"
          required
          classes={{ container: "mb-6 mt-1" }}
          placeholder="e.g. xxxxxxxxxxxx"
        />

        <div className="grid grid-cols-2 sm:flex gap-2 mt-8">
          <Link
            aria-disabled={isSubmitting}
            to={`../${steps.fsaInquiry}`}
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
