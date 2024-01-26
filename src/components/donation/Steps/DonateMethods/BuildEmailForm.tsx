import { yupResolver } from "@hookform/resolvers/yup";
import Group from "components/Group";
import { Field } from "components/form";
import { EMAIL_SUPPORT } from "constants/env";
import { FormProvider, useForm } from "react-hook-form";
import { SchemaShape } from "schemas/types";
import { ObjectSchema, number, object, string } from "yup";

type Props = {
  charityName: string;
  profileUrl: string;
};

type FormValues = {
  emailTo: string;
  numberOfShares: number | null;
  stockSymbol: string;
};

export default function BuildEmailForm({ charityName, profileUrl }: Props) {
  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const submit = methods.handleSubmit(
    ({ emailTo, numberOfShares, stockSymbol }) =>
      openEmailClient(
        charityName,
        profileUrl,
        emailTo,
        numberOfShares,
        stockSymbol,
      ),
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={submit}>
        <Group>
          <b>
            We can help with the email you'll need to send to your broker
            ensuring they have all the necessary information. Complete the form
            below and click "Build Email" to generate a ready-to-send email in
            your default email application. All fields are optional, but the
            more you can provide now the less editing will be needed before
            sending.
          </b>
          <Field<FormValues, "emailTo">
            name="emailTo"
            label="Your broker's email address"
          />
          <Field<FormValues, "stockSymbol">
            name="stockSymbol"
            label="Stock Symbol (Ticker)"
          />
          <Field<FormValues, "numberOfShares">
            name="numberOfShares"
            label="Number of Shares to donate"
          />
          <button
            type="submit"
            className="btn-orange btn-donate my-4 w-1/2 justify-self-center"
          >
            Build Email
          </button>
        </Group>
      </form>
    </FormProvider>
  );
}

const schema = object<any, SchemaShape<FormValues>>({
  emailTo: string().email("Invalid email format"),
  // for making a number field optional using `nullable + transform`,
  // see https://github.com/jquense/yup/issues/500#issuecomment-818582829
  numberOfShares: number()
    .nullable()
    .positive("must be greater than zero")
    .typeError("must be a number")
    .transform((cur, orig) => (orig === "" ? null : cur)),
  stockSymbol: string(),
}) as ObjectSchema<FormValues>;

const openEmailClient = (
  charityName: string,
  profileUrl: string,
  emailTo: string,
  numberOfShares: number | null,
  stockSymbol: string,
) => {
  window.open(`
  mailto:${emailTo}
    ?cc=${EMAIL_SUPPORT}
    &subject=Stock donation to Better.Giving supporting ${charityName}
    &body=
Hi,${NEW_LINE}
${NEW_LINE}
I would like to donate stock to support ${charityName} (${profileUrl}). 
I have CCed better.giving (EIN 87-3758939) to ensure this tax-deductible donation gets accounted for correctly, 
please ask them if you have any technical questions.${NEW_LINE}
${NEW_LINE}
Please transfer ${numberOfShares || "[NUMBER_OF_SHARES]"} shares of ${
    stockSymbol || "[STOCK_SYMBOL]"
  } to:${NEW_LINE}
Deliver to: Fidelity Investments${NEW_LINE}
DTC number: 0226${NEW_LINE}
Account number: Z40390069${NEW_LINE}
Account name: Altruistic Partners Empowering Society, Inc${NEW_LINE}
Reference: [INTERNAL REF#, if needed] ${charityName} (${profileUrl})${NEW_LINE}
${NEW_LINE}
Thank you.`);
};

const NEW_LINE = "%0D%0A";
