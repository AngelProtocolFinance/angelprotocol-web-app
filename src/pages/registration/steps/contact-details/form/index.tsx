import type { Update } from "@better-giving/registration/update";
// import { Field, Input, Label } from "@headlessui/react";
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { NativeField as Field } from "components/form";
import LoadText from "components/load-text";
import { List } from "components/selector";
import { APP_NAME } from "constants/env";
import type { SubmitHandler } from "react-hook-form";
import { steps } from "../../../routes";
import type { RegStep1 } from "../../../types";
import { useUser } from "../../../user";
import { referralOptions, roleOptions } from "../constants";
import type { FV } from "./schema";
import { useRhf } from "./use-rhf";

export default function Form({ classes = "" }: { classes?: string }) {
  const fetcher = useFetcher();
  const state = useLoaderData() as RegStep1;
  const user = useUser();
  const { register, errors, orgRole, refMethod, isDirty, handleSubmit } =
    useRhf(state.data, user);
  const navigate = useNavigate();

  const submit: SubmitHandler<FV> = async (fv) => {
    if (!isDirty && state.data.contact) {
      return navigate(`../${steps.orgDetails}`); // go to latest step
    }
    const { org_role, referral_method, registrant_id, ...rest } = fv;

    const update: Update = {
      type: "contact",
      ...rest,
      org_role: org_role.value,
      referral_method: referral_method.value,
    };
    fetcher.submit(update, {
      action: ".",
      method: "PATCH",
      encType: "application/json",
    });
  };

  return (
    <form
      // disabled={isSubmitting}
      className={`w-full bg-white dark:bg-blue-d6 ${classes}`}
      onSubmit={handleSubmit(submit)}
    >
      <h2 className="text-center sm:text-left text-xl mb-2">
        Let's start with your contact details
      </h2>
      <p className="text-center sm:text-left text-lg mb-8">
        Thank you for sharing! This information will be kept private and will
        let us know more about you and your organization
      </p>
      <h3 className="mb-4">Personal information</h3>
      <Field
        required
        label="First name"
        {...register("first_name")}
        placeholder="e.g. John"
        error={errors.first_name?.message}
      />

      <Field
        {...register("last_name")}
        required
        label="Last name"
        {...register("last_name")}
        placeholder="e.g. Doe"
        error={errors.last_name?.message}
        classes={{ container: "mt-4" }}
      />

      <Field
        required={false}
        label="Phone number"
        {...register("contact_number")}
        placeholder="000000000"
        error={errors.contact_number?.message}
        classes={{ container: "mt-4" }}
      />

      <Field
        required
        label="E-mail address"
        {...register("registrant_id")}
        disabled
        error={errors.registrant_id?.message}
        classes={{ container: "mt-4" }}
      />

      <h3 className="mt-8 mb-4">Organization information</h3>
      <Field
        required
        label="Organization name"
        {...register("org_name")}
        placeholder="Organization name"
        error={errors.org_name?.message}
        classes={{ container: "mb-4" }}
      />
      <List
        required
        label=" What's your role within the organization?"
        value={orgRole.value}
        onChange={orgRole.onChange}
        options={roleOptions}
        error={errors.org_role?.value?.message}
        ref={orgRole.ref}
        classes={{ option: "text-sm" }}
      />
      {orgRole.value.value === "other" && (
        <Field
          required
          label="Specify your role"
          {...register("other_role", { shouldUnregister: true })}
          placeholder="Specify your role"
          error={errors.other_role?.message}
        />
      )}
      <h3 className="mt-8 mb-4">Other information</h3>
      <List
        label="How did you find about us?"
        required
        value={refMethod.value}
        onChange={refMethod.onChange}
        options={referralOptions}
        error={errors.referral_method?.value?.message}
        ref={refMethod.ref}
        classes={{ option: "text-sm", container: "mb-4" }}
      />

      {refMethod.value.value === "other" && (
        <Field
          required
          label="Please provide additional information"
          {...register("other_referral_method", { shouldUnregister: true })}
          placeholder="Specify how you found us"
          error={errors.other_referral_method?.message}
        />
      )}
      {refMethod.value.value === "referral" && (
        <Field
          required
          label="Referral Code"
          {...register("referral_code", { shouldUnregister: true })}
          placeholder="Referral Code"
          error={errors.referral_code?.message}
        />
      )}
      <Field
        required
        label="Goals"
        {...register("goals")}
        placeholder={`What is your goal working with ${APP_NAME}?`}
        error={errors.goals?.message}
        classes={{ container: "mt-4" }}
      />
      <button
        type="submit"
        className="mt-8 py-3 px-8 w-full sm:w-auto btn btn-blue text-sm"
        disabled={fetcher.state !== "idle"}
      >
        <LoadText isLoading={fetcher.state === "submitting"}>Continue</LoadText>
      </button>
    </form>
  );
}
