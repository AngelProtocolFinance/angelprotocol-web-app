import { Country, OptionType } from "types/components";

export type FormValues = {
  name: { first: string; last: string };
  address: { street: string; complement: string };
  city: string;
  postalCode: string;
  country: Country;
  state: string;
  usState: OptionType<string>;
  kycEmail: string;
};

export type Props = {
  txHash: string;
  classes?: string;
  defaultValues?: FormValues;
  onSubmit: (formValues: FormValues) => void | Promise<void>;
};
