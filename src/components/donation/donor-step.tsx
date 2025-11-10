import { Fieldset, Legend } from "@headlessui/react";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { ComboInline } from "components/combo";
import { Field } from "components/form";
import { Field2, Input2 } from "components/form/field-2";
import { country_names } from "constants/countries";
import { states } from "constants/us-states";
import { useController, useForm } from "react-hook-form";
import { type Donor as FV, donor } from "types/donation-intent";
import { BackBtn } from "./common/back-btn";
import { use_donation } from "./context";

interface Props {
  value: FV;
  on_back(): void;
  on_change(donor: FV): void;
  classes?: string;
}

export function DonorStep({ classes = "", on_change, value }: Props) {
  const { don, don_set } = use_donation();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FV>({
    resolver: valibotResolver(donor),
    values: value,
    criteriaMode: "all",
  });

  const { field: country } = useController<FV, "address.country">({
    control,
    name: "address.country",
  });

  const is_US = /united states/i.test(country.value);

  const { field: state } = useController<FV, "address.state">({
    control,
    name: "address.state",
  });

  return (
    <form
      onSubmit={handleSubmit((x) => on_change(x), console.error)}
      className={`flex flex-col p-4 @xl/steps:p-8 gap-4 content-start ${classes}`}
    >
      <BackBtn
        className=""
        type="button"
        onClick={() =>
          don_set((x) => ({
            ...x,
            [x.method]: { ...x[x.method], step: "form" },
          }))
        }
      />

      <p className="font-semibold text-[15px]">Payment information</p>

      <Field
        label="Your email"
        required
        placeholder="e.g. john@doe.com"
        {...register("email")}
        error={errors.email?.message}
        classes={{ label: "font-semibold" }}
        sub="We'll send your donation receipt to this email."
      />

      <Fieldset className="grid grid-cols-2 group gap-4">
        <Legend className="col-span-full text-sm font-semibold -mb-1">
          Your name{" "}
          <span className="block text-sm text-gray font-normal">
            as would appear in your tax receipt and donation record.
          </span>
        </Legend>
        <Field2
          required
          label="First name"
          input={<Input2 {...register("first_name")} />}
          error={errors.first_name?.message}
        />
        <Field2
          required
          label="Last name"
          input={<Input2 {...register("last_name")} />}
          error={errors.last_name?.message}
        />
      </Fieldset>

      {don.recipient.donor_address_required && (
        <Fieldset className="grid gap-4 mt-2">
          <Legend className="font-semibold text-sm -mb-2">Your address</Legend>
          <Field2
            required
            classes="mt-2"
            label="Street"
            input={<Input2 {...register("address.street")} />}
            error={errors.address?.street?.message}
          />
          <Field2
            required
            label="City"
            input={<Input2 {...register("address.city")} />}
            error={errors.address?.city?.message}
          />
          <Field2
            required
            label="Zip code"
            input={<Input2 {...register("address.zip_code")} />}
            error={errors.address?.zip_code?.message}
          />

          <ComboInline
            label="Country"
            required
            ref={country.ref}
            // may be undefined as country is nested optional
            value={country.value ?? ""}
            on_change={(x) => {
              country.onChange(x);
              state.onChange("");
            }}
            options={country_names}
            error={errors.address?.country?.message}
            option_disp={(c) => <span>{c}</span>}
          />
          <ComboInline
            label="State"
            required={is_US}
            ref={state.ref}
            // may be undefined as country is nested optional
            value={state.value ?? ""}
            on_change={state.onChange}
            options={is_US ? states : []}
            allow_custom={!is_US}
            error={errors.address?.state?.message}
            option_disp={(c) => <span>{c}</span>}
          />
        </Fieldset>
      )}
      <button
        className="mt-auto btn btn-blue text-sm enabled:bg-(--accent-primary) col-span-full"
        type="submit"
      >
        Continue
      </button>
    </form>
  );
}
