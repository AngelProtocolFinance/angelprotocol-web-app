import type { Update } from "@better-giving/registration/update";
import { Field, Input, Label } from "@headlessui/react";
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import LoadText from "components/load-text";
import { APP_NAME } from "constants/env";
import type { SubmitHandler } from "react-hook-form";
import { steps } from "../../../routes";
import type { RegStep1 } from "../../../types";
import { useUser } from "../../../user";
import { ReferralMethodSelector } from "./referral-method-selector";
import { RoleSelector } from "./role-selector";
import type { FV } from "./schema";
import { useRhf } from "./use-rhf";

function Star() {
  return <span className="text-red">*</span>;
}

export default function Form({ classes = "" }: { classes?: string }) {
  const fetcher = useFetcher();
  const state = useLoaderData() as RegStep1;
  const user = useUser();
  const {
    register,
    errors,
    orgRole,
    onOrgRoleChange,
    orgRoleRef,
    referralMethod,
    onReferralMethodChange,
    referralMethodRef,
    isDirty,
    handleSubmit,
  } = useRhf(state.data, user);
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
      <Field className="grid mb-4">
        <Label className="mb-1 text-sm">
          First name <Star />
        </Label>
        <Input
          className="font-heading rounded-sm outline-blue-d1 outline-offset-4 text-sm font-medium bg-transparent disabled:bg-gray-l5 disabled:text-gray px-4 py-3.5 placeholder:text-gray text-gray-d4 border border-gray-l3"
          placeholder="e.g. John"
          {...register("first_name")}
        />
        <p className="text-right text-red text-xs mt-1">
          {errors.first_name?.message}
        </p>
      </Field>
      <Field className="grid mb-4">
        <Label className="mb-1 text-sm">
          Last name <Star />
        </Label>
        <Input
          className="font-heading rounded-sm outline-blue-d1 outline-offset-4 text-sm font-medium bg-transparent disabled:bg-gray-l5 disabled:text-gray px-4 py-3.5 placeholder:text-gray text-gray-d4 border border-gray-l3"
          placeholder="e.g. Doe"
          {...register("last_name")}
        />
        <p className="text-right text-red text-xs mt-1">
          {errors.last_name?.message}
        </p>
      </Field>
      <Field className="grid mb-4">
        <Label className="mb-1 text-sm">
          Phone number <span className="text-gray text-sm">(optional)</span>
        </Label>
        <Input
          className="font-heading rounded-sm outline-blue-d1 outline-offset-4 text-sm font-medium bg-transparent disabled:bg-gray-l5 disabled:text-gray px-4 py-3.5 placeholder:text-gray text-gray-d4 border border-gray-l3"
          placeholder="000000000"
          {...register("contact_number")}
        />
        <p className="text-right text-red text-xs mt-1">
          {errors.contact_number?.message}
        </p>
      </Field>
      <Field className="grid" disabled>
        <Label className="mb-1 text-sm">
          E-mail address <Star />
        </Label>
        <Input
          className="font-heading rounded-sm outline-blue-d1 outline-offset-4 text-sm font-medium bg-transparent disabled:bg-gray-l5 disabled:text-gray px-4 py-3.5 placeholder:text-gray text-gray-d4 border border-gray-l3"
          {...register("registrant_id")}
          disabled
        />
      </Field>
      <h3 className="mt-8 mb-4">Organization information</h3>
      <Field className="grid mb-4">
        <Label className="mb-1 text-sm">
          Organization name <Star />
        </Label>
        <Input
          className="font-heading rounded-sm outline-blue-d1 outline-offset-4 text-sm font-medium bg-transparent disabled:bg-gray-l5 disabled:text-gray px-4 py-3.5 placeholder:text-gray text-gray-d4 border border-gray-l3"
          placeholder="Organization name"
          {...register("org_name")}
        />
        <p className="text-right text-red text-xs mt-1">
          {errors.org_name?.message}
        </p>
      </Field>
      <RoleSelector
        value={orgRole}
        onChange={onOrgRoleChange}
        ref={orgRoleRef}
        error={errors.org_role?.value?.message}
      />
      {orgRole.value === "other" && (
        <Field className="grid my-4">
          <Label className="mb-1 text-sm">
            Specify your role <Star />
          </Label>
          <Input
            className="font-heading rounded-sm outline-blue-d1 outline-offset-4 text-sm font-medium bg-transparent disabled:bg-gray-l5 disabled:text-gray px-4 py-3.5 placeholder:text-gray text-gray-d4 border border-gray-l3"
            placeholder="Specify your role"
            {...register("other_role", { shouldUnregister: true })}
          />
          <p className="text-right text-red text-xs mt-1">
            {errors.other_role?.message}
          </p>
        </Field>
      )}
      <h3 className="mt-8 mb-4">Other information</h3>
      <ReferralMethodSelector
        classes="mb-4"
        value={referralMethod}
        onChange={onReferralMethodChange}
        error={errors.referral_method?.value?.message}
        ref={referralMethodRef}
      />
      {referralMethod.value === "other" && (
        <Field className="grid my-4">
          <Label className="mb-1 text-sm">
            Please provide additional information <Star />
          </Label>
          <Input
            className="font-heading rounded-sm outline-blue-d1 outline-offset-4 text-sm font-medium bg-transparent disabled:bg-gray-l5 disabled:text-gray px-4 py-3.5 placeholder:text-gray text-gray-d4 border border-gray-l3"
            placeholder="Specify how you found us"
            {...register("other_referral_method", { shouldUnregister: true })}
          />
          <p className="text-right text-red text-xs mt-1">
            {errors.other_referral_method?.message}
          </p>
        </Field>
      )}
      {referralMethod.value === "referral" && (
        <Field className="grid mb-4">
          <Label className="mb-1 text-sm">
            Referral Code <Star />
          </Label>
          <Input
            className="font-heading rounded-sm outline-blue-d1 outline-offset-4 text-sm font-medium bg-transparent disabled:bg-gray-l5 disabled:text-gray px-4 py-3.5 placeholder:text-gray text-gray-d4 border border-gray-l3"
            placeholder="Referral Code"
            {...register("referral_code", { shouldUnregister: true })}
          />
          <p className="text-right text-red text-xs mt-1">
            {errors.referral_code?.message}
          </p>
        </Field>
      )}
      <Field className="grid mb-4">
        <Label className="mb-1 text-sm">
          Goals <Star />
        </Label>
        <Input
          className="font-heading rounded-sm outline-blue-d1 outline-offset-4 text-sm font-medium bg-transparent disabled:bg-gray-l5 disabled:text-gray px-4 py-3.5 placeholder:text-gray text-gray-d4 border border-gray-l3"
          placeholder={`What is your goal working with ${APP_NAME}?`}
          {...register("goals")}
        />
        <p className="text-right text-red text-xs mt-1">
          {errors.goals?.message}
        </p>
      </Field>
      <button
        type="submit"
        className="mt-8 py-3 px-8 w-full sm:w-auto btn-blue btn-reg"
        disabled={fetcher.state !== "idle"}
      >
        <LoadText isLoading={fetcher.state === "submitting"}>Continue</LoadText>
      </button>
    </form>
  );
}
