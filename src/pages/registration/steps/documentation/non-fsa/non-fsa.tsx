import type { EndowClaim } from "@better-giving/registration/models";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { NavLink } from "@remix-run/react";
import { Field, Form } from "components/form";
import { LoadText } from "components/load-text";
import { useForm } from "react-hook-form";
import { steps } from "../../../routes";
import { type FV, type Props, schema } from "./types";
import useSubmit from "./use-submit";

export default function NonFSA(
  props: Props & { initClaim: EndowClaim | undefined; regId: string }
) {
  const { doc } = props;
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<FV>({
    resolver: valibotResolver(schema),
    defaultValues: doc ? doc : { ein: props.initClaim?.ein ?? "" },
  });
  const { submit, state } = useSubmit({
    props,
    isDirty,
    initClaim: props.initClaim,
  });

  return (
    <Form
      disabled={state !== "idle" || isSubmitting}
      className="w-full"
      onSubmit={handleSubmit(submit)}
    >
      <Field
        {...register("ein")}
        /** claimer should not change EIN */
        disabled={!!props.initClaim}
        label="EIN# (numbers and letters only)"
        required
        classes={{ container: "mb-6 mt-1" }}
        placeholder="e.g. xxxxxxxxxxxx"
        error={errors.ein?.message}
      />

      <div className="grid grid-cols-2 sm:flex gap-2 mt-8">
        <NavLink
          aria-disabled={isSubmitting}
          to={`../${steps.fsaInquiry}`}
          className="py-3 min-w-[8rem] btn-outline btn text-sm"
        >
          Back
        </NavLink>
        <button
          disabled={isSubmitting}
          type="submit"
          className="py-3 min-w-[8rem] btn btn-blue text-sm"
        >
          <LoadText isLoading={isSubmitting}>Continue</LoadText>
        </button>
      </div>
    </Form>
  );
}
