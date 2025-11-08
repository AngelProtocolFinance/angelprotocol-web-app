import { Combo } from "components/combo";
import { ExtLink } from "components/ext-link";
import { Field } from "components/form";
import { DrawerIcon } from "components/icon";
import { Select } from "components/selector/select";
import { countries, country_names } from "constants/countries";
import { PRIVACY_POLICY, TERMS_OF_USE_DONOR } from "constants/urls";
import { useController } from "react-hook-form";
import { useFetcher, useParams } from "react-router";
import { useRemixForm } from "remix-hook-form";
import type { UserV2 } from "types/auth";
import { states } from "../../../../../../constants/us-states";
import type { FV } from "../schema";
import { Tooltip } from "./tooltip";

export const form_style = "w-full text-gray-d4 dark:text-white p-3";

interface IForm {
  classes?: string;
  user: UserV2;
}
export function Form({ classes = "", user }: IForm) {
  const params = useParams();
  const fetcher = useFetcher();

  const init: FV = {
    name: { first: user.first_name, last: user.last_name },
    address: { street: "", complement: "" },
    city: "",
    postal_code: "",
    country: "",
    email: user.email,
    state: "",
    us_state: "",
  };
  const {
    handleSubmit,
    resetField,
    register,
    formState: { errors },
    control,
  } = useRemixForm<FV>({
    defaultValues: init,
    fetcher,
  });

  const { field: country } = useController<FV, "country">({
    control,
    name: "country",
  });
  const { field: us_state } = useController<FV, "state">({
    control,
    name: "state",
  });

  const isUS = /united states/i.test(country.value);

  return (
    <fetcher.Form
      method="PUT"
      onSubmit={handleSubmit}
      className={`${classes} ${form_style} grid gap-5 p-4`}
      autoComplete="off"
      autoSave="off"
    >
      <Tooltip txId={params.id ?? ""} classes="col-span-full" />
      <Field
        {...register("name.first")}
        label="First name"
        placeholder="e.g. John"
        required
        error={errors.name?.first?.message}
      />
      <Field
        {...register("name.last")}
        label="Last name"
        placeholder="e.g. Doe"
        required
        error={errors.name?.last?.message}
      />
      <Field
        {...register("address.street")}
        label="Address"
        placeholder="e.g. Street Rd 9920"
        required
        error={errors.address?.street?.message}
      />
      <Field
        {...register("address.complement")}
        label="Address Line 2"
        placeholder="e.g. PO Box 1234"
        error={errors.address?.complement?.message}
      />
      <Field
        {...register("city")}
        label="City"
        placeholder="e.g. London"
        required
        error={errors.city?.message}
      />
      <Field
        {...register("postal_code")}
        label="Zip code"
        placeholder="e.g. 1080"
        required
        error={errors.postal_code?.message}
      />

      <Combo
        label="Country"
        required
        ref={country.ref}
        value={country.value}
        onChange={country.onChange}
        placeholder="Select a country"
        options={country_names}
        onReset={() => resetField("us_state")}
        error={errors.country?.message}
        classes={{ input: "pl-12" }}
        option_disp={(c) => (
          <>
            <span className="text-2xl">{countries[c].flag}</span>
            <span>{c}</span>
          </>
        )}
        btn_disp={(c, open) => {
          const flag = countries[c]?.flag;
          return flag ? (
            <span data-flag className="text-2xl">
              {flag}
            </span>
          ) : (
            <DrawerIcon
              is_open={open}
              size={20}
              className="justify-self-end dark:text-gray shrink-0"
            />
          );
        }}
      />
      {isUS ? (
        <Select
          required={false}
          label="State"
          onChange={us_state.onChange}
          value={us_state.value}
          options={states}
          classes={{ options: "text-sm" }}
          option_disp={(s) => s}
        />
      ) : (
        <Field
          {...register("state", { shouldUnregister: true })}
          label="State"
          required={false}
          placeholder="e.g. England"
          error={errors.state?.message}
        />
      )}

      <Field
        {...register("email")}
        label="Email address"
        placeholder="e.g. johndoe@mail.com"
        classes={{ container: "col-span-full" }}
        required
        error={errors.email?.message}
      />
      <p className="text-sm col-span-full">
        By submitting this information, you agree to our{" "}
        <ExtLink href={PRIVACY_POLICY} className="text-blue hover:text-blue-l2">
          Privacy Policy
        </ExtLink>{" "}
        and{" "}
        <ExtLink
          href={TERMS_OF_USE_DONOR}
          className="text-blue hover:text-blue-l2"
        >
          Terms of Use
        </ExtLink>
        .
      </p>

      <button
        className="col-span-full btn btn-blue text-sm"
        disabled={fetcher.state !== "idle"}
        type="submit"
      >
        {fetcher.state !== "idle" ? "Processing..." : "Submit"}
      </button>
    </fetcher.Form>
  );
}
