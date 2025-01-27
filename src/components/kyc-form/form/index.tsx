import { valibotResolver } from "@hookform/resolvers/valibot";
import { useFetcher, useParams } from "@remix-run/react";
import countries from "assets/countries/all.json";
import { ControlledCountrySelector as CountrySelector } from "components/country-selector";
import ExtLink from "components/ext-link";
import { NativeField as Field, Label } from "components/form";
import { NativeSelect as Selector } from "components/selector";
import { PRIVACY_POLICY, TERMS_OF_USE_DONOR } from "constants/urls";
import { useController, useForm } from "react-hook-form";
import type { ReceiptPayload } from "types/aws";
import { type FV, schema } from "../schema";
import { Tooltip } from "./tooltip";
import { states } from "./us-states";

export const formStyle = "w-full text-navy-d4 dark:text-white p-3";

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

  const isUS = /united states/i.test(country.value.name);

  return (
    <form
      onSubmit={handleSubmit((fv) => {
        const payload: ReceiptPayload = {
          fullName: `${fv.name.first} ${fv.name.last}`,
          kycEmail: fv.kycEmail,
          streetAddress: `${fv.address.street} ${fv.address.complement}`,
          city: fv.city,
          state: fv.usState.value || fv.state,
          zipCode: fv.postalCode,
          country: fv.country.name,
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
        classes="field-kyc"
        label="First name"
        placeholder="e.g. John"
        required
        error={errors.name?.first?.message}
      />
      <Field
        {...register("name.last")}
        classes="field-kyc"
        label="Last name"
        placeholder="e.g. Doe"
        required
        error={errors.name?.last?.message}
      />
      <Field
        {...register("address.street")}
        classes="field-kyc"
        label="Address"
        placeholder="e.g. Street Rd 9920"
        required
        error={errors.address?.street?.message}
      />
      <Field
        {...register("address.complement")}
        classes="field-kyc"
        label="Address Line 2"
        placeholder="e.g. PO Box 1234"
        error={errors.address?.complement?.message}
      />
      <Field
        {...register("city")}
        classes="field-kyc"
        label="City"
        placeholder="e.g. London"
        required
        error={errors.city?.message}
      />
      <Field
        {...register("postalCode")}
        classes="field-kyc"
        label="Zip code"
        placeholder="e.g. 1080"
        required
        error={errors.postalCode?.message}
      />
      <div className="grid relative">
        <Label htmlFor="country" className="mb-2" required>
          Country
        </Label>

        <CountrySelector
          ref={country.ref}
          value={country.value}
          onChange={country.onChange}
          placeholder="Select a country"
          options={countries}
          onReset={() => resetField("usState")}
          classes={{
            container: "px-4 bg-gray-l6 dark:bg-blue-d6",
            input: "py-3 placeholder:text-sm",
            error: "field-error",
          }}
        />
      </div>
      {isUS ? (
        <div className="grid relative">
          <Label htmlFor="usState" className="mb-2" required={false}>
            State
          </Label>
          <Selector
            onChange={usState.onChange}
            value={usState.value.value}
            options={states}
            classes={{
              container: "bg-white dark:bg-blue-d6",
              options: "text-sm",
            }}
          />
        </div>
      ) : (
        <Field
          {...register("state", { shouldUnregister: true })}
          classes="field-kyc"
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
        classes={{ container: "col-span-full field-kyc" }}
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
        className="col-span-full btn-blue text-sm"
        disabled={fetcher.state !== "idle"}
        type="submit"
      >
        {fetcher.state !== "idle" ? "Processing..." : "Submit"}
      </button>
    </form>
  );
}
