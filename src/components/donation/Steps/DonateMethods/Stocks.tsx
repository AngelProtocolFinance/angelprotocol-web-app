import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { ObjectSchema, number, object, string } from "yup";
import { SchemaShape } from "schemas/types";
import Group from "components/Group";
import { Field } from "components/form";
import { FormStep } from "slices/donation";
import { EMAIL_SUPPORT } from "constants/env";
import { appRoutes } from "constants/routes";

type FormValues = {
  emailTo?: string;
  numberOfShares?: number;
  stockSymbol?: string;
};

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

type Props = { state: FormStep };

export default function Stocks({ state }: Props) {
  const charityName = state.recipient.name;
  const profileUrl = `${window.location.origin}${appRoutes.donate}/${state.recipient.id}`;

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
        stockSymbol
      )
  );

  return (
    <div className="grid gap-5">
      <h3 className="text-2xl sm:text-3xl text-center leading-relaxed">
        Stocks
      </h3>
      <h4 className="text-lg sm:text-xl leading-relaxed">
        Step 1: Contact Your Broker
      </h4>
      <p>
        To donate stock, please email or provide your broker with the following
        information:
      </p>
      <div className="grid rounded bg-gray-l5 dark:bg-bluegray-d1 p-2">
        <p>Please transfer [X] shares of [ABC] to:</p>
        <p>Deliver to: Fidelity Investments</p>
        <p>DTC number: 0226</p>
        <p>Account number: Z40390069</p>
        <p>Account name: Altruistic Partners Empowering Society, Inc</p>
        <p>
          Reference: [Internal Ref#, if needed] {charityName} ({profileUrl})
        </p>
      </div>
      <p> You may also need the following information:</p>
      <span className="rounded bg-gray-l5 dark:bg-bluegray-d1 p-2">
        Better.Giving is a non-profit with 501(c)(3) tax-exempt status, Federal
        ID #: 87-3758939.
      </span>
      <FormProvider {...methods}>
        <form onSubmit={submit}>
          <Group>
            <b>
              We can help with the email you'll need to send to your broker
              ensuring they have all the necessary information. Complete the
              form below and click "Build Email" to generate a ready-to-send
              email in your default email application. All fields are optional,
              but the more you can provide now the less editing will be needed
              before sending.
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
      <h4 className="text-lg sm:text-xl leading-relaxed">
        Step 2: Let Us Know
      </h4>
      <div className="grid gap-2">
        <p>
          For your gift to be recognized when it comes into our account, please
          email us details of the shares you are donating and which project or
          projects to designate your donation to. Please send this email to
          support@better.giving.
        </p>
        <i>
          If you generated an email with the above form, then we should have
          been "CC'd" automatically on the email to your broker.
        </i>
      </div>
      <h4 className="text-lg sm:text-xl leading-relaxed">
        Benefits of Donating Appreciated stock
      </h4>
      You can enjoy significant tax advantages and maximize the size of your
      contributions when you transfer securities through Better.Giving:
      <ul>
        <li>
          If you held the stock for at least one year, you receive a tax
          deduction for the full value of the stock at the time of donation (not
          just the amount you paid for the stock).
        </li>
        <li>
          You avoid paying both capital gains tax and stock sales commissions.
          When you give appreciated stocks directly to charity, your gift can be
          up to 20% larger because you avoid the taxes you'd incur from selling
          and donating the cash.
        </li>
      </ul>
    </div>
  );
}

const NEW_LINE = "%0D%0A";

const openEmailClient = (
  charityName: string,
  profileUrl: string,
  emailTo = "",
  numberOfShares?: number,
  stockSymbol?: string
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
