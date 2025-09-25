import { valibotResolver } from "@hookform/resolvers/valibot";
import { Combo } from "components/combo";
import { ExtLink } from "components/ext-link";
import { Field } from "components/form";
import { DrawerIcon } from "components/icon";
import { Select } from "components/selector/select";
import { countries, country_names } from "constants/countries";
import { PRIVACY_POLICY, TERMS_OF_USE_DONOR } from "constants/urls";
import { useController, useForm } from "react-hook-form";
import { useFetcher, useParams } from "react-router";
import type { ReceiptPayload } from "types/donate";
import { type FV, schema } from "../schema";
import { Tooltip } from "./tooltip";
import { states } from "./us-states";

export const formStyle = "w-full text-gray-d4 dark:text-white p-3";

interface IForm extends FV {
  classes?: string;
}
export function Form({ classes = "", ...init }: IForm) {
  const params = useParams();
  const fetcher = useFetcher();
  const {
    handleSubmit,
    resetField,
    register,
    formState: { errors },
    control,
  } = useForm<FV>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: init,
    resolver: valibotResolver(schema),
  });

  const { field: country } = useController<FV, "country">({
    control,
    name: "country",
  });
  const { field: usState } = useController<FV, "usState">({
    control,
    name: "usState",
  });

  const isUS = /united states/i.test(country.value);

  return (
    <form
      onSubmit={handleSubmit((fv) => {
        const payload: ReceiptPayload = {
          fullName: `${fv.name.first} ${fv.name.last}`,
          kycEmail: fv.kycEmail,
          streetAddress: `${fv.address.street} ${fv.address.complement}`,
          city: fv.city,
          state: fv.usState || fv.state,
          zipCode: fv.postalCode,
          country: fv.country,
        };
        fetcher.submit(payload, {
          encType: "application/json",
          method: "put",
          action: ".",
        });
      })}
      className={`${classes} ${formStyle} grid gap-5 p-4`}
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
        {...register("postalCode")}
        label="Zip code"
        placeholder="e.g. 1080"
        required
        error={errors.postalCode?.message}
      />

      <Combo
        label="Country"
        required
        ref={country.ref}
        value={country.value}
        onChange={country.onChange}
        placeholder="Select a country"
        options={country_names}
        onReset={() => resetField("usState")}
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
              isOpen={open}
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
          onChange={usState.onChange}
          value={usState.value}
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
        {...register("kycEmail")}
        label="Email address"
        placeholder="e.g. johndoe@mail.com"
        classes={{ container: "col-span-full" }}
        required
        error={errors.kycEmail?.message}
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
    </form>
  );
}
