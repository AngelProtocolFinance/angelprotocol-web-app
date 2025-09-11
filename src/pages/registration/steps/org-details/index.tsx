import type { TRegUpdate } from "@better-giving/reg";
import { Progress } from "@better-giving/reg/progress";
import { type OrgDesignation, org_designations } from "@better-giving/schemas";
import { Combo } from "components/combo";
import ExtLink from "components/ext-link";
import { Label, UrlInput } from "components/form";
import { DrawerIcon } from "components/icon";
import { LoadText } from "components/load-text";
import { MultiCombo } from "components/selector/multi-combo";
import { Select } from "components/selector/select";
import {
  countries as cmap,
  country_names as cnames,
} from "constants/countries";
import { TERMS_OF_USE_NPO } from "constants/urls";
import type { SubmitHandler } from "react-hook-form";
import { NavLink, useFetcher, useNavigate } from "react-router";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import { step_loader } from "../../data/step-loader";
import { steps } from "../../routes";
import { next_step } from "../../routes";
import { update_action } from "../update-action";
import type { Route } from "./+types";
import type { FV } from "./schema";
import { use_rhf } from "./use-rhf";
export { ErrorBoundary } from "components/error";

export const loader = step_loader(2);
export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();
export const action = update_action(next_step[2]);
export default CacheRoute(Page);
function Page({ loaderData: reg }: Route.ComponentProps) {
  const fetcher = useFetcher();
  const navigate = useNavigate();

  const {
    register,
    errors,
    isDirty,
    handleSubmit,
    designation,
    hq_country,
    countries,
    dirtyFields: df,
  } = use_rhf(reg);

  const submit: SubmitHandler<FV> = async (fv) => {
    if (!isDirty && new Progress(reg).org) {
      return navigate(`../${steps.fsa_inq}`);
    }

    const update: TRegUpdate = {
      update_type: "org",
    };

    if (df.o_website) update.o_website = fv.o_website;
    if (df.o_hq_country) update.o_hq_country = fv.o_hq_country;
    if (df.o_designation) update.o_designation = fv.o_designation;
    if (df.o_active_in_countries)
      update.o_active_in_countries = fv.o_active_in_countries;

    fetcher.submit(update, {
      method: "PATCH",
      encType: "application/json",
    });
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(submit)}>
      <h2 className="text-center sm:text-left text-xl mb-2">
        Organization Details
      </h2>

      <UrlInput
        {...register("o_website")}
        label="Website of your organization"
        required
        classes={{ container: "mb-6 mt-4" }}
        placeholder="yourwebsite.com"
        error={errors.o_website?.message}
      />

      <Select<OrgDesignation>
        ref={designation.ref}
        value={designation.value}
        onChange={designation.onChange}
        required
        label="Nonprofit Designation"
        classes={{ options: "text-sm", container: "mt-4" }}
        options={org_designations as any}
        option_disp={(v) => v}
        error={errors.o_designation?.message}
      />

      <Combo
        ref={hq_country.ref}
        error={errors.o_hq_country?.message}
        value={hq_country.value}
        onChange={hq_country.onChange}
        required
        label="In what country is your organization registered in?"
        //endowment claims are US-based and shoudn't be changed by claimer
        disabled={!!reg.claim}
        placeholder="Select a country"
        classes={{
          container: "mt-6 mb-2",
          input: "pl-12",
        }}
        options={cnames}
        option_disp={(c) => (
          <>
            <span className="text-2xl">{cmap[c].flag}</span>
            <span>{c}</span>
          </>
        )}
        btn_disp={(c, open) => {
          const flag = cmap[c]?.flag;
          return flag ? (
            <span data-flag className="text-2xl">
              {flag}
            </span>
          ) : (
            <DrawerIcon
              isOpen={open}
              size={20}
              className="justify-self-end dark:text-gray shrink-0"
            />
          );
        }}
      />

      <Label className="mt-6 mb-2">
        Select the countries your organization is active in
      </Label>
      <MultiCombo
        searchable
        values={countries.value ?? []}
        on_change={countries.onChange}
        on_reset={() => countries.onChange([])}
        classes={{ options: "text-sm" }}
        options={cnames}
        option_disp={(c) => c}
        error={errors.o_active_in_countries?.message}
        ref={countries.ref}
      />

      <p className="text-sm mt-4">
        By submitting this information, you declare that you have read and
        agreed to our{" "}
        <ExtLink
          className="underline text-blue-d1 hover:text-blue"
          href={TERMS_OF_USE_NPO}
        >
          Terms & Conditions
        </ExtLink>
        .
      </p>
      <div className="grid grid-cols-2 sm:flex gap-2 mt-8">
        <NavLink
          aria-disabled={fetcher.state !== "idle"}
          to={`../${steps.contact}`}
          className="py-3 min-w-[8rem] btn btn-outline text-sm"
        >
          Back
        </NavLink>
        <button
          disabled={fetcher.state !== "idle"}
          type="submit"
          className="py-3 min-w-[8rem] btn btn-blue text-sm"
        >
          <LoadText isLoading={fetcher.state !== "idle"}>Continue</LoadText>
        </button>
      </div>
    </form>
  );
}
