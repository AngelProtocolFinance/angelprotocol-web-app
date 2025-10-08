import { Field } from "components/form";
import { LoadText } from "components/load-text";
import { Select } from "components/selector/select";
import type { SubmitHandler } from "react-hook-form";
import { useFetcher, useNavigate } from "react-router";
import { steps } from "../../routes";
import { referral_methods, roles } from "./constants";
import type { FV } from "./schema";
import { use_rhf } from "./use-rhf";

import type { TRegUpdate, TRole } from "@better-giving/reg";
import { Progress } from "@better-giving/reg/progress";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import { step_loader } from "../../data/step-loader";
import { next_step } from "../../routes";
import { update_action } from "../update-action";
import type { Route } from "./+types";

export { ErrorBoundary } from "components/error";
export const loader = step_loader(1);
export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();
export const action = update_action(next_step[1]);

export default CacheRoute(Page);
function Page({ loaderData: reg }: Route.ComponentProps) {
  const fetcher = useFetcher();
  const {
    register,
    errors,
    org_role,
    rm,
    isDirty,
    handleSubmit,
    dirtyFields: df,
  } = use_rhf(reg);
  const navigate = useNavigate();

  const submit: SubmitHandler<FV> = async (fv) => {
    if (!isDirty && new Progress(reg).contact) {
      return navigate(`../${steps.org_details}`); // go to latest step
    }

    const upd8: TRegUpdate = {
      update_type: "contact",
    };

    if (df.r_first_name) upd8.r_first_name = fv.r_first_name;
    if (df.r_last_name) upd8.r_last_name = fv.r_last_name;
    if (df.r_contact_number) upd8.r_contact_number = fv.r_contact_number;
    if (df.r_org_role) upd8.r_org_role = fv.r_org_role;
    if (df.r_org_role_other) upd8.r_org_role_other = fv.r_org_role_other;
    if (df.o_name) upd8.o_name = fv.o_name;
    if (df.rm) upd8.rm = fv.rm;
    if (df.rm_other) upd8.rm_other = fv.rm_other;
    if (df.rm_referral_code) upd8.rm_referral_code = fv.rm_referral_code;

    fetcher.submit(upd8, {
      method: "PATCH",
      encType: "application/json",
    });
  };

  return (
    <form
      className="w-full bg-white dark:bg-blue-d6"
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
        {...register("r_first_name")}
        placeholder="e.g. John"
        error={errors.r_first_name?.message}
      />

      <Field
        {...register("r_last_name")}
        required
        label="Last name"
        {...register("r_last_name")}
        placeholder="e.g. Doe"
        error={errors.r_last_name?.message}
        classes={{ container: "mt-4" }}
      />

      <Field
        required={false}
        label="Phone number"
        {...register("r_contact_number")}
        placeholder="000000000"
        error={errors.r_contact_number?.message}
        classes={{ container: "mt-4" }}
      />

      <Field
        required
        defaultValue={reg.r_id}
        label="E-mail address"
        disabled
        classes={{ container: "mt-4" }}
      />

      <h3 className="mt-8 mb-4">Organization information</h3>
      <Field
        required
        label="Organization name"
        {...register("o_name")}
        placeholder="Organization name"
        error={errors.o_name?.message}
        classes={{ container: "mb-4" }}
      />
      <Select<TRole>
        required
        label=" What's your role within the organization?"
        value={org_role.value}
        onChange={org_role.onChange}
        options={Object.keys(roles) as TRole[]}
        error={errors.r_org_role?.message}
        ref={org_role.ref}
        classes={{ option: "text-sm" }}
        option_disp={(x) => roles[x]}
      />
      {org_role.value === "other" && (
        <Field
          classes="mt-4"
          required
          label="Specify your role"
          {...register("r_org_role_other", { shouldUnregister: true })}
          placeholder="Specify your role"
          error={errors.r_org_role_other?.message}
        />
      )}
      <h3 className="mt-8 mb-4">Other information</h3>
      <Select
        label="How did you find about us?"
        required
        value={rm.value}
        onChange={rm.onChange}
        options={Object.keys(referral_methods)}
        error={errors.rm?.message}
        ref={rm.ref}
        classes={{ option: "text-sm", container: "mb-4" }}
        option_disp={(x) => (referral_methods as any)[x]}
      />

      {rm.value === "other" && (
        <Field
          required
          label="Please provide additional information"
          {...register("rm_other", { shouldUnregister: true })}
          placeholder="Specify how you found us"
          error={errors.rm_other?.message}
        />
      )}
      {rm.value === "referral" && (
        <Field
          required
          label="Referral Code"
          {...register("rm_referral_code", { shouldUnregister: true })}
          placeholder="Referral Code"
          error={errors.rm_referral_code?.message}
        />
      )}
      <button
        type="submit"
        className="mt-8 py-3 px-8 w-full sm:w-auto btn btn-blue text-sm"
        disabled={fetcher.state !== "idle"}
      >
        <LoadText is_loading={fetcher.state === "submitting"}>
          Continue
        </LoadText>
      </button>
    </form>
  );
}
