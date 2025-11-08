import { valibotResolver } from "@hookform/resolvers/valibot";
import { Combo } from "components/combo";
import { Field } from "components/form";
import { DrawerIcon } from "components/icon";
import { Select } from "components/selector";
import { countries, country_names } from "constants/countries";
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

export function DonorStep({ classes = "", on_change }: Props) {
  const { don_set } = use_donation();
  const {
    handleSubmit,
    resetField,
    register,
    control,
    formState: { errors },
  } = useForm<FV>({ resolver: valibotResolver(donor) });

  const { field: country } = useController<FV, "address.country">({
    control,
    name: "address.country",
  });
  const { field: us_state } = useController<FV, "address.state">({
    control,
    name: "address.state",
  });

  return (
    <form
      onSubmit={handleSubmit(on_change)}
      className={`grid mt-4 mb-2 grid-cols-2 gap-2 content-start ${classes}`}
    >
      <BackBtn
        type="button"
        onClick={() =>
          don_set((x) => ({
            ...x,
            [x.method]: { ...x[x.method], step: "form" },
          }))
        }
      />
      <p className="col-span-full text-sm font-semibold">Payment information</p>
      <Field
        {...register("first_name")}
        label="First name"
        placeholder="First Name"
        required
        classes={{
          label: "font-semibold text-base sr-only",
          input: "py-2",
        }}
        error={errors.first_name?.message}
      />
      <Field
        {...register("last_name")}
        label="Last name"
        placeholder="Last Name"
        classes={{
          input: "py-2",
          label: "font-semibold text-base sr-only",
        }}
        error={errors.last_name?.message}
      />
      <Field
        {...register("email")}
        label="Your Email"
        placeholder="Your Email"
        classes={{
          container: "col-span-full",
          input: "py-2",
          label: "font-semibold text-base sr-only",
        }}
        error={errors.email?.message}
      />
      <div>
        <Field
          {...register("address.street")}
          label="Address"
          placeholder="e.g. Street Rd 9920"
          required
          error={errors.address?.street?.message}
        />
        <Field
          {...register("address.city")}
          label="City"
          placeholder="e.g. London"
          required
          error={errors.address?.city?.message}
        />
        <Field
          {...register("address.zip_code")}
          label="Zip code"
          placeholder="e.g. 1080"
          required
          error={errors.address?.zip_code?.message}
        />

        <Combo
          label="Country"
          required
          ref={country.ref}
          value={country.value}
          onChange={country.onChange}
          placeholder="Select a country"
          options={country_names}
          onReset={() => resetField("address.state")}
          error={errors.address?.country?.message}
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
        {country ? (
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
            {...register("address.state", { shouldUnregister: true })}
            label="State"
            required={false}
            placeholder="e.g. England"
            error={errors.address?.state?.message}
          />
        )}
      </div>
    </form>
  );
}
